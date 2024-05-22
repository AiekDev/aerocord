/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { app } from "electron";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

interface AutoStart {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
}

function makeAutoStartLinux(): AutoStart {
    const configDir = process.env.XDG_CONFIG_HOME || join(process.env.HOME!, ".config");
    const dir = join(configDir, "autostart");
    const file = join(dir, "vesktop.desktop");

    // IM STUPID
    const legacyName = join(dir, "vencord.desktop");
    if (existsSync(legacyName)) renameSync(legacyName, file);

    // "Quoting must be done by enclosing the argument between double quotes and escaping the double quote character,
    // backtick character ("`"), dollar sign ("$") and backslash character ("\") by preceding it with an additional backslash character"
    // https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#exec-variables
    const commandLine = process.argv.map(arg => '"' + arg.replace(/["$`\\]/g, "\\$&") + '"').join(" ");

    return {
        isEnabled: () => existsSync(file),
        enable() {
            const desktopFile = `
[Desktop Entry]
Type=Application
Name=Vesktop
Comment=Vesktop autostart script
Exec=${commandLine}
StartupNotify=false
Terminal=false
`.trim();

            mkdirSync(dir, { recursive: true });
            writeFileSync(file, desktopFile);
        },
        disable: () => rmSync(file, { force: true })
    };
}

const autoStartWindowsMac: AutoStart = {
    isEnabled: () => app.getLoginItemSettings().openAtLogin,
    enable: () => app.setLoginItemSettings({ openAtLogin: true }),
    disable: () => app.setLoginItemSettings({ openAtLogin: false })
};

export const autoStart = process.platform === "linux" ? makeAutoStartLinux() : autoStartWindowsMac;
