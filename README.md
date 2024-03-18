# Aerocord

Aerocord is a vesktop fork meant for Windows Vista (w/ the extended kernel), Windows 7 and 8. Just like vesktop, it comes with [Vencord](https://github.com/Vendicated/Vencord) pre-installed.

Join up https://discord.gg/MnfHDJMqX5

Credits to [this guy](https://www.deviantart.com/miltonator/art/Discord-Icon-for-Windows-and-MacOS-Skeuomorphism-876399496) for aerocord's logo.

**Not yet supported**:

-   Global Keybinds
-   Autoupdater

## Building

Packaging will create builds in the dist/ folder. You can then install them like mentioned above or distribute them
NOTE: Make sure you have Nodejs installed. Building aerocord is possible on Windows Vista so I doubt you will have any problems

```sh
# download aerocord from github and then open it in vscode or vscodium

# Install Dependencies
npm i --force

# Build it
npm run package

# Check the dist folder and then you're almost done, replace modern electron's binaries with supermiun-electron binaries (do not change anything in the resources folder though)
```

After you're done, use win32ss's [supermium-electron](https://github.com/win32ss/supermium-electron/releases) to bring back the windows 7+ support.

## Motivation

The official Discord Desktop app has ended support for windows 7 and 8 in march of 2024, and instead of having to use discord on the web (which means being stuck on supermium), I've decided to start forking popular discord clients and backporting them using win32ss's supermium electron. I've did this to ArmCord, Webcord but vesktop stood out as the best option, therefore I made aerocord based off vesktop.
