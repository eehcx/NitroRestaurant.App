import Big from "big.js";

export function CalcPercentage(amount, percentage) {
    const amt = new Big(amount);
    const pct = new Big(percentage);
    const result = amt.times(pct).div(100);
    return Number(result.toFixed(2));
}