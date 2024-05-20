/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { session, systemPreferences } from "electron";

export function registerMediaPermissionsHandler() {
    if (process.platform !== "darwin") return;

    session.defaultSession.setPermissionRequestHandler(async (_webContents, permission, callback, details) => {
        let granted = true;

        if (details.mediaTypes?.includes("audio")) {
            granted = await systemPreferences.askForMediaAccess("microphone");
        }
        if (details.mediaTypes?.includes("video")) {
            granted &&= await systemPreferences.askForMediaAccess("camera");
        }

        callback(granted);
    });
}
