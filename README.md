# Aerocord

Aerocord is a [Vesktop](https://github.com/Vencord/Vesktop) fork meant for Windows Vista (w/ the extended kernel), Windows 7 and 8. Just like vesktop, it comes with [Vencord](https://github.com/Vendicated/Vencord) pre-installed.

### Main features:

- Vencord preinstalled
- Much more lightweight and faster than the official Discord app
- Screenshare has sounds and is smoother than the regular Discord app
- Unlike the Discord, Aerocord has backported electron 28 builds which are more up to date compared to discord's electron 22 builds
- Any patch done on vesktop will be also be backported to aerocord in about 1 week
- Aerocord has its own updater separate from vesktop, the updater is also consent-only meaning it wont update without permission
- Much better privacy, since Discord has no access to your system

Community discord server: https://discord.gg/MnfHDJMqX5

Credits to [this guy](https://www.deviantart.com/miltonator/art/Discord-Icon-for-Windows-and-MacOS-Skeuomorphism-876399496) for aerocord's logo, I did recolor it with a slightly more vibrant hue of blue

**Not yet supported**:

-   Global Keybinds

## Building
[Building instructions can be found here](https://github.com/AiekDev/aerocord/blob/main/Building.MD)

After you're done, use win32ss's [supermium-electron](https://github.com/win32ss/supermium-electron/releases) to bring back the windows 7+ support.

## Documentation
[Documentation can be found here, it contains common issues and more](https://github.com/AiekDev/aerocord/blob/main/Documentation.MD)

## Motivation

The official Discord Desktop app has ended support for windows 7 and 8 in march of 2024, and instead of having to use discord on the web (which means being stuck on supermium), I've decided to start forking popular discord clients and backporting them using win32ss's supermium electron. I've did this to ArmCord, Webcord but vesktop stood out as the best option, therefore I made aerocord based off vesktop.

## Star History

<a href="https://star-history.com/#AiekDev/aerocord&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=AiekDev/aerocord&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=AiekDev/aerocord&type=Timeline" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Vendicated/Vencord&type=Timeline" />
  </picture>
</a>
