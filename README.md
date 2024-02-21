in development, ill upload this soon..

# Aercord
Aercord is a vesktop fork meant for Windows Vista (w/ the extended kernel), Windows 7 and 8. Just like vesktop, it comes with [Vencord](https://github.com/Vendicated/Vencord) pre-installed.

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

## Motivation

The official Discord Desktop app has ended support for windows 7 and 8 in march of 2024, and instead of having to use discord on the web (which means being stuck on supermium), I've decided to start forking popular discord clients and backporting them using win32ss's supermium electron. I've did this to ArmCord, Webcord but vesktop stood out as the best option, therefore I made aerocord based off vesktop.
