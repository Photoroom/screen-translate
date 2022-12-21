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
    console.log('translation dict from file', translationDict);
    let nameToTranslation = function (key, locale) {
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
                console.warn(`This locale ${adaptedLocale} is not available in the dict of all locales`)
                return null;
            }
        }
        let allTranslations = translationDict[adaptedLocale];
        if (!(key in allTranslations)) {
            console.log('ERROR: translation not found', adaptedLocale, key);
            return "";
        }
        return allTranslations[key];
    };

    function setTextContent(textNode, text, locale) {
        var font = null;
        var alertOnce = false;
        const specialFonts = ['zh-Hans','zh-Hant','he','ar','ja','ko','thai', 'ru', 'vi']

        if (typeof textNode.fontName != 'symbol') {
            console.log('locale', locale)
            if (specialFonts.includes(locale)) {
                let textStyles = figma.getLocalTextStyles()
                console.log('textStyles', textStyles)
                for (const textStyle of textStyles) {
                    if (textStyle.name === 'screenshot_title_' + locale) {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#screenshots_") && textNode.name != "#screenshots_animatedSocialContent") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'screenshot_tagline_' + locale) {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name == "#screenshots_animatedSocialContent") {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'screenshot_section_' + locale) {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name.startsWith("#creation_graphics_tabBar_title_")) {
                                textNode.textStyleId = textStyle.id;
                            }
                            if (text != null) {
                                textNode.characters = text;
                            }
                        });
                    } else if (textStyle.name === 'screenshot_cta_' + locale) {
                        figma.loadFontAsync(textStyle.fontName).then(() => {
                            if (textNode.name == "#onboarding_button_next") {
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
    const isIterable = (value) => {
        return Symbol.iterator in Object(value);
    }

    let page = figma.currentPage;
    let locale = ''
    function traverse(node) {
        console.log('traverse: ' + node.type);
        // console.log("At node ", node.name)
        if (node.name === 'Info') {
            return
        }
        if (node.type === "FRAME") {
            let paths = node.name.split('/');
            if (paths.length > 2) {
                locale = paths[paths.length-2];
                //android frame names are longer
                if (paths.length > 5) {
                    locale = paths[paths.length-5];
                }
                console.log('locale: ' + locale);
                const textNodes = node.findAll(nodeInFrame => nodeInFrame.type === "TEXT");
                console.log("found text nodes", textNodes.length)
                for (const textNode of textNodes) {
                    let translationKey = textNode.name;
                    console.log('characters: ' + translationKey);
                    if (translationKey.charAt(0) === '#') {
                        let key = translationKey.toLowerCase()
                        console.log('key: ' + key + ' locale:' + locale);
                        let translation = nameToTranslation(key, locale);
                        console.log("after nameToTranslation",)
                        if (translation != null) {
                            console.log("Setting autoRename to false", textNode);
                            textNode.autoRename = false
                            setTextContent(textNode, translation, locale);
                            console.log('translation set: ' + translation);
                        }
                    }
                }
            }
        }
        if (node.type !== "INSTANCE") {
            if (isIterable(node.children)) {
                for (const child of node.children) {
                    traverse(child);
                } 
            }   
        }
    }
    traverse(page); // start the traversal at the PAGE
});

