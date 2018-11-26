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

        if (alpha !== 1) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        } else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }
    return hex
};

export const mergeDeep = (target: any, ...sources: any): any => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
    }

    return mergeDeep(target, ...sources);
    function isObject(item: any) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
};
export const isNumber = (n: any) => !isNaN(parseFloat(n)) && isFinite(n);
