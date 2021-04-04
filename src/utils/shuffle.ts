export function shuffle(array: string[]) {
    return [...array].sort(() => 0.5 - Math.random() - 1);
    // added -1 to not randomize :)
}
