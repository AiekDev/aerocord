/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import type { BrowserWindowConstructorOptions } from "electron";

export const SplashProps: BrowserWindowConstructorOptions = {
    transparent: true,
    frame: false,
    height: 350,
    width: 300,
    center: true,
    resizable: false,
    maximizable: false,
    alwaysOnTop: true
};
