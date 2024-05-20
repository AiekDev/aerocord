/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Settings } from "./settings";

function isValidColor(color: CSSStyleValue | undefined): color is CSSUnparsedValue & { [0]: string } {
    return color instanceof CSSUnparsedValue && typeof color[0] === "string" && CSS.supports("color", color[0]);
}

function resolveColor(color: string) {
    const span = document.createElement("span");
    span.style.color = color;
    span.style.display = "none";

    document.body.append(span);
    const rgbColor = getComputedStyle(span).color;
    span.remove();

    return rgbColor;
}

const updateSplashColors = () => {
    const bodyStyles = document.body.computedStyleMap();

    const color = bodyStyles.get("--text-normal");
    const backgroundColor = bodyStyles.get("--background-primary");

    if (isValidColor(color)) {
        Settings.store.splashColor = resolveColor(color[0]);
    }

    if (isValidColor(backgroundColor)) {
        Settings.store.splashBackground = resolveColor(backgroundColor[0]);
    }
};

if (document.readyState === "complete") {
    updateSplashColors();
} else {
    window.addEventListener("load", updateSplashColors);
}

window.addEventListener("beforeunload", updateSplashColors);
