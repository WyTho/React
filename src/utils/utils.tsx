export const hexToRgba = (hex: string, alpha: number = 1) => {

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) && alpha >= 0 && alpha <= 1) {
        let hexChars = hex.substring(1).split('');
        if (hexChars.length === 3) {
            hexChars = [hexChars[0], hexChars[0], hexChars[1], hexChars[1], hexChars[2], hexChars[2]]
        }
        hex = hexChars.join('');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        } else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }
    console.warn('Invalid hex or alpha value given! normal HEX value was returned', 'hex:', hex, 'alpha:', alpha);
    return hex
};