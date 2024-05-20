/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { contextBridge, ipcRenderer, webFrame } from "electron";
import { readFileSync, watch } from "fs";

import { IpcEvents } from "../shared/IpcEvents";
import { VesktopNative } from "./VesktopNative";

contextBridge.exposeInMainWorld("VesktopNative", VesktopNative);

require(ipcRenderer.sendSync(IpcEvents.GET_VENCORD_PRELOAD_FILE));

webFrame.executeJavaScript(ipcRenderer.sendSync(IpcEvents.GET_VENCORD_RENDERER_SCRIPT));
webFrame.executeJavaScript(ipcRenderer.sendSync(IpcEvents.GET_RENDERER_SCRIPT));

// #region css
const rendererCss = ipcRenderer.sendSync(IpcEvents.GET_RENDERER_CSS_FILE);

const style = document.createElement("style");
style.id = "vcd-css-core";
style.textContent = readFileSync(rendererCss, "utf-8");

if (document.readyState === "complete") {
    document.documentElement.appendChild(style);
} else {
    document.addEventListener("DOMContentLoaded", () => document.documentElement.appendChild(style), {
        once: true
    });
}

if (IS_DEV) {
    // persistent means keep process running if watcher is the only thing still running
    // which we obviously don't want
    watch(rendererCss, { persistent: false }, () => {
        document.getElementById("vcd-css-core")!.textContent = readFileSync(rendererCss, "utf-8");
    });
}
// #endregion

VesktopNative.spellcheck.setLanguages(window.navigator.languages);