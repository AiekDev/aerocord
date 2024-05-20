/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { addPatch } from "./shared";

addPatch({
    patches: [
        {
            find: 'setSinkId"in',
            replacement: {
                // eslint-disable-next-line no-useless-escape
                match: /return (\i)\?navigator\.mediaDevices\.enumerateDevices/,
                replace: "return $1 ? $self.filteredDevices"
            }
        }
    ],

    async filteredDevices() {
        const original = await navigator.mediaDevices.enumerateDevices();
        return original.filter(x => x.label !== "vencord-screen-share");
    }
});
