var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { visible: true });
figma.ui.onmessage = (translationDict) => __awaiter(this, void 0, void 0, function* () {
    console.log('hello world');
    console.log('translation dict from file', translationDict);
    let nameToTranslation = function (key, locale) {
        console.log("nameToTranslation", key, locale)
        let adaptedLocale = locale
        if (adaptedLocale === 'universal') {
            return null;
        }

        const languageCleaner = {'no': 'nb'}

        adaptedLocale = languageCleaner[adaptedLocale] || adaptedLocale
        // console.log(name, translationId, locale)
        if (!(adaptedLocale in translationDict)) {
            // console.info('Warning: locale not found', adaptedLocale);
            let splitLocale = adaptedLocale.split('-');
            if (splitLocale.length > 1) {
                adaptedLocale = splitLocale[0];
                if (!(adaptedLocale in translationDict)) {
                    return null;
                } else {
                    console.log('adapted locale: ' + adaptedLocale);
                }
            } else {
                console.error('Could not fallback locale')
                return null;
            }
        }
        let allTranslations = translationDict[adaptedLocale];
        // console.log(name, translationId, )
        if (!(key in allTranslations)) {
            console.log('ERROR: translation not found', adaptedLocale, key);
            return "";
        }
        return allTranslations[key];
    };

    function setTextContent(deviceType, textNode, text, locale) {
        var font = null;
        var alertOnce = false;
        const specialFonts = ['zh-Hans','zh-Hant','he','ar','ja','ko','thai', 'ru', 'vi']

        if (typeof textNode.fontName != 'symbol') {
            console.log('locale', locale)
            if (specialFonts.includes(locale)) {
                let textStyles = figma.getLocalTextStyles()
                console.log('textStyles', textStyles)
                for (const textStyle of textStyles) {
                    if (textStyle.name === 'title_' + locale && deviceType != 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#screenshots_")) {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'title_ipad_' + locale && deviceType === 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#screenshots_")) {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'button' + locale && deviceType != 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name === "#onboarding_cta_startCreating") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'button_ipad' + locale && deviceType === 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name === "#onboarding_cta_startCreatinge") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'bottom_nav_cta' + locale && deviceType != 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#creation") || textNode.name.startsWith("#edit_main_editing") || textNode.name === "#text_option_button_duplicate") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'bottom_nav_cta_ipad' + locale && deviceType === 'ipad') {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#creation") || textNode.name.startsWith("#edit_main_editing") || textNode.name === "#text_option_button_duplicate") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    }
                }
            } else {
                font = textNode.fontName;
                console.log('font', font)
                figma.loadFontAsync(font).then(() => {
                    if (text != null) {
                        textNode.characters = text;
                    }
                });    
            }
            // font = textNode.fontName;
        }
        else {
            if (!alertOnce) {
                // alertOnce = true
                console.log('Plugin cannot modify text layers with mixed font properties for ' + textNode.characters);
            }
        }

    };

    let page = figma.currentPage;
    let locale = ''
    let deviceType = ''
    function traverse(node) {
        console.log('traverse: ' + node.type);
        console.log("At node ", node.name)
        if (node.name === 'Info') {
            return
        }
        if (node.type === "FRAME") {
            let paths = node.name.split('/');
            if (paths.length > 2) {
                locale = paths[paths.length-2];
                let suffixes = paths[paths.length-1].split('_');
                deviceType = suffixes[suffixes.length-1]
                console.log('locale: ' + locale);
                const textNodes = node.findAll(nodeInFrame => nodeInFrame.type === "TEXT");
                console.log("found text nodes", textNodes.length)
                for (const textNode of textNodes) {
                    let translationKey = textNode.name;
                    console.log('characters: ' + translationKey);
                    if (translationKey.charAt(0) === '#') {
                        let key = translationKey.substr(1)
                        console.log('key: ' + key + ' locale:' + locale);
                        let translation = nameToTranslation(key, locale);
                        console.log("after nameToTranslation",)
                        if (translation != null) {
                            console.log("set translation 1");
                            textNode.autoRename = false
                            setTextContent(deviceType, textNode, translation, locale);
                            console.log('translation set: ' + translation);
                        }
                    }
                }
            }
        }
        if (node.type !== "INSTANCE") {
            for (const child of node.children) {
                traverse(child);
            }
        }
    }
    traverse(page); // start the traversal at the PAGE
});

