/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Settings } from "renderer/settings";

import { addPatch } from "./shared";

if (Settings.store.customTitleBar)
    addPatch({
        patches: [
            {
                find: ".wordmarkWindows",
                replacement: [
                    {
                        // TODO: Fix eslint rule
                        // eslint-disable-next-line no-useless-escape
                        match: /case \i\.\i\.WINDOWS:/,
                        replace: 'case "WEB":'
                    },
                    ...["close", "minimize", "maximize"].map(op => ({
                        match: new RegExp(String.raw`\i\.\i\.${op}\b`),
                        replace: `VesktopNative.win.${op}`
                    }))
                ]
            }
        ]
    });
