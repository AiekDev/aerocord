/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Select } from "@vencord/types/webpack/common";

import { SettingsComponent } from "./Settings";

export const DiscordBranchPicker: SettingsComponent = ({ settings }) => {
    return (
        <Select
            placeholder="Stable"
            options={[
                { label: "Stable", value: "stable", default: true },
                { label: "Canary", value: "canary" },
                { label: "PTB", value: "ptb" }
            ]}
            closeOnSelect={true}
            select={v => (settings.discordBranch = v)}
            isSelected={v => v === settings.discordBranch}
            serialize={s => s}
        />
    );
};
