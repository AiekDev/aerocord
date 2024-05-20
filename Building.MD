This is an indepth guide on how to build on aerocord, it should work from vista and up if you use my NodeJS and VSCode/VSCodium backports. It is recommended you build the updater in VS2019 or above (I used VS2022 to build but that doesnt rlly matter, still worked with VS2019)

Lets start building aerocord from source code:
You got 2 parts:
1. The updater (You need visual studio, it's built in 4.6.1 so you might NOT be able to build on vista unless you port .NET 4.6.1 compilers which i might do 1 day)
2. The client itself (Typescript, you can build with VSCode/VSCodium)

Lets focus on the client itself for now
=======================================
1. Installing the dependencies:
Its important you use the "--force" flag here
npm i --force

2. Building
npm run package

Common errors in step 2:
1. This:

PS C:\Users\Aiek> npm -v
node:internal/modules/cjs/loader:1227
  throw err;
  ^

Error: Cannot find module 'C:\node_modules\npm\bin\npm-prefix.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:168:12)
    at node:internal/main/run_main_module:30:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.1.0
Could not determine Node.js install directory

It's really easy to fix, just delete the npm.ps1 and npx.ps1 files from your nodejs install (usually in C:\node32)

2. If it gives an error about pnpm NOT being installed or it installed the wrong version (newer than pnpm 8.11.0), then execute the following command
npm install pnpm@8.11.0

Vendicated, i have no fucking idea why you didnt just use bun if you really wanted speed.. I might migrate this source code to bun one day

3. Any other errors you can just submit on my github as an issue
=======================================



Lets build the C# updater:
=======================================
I highly recommend windows 7 for this, i got VS2012 to install on vista with a few workarounds but still

I personally used VS2019 and VS2022 to build but anything else is fine too (if you manage to run .NET 4.5 or higher)

1. Open the project, after that go to references and add the following:
System.IO.Compression
System.IO.Compression.FileSystem
2. I think you're done after that, you should be able to build it 
=======================================

Good luck building aerocord! If something doesnt work js let me know by making an issue
