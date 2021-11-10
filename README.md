
##
## Using the plugin:
0- Use figma desktop and import the plugin manifest.

1- The naming in figma must be the following:

`Frame Name = FRAMEPREFIX/LOCALE/NUMBER` or
`Frame Name = android/LOCALE/images/phoneScreenshots/NUMBER`
`Text Name = #LOCALIZATIONKEY`
 
 2- You must have strings in your localized.strings in the following format:
  `"LOCALIZATIONKEY" = "White Background";`
  
 3- You must create translations files in the following format LANGUAGE_ISO.strings and put them all in the same folder, it's easy to do using the lokalize: 
 - `en.string`
 - `fr.string`
 - (etc)
  
 4- In figma, select the right page. Right click, select plugins, our plugin. It opens a popup. Select browse and select all the files from the `TranslationLinks` folder

5- You can use the` language cleaner` dictionary to match the app store to app locale. If a locale doesn't work, we also try to split to a 2 character locale 

6- You can use the` specialFonts` array to load special fonts from the text styles of the pages. If a locale is in the list, the plug in will look for a style `screenshot_title_LOCALE` and override the font from the root element. You can then change the font in figma by changing the style


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
