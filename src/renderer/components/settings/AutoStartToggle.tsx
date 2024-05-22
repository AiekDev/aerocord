/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Switch, useState } from "@vencord/types/webpack/common";

import { SettingsComponent } from "./Settings";

export const AutoStartToggle: SettingsComponent = () => {
    const [autoStartEnabled, setAutoStartEnabled] = useState(VesktopNative.autostart.isEnabled());

    return (
        <Switch
            value={autoStartEnabled}
            onChange={async v => {
                await VesktopNative.autostart[v ? "enable" : "disable"]();
                setAutoStartEnabled(v);
            }}
            note="Automatically start Vesktop on computer start-up"
        >
            Start With System
        </Switch>
    );
};
