/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

// lets just use our own c# updater cuz why not
import { app, BrowserWindow, shell } from "electron";
import { Settings, State } from "main/settings";
import { handle } from "main/utils/ipcWrappers";
import { makeLinksOpenExternally } from "main/utils/makeLinksOpenExternally";
import { githubGet, ReleaseData } from "main/utils/vencordLoader";
import { join } from "path";
import { IpcEvents } from "shared/IpcEvents";
import { ICON_PATH, VIEW_DIR } from "shared/paths";

export interface UpdateData {
    currentVersion: string;
    latestVersion: string;
    release: ReleaseData;
}

let updateData: UpdateData;

handle(IpcEvents.UPDATER_GET_DATA, () => updateData);
handle(IpcEvents.UPDATER_DOWNLOAD, () => {
    const updaterPath = join(app.getPath('exe'), '..', 'Updater.exe')
    shell.openPath(updaterPath);
});

handle(IpcEvents.UPDATE_IGNORE, () => {
    State.store.skippedUpdate = updateData.latestVersion;
});

function isOutdated(oldVersion: string, newVersion: string) {
    const oldParts = oldVersion.split(".");
    const newParts = newVersion.split(".");

    if (oldParts.length !== newParts.length)
        throw new Error(`Incompatible version strings (old: ${oldVersion}, new: ${newVersion})`);

    for (let i = 0; i < oldParts.length; i++) {
        const oldPart = Number(oldParts[i]);
        const newPart = Number(newParts[i]);

        if (isNaN(oldPart) || isNaN(newPart))
            throw new Error(`Invalid version string (old: ${oldVersion}, new: ${newVersion})`);

        if (oldPart < newPart) return true;
        if (oldPart > newPart) return false;
    }

    return false;
}

export async function checkUpdates() {
    if (Settings.store.checkUpdates === false) return;

    try {
        const raw = await githubGet("/repos/AiekDev/Aerocord/releases/latest");
        const data: ReleaseData = await raw.json();

        const oldVersion = app.getVersion();
        const newVersion = data.tag_name.replace(/^v/, "");
        updateData = {
            currentVersion: oldVersion,
            latestVersion: newVersion,
            release: data
        };

        if (State.store.skippedUpdate !== newVersion && isOutdated(oldVersion, newVersion)) {
            openNewUpdateWindow();
        }
    } catch (e) {
        console.error("AppUpdater: Failed to check for updates\n", e);
    }
}

function openNewUpdateWindow() {
    const win = new BrowserWindow({
        width: 500,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: join(__dirname, "updaterPreload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
        icon: ICON_PATH
    });

    makeLinksOpenExternally(win);

    win.loadFile(join(VIEW_DIR, "updater.html"));
}