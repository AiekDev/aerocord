/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { BrowserWindow, shell } from "electron";
import { DISCORD_HOSTNAMES } from "main/constants";

import { Settings } from "../settings";
import { createOrFocusPopup, setupPopout } from "./popout";
import { execSteamURL, isDeckGameMode, steamOpenURL } from "./steamOS";

export function handleExternalUrl(url: string, protocol?: string): { action: "deny" | "allow" } {
    if (protocol == null) {
        try {
            protocol = new URL(url).protocol;
        } catch {
            return { action: "deny" };
        }
    }

    switch (protocol) {
        case "http:":
        case "https:":
            if (Settings.store.openLinksWithElectron) {
                return { action: "allow" };
            }
        // eslint-disable-next-line no-fallthrough
        case "mailto:":
        case "spotify:":
            if (isDeckGameMode) {
                steamOpenURL(url);
            } else {
                shell.openExternal(url);
            }
            break;
        case "steam:":
            if (isDeckGameMode) {
                execSteamURL(url);
            } else {
                shell.openExternal(url);
            }
            break;
    }

    return { action: "deny" };
}

export function makeLinksOpenExternally(win: BrowserWindow) {
    win.webContents.setWindowOpenHandler(({ url, frameName, features }) => {
        try {
            var { protocol, hostname, pathname } = new URL(url);
        } catch {
            return { action: "deny" };
        }

        if (frameName.startsWith("DISCORD_") && pathname === "/popout" && DISCORD_HOSTNAMES.includes(hostname)) {
            return createOrFocusPopup(frameName, features);
        }

        if (url === "about:blank" || (frameName === "authorize" && DISCORD_HOSTNAMES.includes(hostname)))
            return { action: "allow" };

        return handleExternalUrl(url, protocol);
    });

    win.webContents.on("did-create-window", (win, { frameName }) => {
        if (frameName.startsWith("DISCORD_")) setupPopout(win, frameName);
    });
}
