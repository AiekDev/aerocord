/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { useEffect, useReducer } from "@vencord/types/webpack/common";
import { SettingsStore } from "shared/utils/SettingsStore";

export const Settings = new SettingsStore(VesktopNative.settings.get());
Settings.addGlobalChangeListener((o, p) => VesktopNative.settings.set(o, p));

export function useSettings() {
    const [, update] = useReducer(x => x + 1, 0);

    useEffect(() => {
        Settings.addGlobalChangeListener(update);

        return () => Settings.removeGlobalChangeListener(update);
    }, []);

    return Settings.store;
}

export function getValueAndOnChange(key: keyof typeof Settings.store) {
    return {
        value: Settings.store[key] as any,
        onChange: (value: any) => (Settings.store[key] = value)
    };
}
