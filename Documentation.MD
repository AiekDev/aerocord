# Common issues:
### Vista (with the extended kernel) specific:
========================================
The issue - Emojies, and some other characters show up as squares!

The answer - You can't really fix this, vista does NOT have any sort of emoji implementation therefore some characters wont show up, i might add in noto emoji fonts (a fix used in supermium) which MIGHT fix some things up, but not all of them sadly.

### 7 specific:
========================================
The issue - Screenshare crashing on electron 281

The answer - I might have an idea to why this happens, for some people it just works (idk how tbh, this issue is quite weird and i told win32 to look into it), but the fix is literally instllaing VxKex which kinda defeats the whole purpose of using aerocord (cuz then u can just use normal vesktop), if you do NOT wanna install vxkex, then try out the electron 22 builds which arent affected by this issue.

### 8/8.1 specific:
========================================
The issue - Aerocord does NOT start up and is stuck on the loading screen!

The answer - This is a really weird issue that doesn't happen to the other operating systems, which might make it an electron fault. I've known about this issue for months, and the only way you can fix it is by replacing the "vesktop" folder in Appdata/Roaming with [this one, please extract it first](https://github.com/aiekdev/aerocord/tree/main/loadingfix/loadingfix.7z)
