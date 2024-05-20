/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import "./fixes";
import "./appBadge";
import "./patches";
import "./themedSplash";

console.log("read if cute :3");

export * as Components from "./components";
import { findByPropsLazy } from "@vencord/types/webpack";
import { FluxDispatcher } from "@vencord/types/webpack/common";

import SettingsUi from "./components/settings/Settings";
import { Settings } from "./settings";
export { Settings };

const InviteActions = findByPropsLazy("resolveInvite");

export async function openInviteModal(code: string) {
    const { invite } = await InviteActions.resolveInvite(code, "Desktop Modal");
    if (!invite) return false;

    VesktopNative.win.focus();

    FluxDispatcher.dispatch({
        type: "INVITE_MODAL_OPEN",
        invite,
        code,
        context: "APP"
    });

    return true;
}

const customSettingsSections = (
    Vencord.Plugins.plugins.Settings as any as { customSections: ((ID: Record<string, unknown>) => any)[] }
).customSections;

customSettingsSections.push(() => ({
    section: "Aerocord",
    label: "Aerocord Settings",
    element: SettingsUi,
    className: "vc-vesktop-settings"
}));

const arRPC = Vencord.Plugins.plugins["WebRichPresence (arRPC)"] as any as {
    handleEvent(e: MessageEvent): void;
};

VesktopNative.arrpc.onActivity(data => {
    if (!Settings.store.arRPC) return;

    arRPC.handleEvent(new MessageEvent("message", { data }));
});
