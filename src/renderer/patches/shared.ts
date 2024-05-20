/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

import { Patch } from "@vencord/types/utils/types";

window.VCDP = {};

interface PatchData {
    patches: Omit<Patch, "plugin">[];
    [key: string]: any;
}

export function addPatch<P extends PatchData>(p: P) {
    const { patches, ...globals } = p;

    for (const patch of patches as Patch[]) {
        if (!Array.isArray(patch.replacement)) patch.replacement = [patch.replacement];
        for (const r of patch.replacement) {
            if (typeof r.replace === "string") r.replace = r.replace.replaceAll("$self", "VCDP");
        }

        patch.plugin = "Vesktop";
        Vencord.Plugins.patches.push(patch);
    }

    Object.assign(VCDP, globals);
}
