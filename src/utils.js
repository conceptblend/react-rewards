export function formatDollarAmount(amount) {
    return amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });
}

export function formatPointsAmount(amount) {
    return Math.round(amount).toLocaleString('en-CA');
}
