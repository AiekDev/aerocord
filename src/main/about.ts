/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { BrowserWindow } from "electron";
import { join } from "path";
import { ICON_PATH, VIEW_DIR } from "shared/paths";

import { makeLinksOpenExternally } from "./utils/makeLinksOpenExternally";

export function createAboutWindow() {
    const about = new BrowserWindow({
        center: true,
        autoHideMenuBar: true,
        icon: ICON_PATH,
        webPreferences: {
            preload: join(__dirname, "updaterPreload.js")
        }
    });

    makeLinksOpenExternally(about);

    about.loadFile(join(VIEW_DIR, "about.html"));

    return about;
}
