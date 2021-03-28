export function randomizer(array: string[]) {
    const tempArr = [...array];
    tempArr.sort(() => 0.5 - Math.random() - 1); // added -1 to not randomize :)
    return tempArr;
}
