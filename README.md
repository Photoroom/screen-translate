
##
## Using the plugin:
0- Use figma desktop and import the plugin manifest.

1- The layout in figma must be the following:

    All Texts
    --Text 1
    ----Text1/ar
    ----Text1/he
    ----Text1/en
    ----Text1/de
    --Text 2
    ----Text2/ar
    (etc)
 
 2- You must have strings in your localized.strings in the following format:
  `"store.screenshot.03.title" = "White Background";`
  
 3- You must create symlinks linking to your localized.strings in the following format: 
 - `en.string`
 - `fr.string`
 - (etc)
 
 To do so, we recommend creating a folder containing relative symlinks in your repository. E.g we have a `Assets/TranslationLinks`
 containing symlinks to all those files. We ran this command for each translation: `ln -s ../fr.lproj/Localizable.strings fr.strings`
 In the end the Assets/TranslationLinks folder contains links to all translation files.
 
 4- In figma, select `Text 1`, `Text 2`, etc. Right click, select plugins, our plugin. It opens a popup. Select browse and select all the files from the `TranslationLinks` folder




## General installation instructions
This plugin template uses Typescript. If you are familiar with Javascript, Typescript will
look very familiar. In fact, valid Javascript code is already valid Typescript code.

Typescript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using Typescript requires a compiler to convert Typescript (code.ts) into Javascript (code.js)
for the browser to run.

To get the TypeScript compiler working:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Install the TypeScript compiler globally: `sudo npm install -g typescript`.
3. Open this directory in Visual Studio Code.
4. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "tsc: watch - tsconfig.json". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.

## Plugin installation instructions
