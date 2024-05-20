/*
 * SPDX-License-Identifier: GPL-3.0
 * Aerocord, a vesktop fork for older microsoft NT releases such as NT 6.0, 6.1, 6.2 and 6.3. 
 * Credits to vendicated and the rest of the vesktop contribuitors for making Vesktop!
 */

/**
 * Wraps the given function so that it can only be called once
 * @param fn Function to wrap
 * @returns New function that can only be called once
 */
export function once<T extends Function>(fn: T): T {
    let called = false;
    return function (this: any, ...args: any[]) {
        if (called) return;
        called = true;
        return fn.apply(this, args);
    } as any;
}
