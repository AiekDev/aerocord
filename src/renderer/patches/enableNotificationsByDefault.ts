/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { addPatch } from "./shared";

addPatch({
    patches: [
        {
            find: '"NotificationSettingsStore',
            replacement: {
                // FIXME: fix eslint rule
                // eslint-disable-next-line no-useless-escape
                match: /\.isPlatformEmbedded(?=\?\i\.DesktopNotificationTypes\.ALL)/g,
                replace: "$&||true"
            }
        }
    ]
});
