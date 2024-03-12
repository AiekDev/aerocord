# Aerocord
**yes, i know your vesktop has gotten an update and that i need to fix it, ill add an autoupdater eventually smh, also im working on the new build of aerocord so just you wait

Aerocord is a vesktop fork meant for Windows Vista (w/ the extended kernel), Windows 7 and 8. Just like vesktop, it comes with [Vencord](https://github.com/Vendicated/Vencord) pre-installed.

Credits to [this guy](https://www.deviantart.com/miltonator/art/Discord-Icon-for-Windows-and-MacOS-Skeuomorphism-876399496) for aerocord's logo.

**Not yet supported**:

-   Global Keybinds
-   Autoupdater

## Building

Packaging will create builds in the dist/ folder. You can then install them like mentioned above or distribute them
NOTE: Make sure you have Nodejs and pnpm installed.

```sh
git clone https://github.com/Aiek/Aerocord

cd Vesktop

# Install Dependencies
pnpm i

# Either run it without packaging
pnpm start

# Or package
pnpm package

# Or package to a directory only
pnpm package:dir
```

After you're done, use win32ss's [supermium-electron](https://github.com/win32ss/supermium-electron/releases) to bring back the windows 7+ support.

## Motivation

The official Discord Desktop app has ended support for windows 7 and 8 in march of 2024, and instead of having to use discord on the web (which means being stuck on supermium), I've decided to start forking popular discord clients and backporting them using win32ss's supermium electron. I've did this to ArmCord, Webcord but vesktop stood out as the best option, therefore I made aerocord based off vesktop.
