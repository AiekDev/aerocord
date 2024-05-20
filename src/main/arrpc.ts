/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import Server from "arrpc";
import { IpcEvents } from "shared/IpcEvents";

import { mainWin } from "./mainWindow";
import { Settings } from "./settings";

let server: any;

const inviteCodeRegex = /^(\w|-)+$/;

export async function initArRPC() {
    if (server || !Settings.store.arRPC) return;

    try {
        server = await new Server();
        server.on("activity", (data: any) => mainWin.webContents.send(IpcEvents.ARRPC_ACTIVITY, JSON.stringify(data)));
        server.on("invite", (invite: string, callback: (valid: boolean) => void) => {
            invite = String(invite);
            if (!inviteCodeRegex.test(invite)) return callback(false);

            mainWin.webContents
                // Safety: Result of JSON.stringify should always be safe to equal
                // Also, just to be super super safe, invite is regex validated above
                .executeJavaScript(`Vesktop.openInviteModal(${JSON.stringify(invite)})`)
                .then(callback);
        });
    } catch (e) {
        console.error("Failed to start arRPC server", e);
    }
}

Settings.addChangeListener("arRPC", initArRPC);
