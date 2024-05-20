/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { filters, waitFor } from "@vencord/types/webpack";
import { RelationshipStore } from "@vencord/types/webpack/common";

import { Settings } from "./settings";

let GuildReadStateStore: any;
let NotificationSettingsStore: any;

export function setBadge() {
    if (Settings.store.appBadge === false) return;

    try {
        const mentionCount = GuildReadStateStore.getTotalMentionCount();
        const pendingRequests = RelationshipStore.getPendingCount();
        const hasUnread = GuildReadStateStore.hasAnyUnread();
        const disableUnreadBadge = NotificationSettingsStore.getDisableUnreadBadge();

        let totalCount = mentionCount + pendingRequests;
        if (!totalCount && hasUnread && !disableUnreadBadge) totalCount = -1;

        VesktopNative.app.setBadgeCount(totalCount);
    } catch (e) {
        console.error(e);
    }
}

let toFind = 3;

function waitForAndSubscribeToStore(name: string, cb?: (m: any) => void) {
    waitFor(filters.byStoreName(name), store => {
        cb?.(store);
        store.addChangeListener(setBadge);

        toFind--;
        if (toFind === 0) setBadge();
    });
}

waitForAndSubscribeToStore("GuildReadStateStore", store => (GuildReadStateStore = store));
waitForAndSubscribeToStore("NotificationSettingsStore", store => (NotificationSettingsStore = store));
waitForAndSubscribeToStore("RelationshipStore");
