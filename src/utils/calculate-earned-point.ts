export function calculateEarnedPoint(remainingTime: number, difficulty: string) {
    let rawPoint: number;
    if (difficulty.toLowerCase() === 'easy') {
        rawPoint = 100;
    } else if (difficulty.toLowerCase() === 'medium') {
        rawPoint = 200;
    } else if (difficulty.toLowerCase() === 'hard') {
        rawPoint = 400;
    }
    return Math.round(Math.log(remainingTime) * (rawPoint));
}
