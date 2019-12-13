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
    let nameToTranslation = function (name) {
        let id = name[5];
        let translationId = 'store.screenshot.0' + id + '.title';
        let locale = name.split('/')[1];
        if (locale == 'universal') {
            return null;
        }
        // console.log(name, translationId, locale)
        if (!(locale in translationDict)) {
            console.log('ERROR: locale not found', locale);
            return null;
        }
        let allTranslations = translationDict[locale];
        // console.log(name, translationId, )
        if (!(translationId in allTranslations)) {
            console.log('ERROR: translation not found', locale, translationId);
            return "";
        }
        return allTranslations[translationId];
    };
    let selection = figma.currentPage.selection;
    // let parent = selection[0] as FrameNode
    // if (parent.name != 'All Texts') {
    //   alert('Wront layer selected')
    //   return
    // }
    // console.log('parent', parent.children)
    for (const node of selection) {
        let frameNode = node;
        // console.log('frameNode', frameNode)
        for (const child of frameNode.children) {
            if (child.name.includes('universal')) {
                continue;
            }
            let componentNode = child;
            let textNode = componentNode.children[0];
            var font = null;
            var alertOnce = false;
            if (typeof textNode.fontName != 'symbol') {
                font = textNode.fontName;
                figma.loadFontAsync(font).then(() => {
                    let translation = nameToTranslation(textNode.parent.name);
                    if (translation != null) {
                        textNode.characters = translation;
                    }
                });
            }
            else {
                if (!alertOnce) {
                    // alertOnce = true
                    console.log('Plugin cannot modify text layers with mixed font properties for ' + textNode.characters);
                }
            }
        }
    }
});
// console.log(selection)
