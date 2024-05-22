/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { join } from "path";

export const STATIC_DIR = /* @__PURE__ */ join(__dirname, "..", "..", "static");
export const VIEW_DIR = /* @__PURE__ */ join(STATIC_DIR, "views");
export const BADGE_DIR = /* @__PURE__ */ join(STATIC_DIR, "badges");
export const ICON_PATH = /* @__PURE__ */ join(STATIC_DIR, "icon.png");
