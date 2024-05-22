/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import "./fixes.css";

import { isWindows, localStorage } from "./utils";

// Make clicking Notifications focus the window
const originalSetOnClick = Object.getOwnPropertyDescriptor(Notification.prototype, "onclick")!.set!;
Object.defineProperty(Notification.prototype, "onclick", {
    set(onClick) {
        originalSetOnClick.call(this, function (this: unknown) {
            onClick.apply(this, arguments);
            VesktopNative.win.focus();
        });
    },
    configurable: true
});

// Hide "Download Discord Desktop now!!!!" banner
localStorage.setItem("hideNag", "true");

// FIXME: Remove eventually.
// Originally, Vencord always used a Windows user agent. This seems to cause captchas
// Now, we use a platform specific UA - HOWEVER, discord FOR SOME REASON????? caches
// device props in localStorage. This code fixes their cache to properly update the platform in SuperProps
if (!isWindows)
    try {
        const deviceProperties = localStorage.getItem("deviceProperties");
        if (deviceProperties && JSON.parse(deviceProperties).os === "Windows")
            localStorage.removeItem("deviceProperties");
    } catch {}
