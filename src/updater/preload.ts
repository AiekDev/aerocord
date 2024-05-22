/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { contextBridge } from "electron";
import { invoke } from "preload/typedIpc";
import { IpcEvents } from "shared/IpcEvents";

import type { UpdateData } from "./main";

contextBridge.exposeInMainWorld("Updater", {
    getData: () => invoke<UpdateData>(IpcEvents.UPDATER_GET_DATA),
    download: () => {
        invoke<void>(IpcEvents.UPDATER_DOWNLOAD);
        invoke<void>(IpcEvents.CLOSE);
    },
    ignore: () => invoke<void>(IpcEvents.UPDATE_IGNORE),
    close: () => invoke<void>(IpcEvents.CLOSE)
});
