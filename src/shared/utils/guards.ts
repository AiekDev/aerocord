/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

export function isTruthy<T>(item: T): item is Exclude<T, 0 | "" | false | null | undefined> {
    return Boolean(item);
}

export function isNonNullish<T>(item: T): item is Exclude<T, null | undefined> {
    return item != null;
}
