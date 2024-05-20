/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Switch } from "@vencord/types/webpack/common";
import { setBadge } from "renderer/appBadge";

import { SettingsComponent } from "./Settings";

export const NotificationBadgeToggle: SettingsComponent = ({ settings }) => {
    return (
        <Switch
            value={settings.appBadge ?? true}
            onChange={v => {
                settings.appBadge = v;
                if (v) setBadge();
                else VesktopNative.app.setBadgeCount(0);
            }}
            note="Show mention badge on the app icon"
        >
            Notification Badge
        </Switch>
    );
};
