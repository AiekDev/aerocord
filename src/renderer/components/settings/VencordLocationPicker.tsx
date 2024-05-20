/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Button, Forms, Toasts } from "@vencord/types/webpack/common";

import { SettingsComponent } from "./Settings";

export const VencordLocationPicker: SettingsComponent = ({ settings }) => {
    return (
        <>
            <Forms.FormText>
                Vencord files are loaded from{" "}
                {settings.vencordDir ? (
                    <a
                        href="about:blank"
                        onClick={e => {
                            e.preventDefault();
                            VesktopNative.fileManager.showItemInFolder(settings.vencordDir!);
                        }}
                    >
                        {settings.vencordDir}
                    </a>
                ) : (
                    "the default location"
                )}
            </Forms.FormText>
            <div className="vcd-location-btns">
                <Button
                    size={Button.Sizes.SMALL}
                    onClick={async () => {
                        const choice = await VesktopNative.fileManager.selectVencordDir();
                        switch (choice) {
                            case "cancelled":
                                return;
                            case "invalid":
                                Toasts.show({
                                    message:
                                        "You did not choose a valid Vencord install. Make sure you're selecting the dist dir!",
                                    id: Toasts.genId(),
                                    type: Toasts.Type.FAILURE
                                });
                                return;
                        }
                        settings.vencordDir = choice;
                    }}
                >
                    Change
                </Button>
                <Button
                    size={Button.Sizes.SMALL}
                    color={Button.Colors.RED}
                    onClick={() => (settings.vencordDir = void 0)}
                >
                    Reset
                </Button>
            </div>
        </>
    );
};
