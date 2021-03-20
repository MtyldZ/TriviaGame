export function textReplace(text: string) {
    return text.replace(/&#039;/g, '\'')
        .replace(/&quot;/g, '"')
        .replace(/&Eacute;/g, 'É')
        .replace(/&eacute;/g, 'é')
        .replace(/&shy;/g, '')
        .replace(/&amp;/g, '&')


        ;
}
