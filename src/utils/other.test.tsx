
import * as otherUtils from './other';

describe('popup.tsx (utils)', () => {

    describe('hexToRgba()', () => {
        const func = otherUtils.hexToRgba;

        it('should convert valid hex to rgb', () => {
            expect(func('#000')).toBe('rgb(0, 0, 0)');
            expect(func('#000000')).toBe('rgb(0, 0, 0)');
            expect(func('#012345')).toBe('rgb(1, 35, 69)');
            expect(func('#6789ab')).toBe('rgb(103, 137, 171)');
            expect(func('#cdefff')).toBe('rgb(205, 239, 255)');
        });
        it('should convert valid hex with alpha value to rgba', () => {
            const alpha = 0.2;
            expect(func(`#000`, alpha)).toBe(`rgba(0, 0, 0, ${alpha})`);
            expect(func(`#000000`, alpha)).toBe(`rgba(0, 0, 0, ${alpha})`);
            expect(func(`#012345`, alpha)).toBe(`rgba(1, 35, 69, ${alpha})`);
            expect(func(`#6789ab`, alpha)).toBe(`rgba(103, 137, 171, ${alpha})`);
            expect(func(`#cdefff`, alpha)).toBe(`rgba(205, 239, 255, ${alpha})`);
        });
        it('should return the given value for an invalid hex', () => {
            const invalidHexValues = [
                '123',
                'JOHN',
                'rgb(0,0,0)',
                'rgba(0,0,0,1)',
                '#12',
                '#1234',
                '#1234567',
                '#'
            ];
            invalidHexValues.forEach(nonHex => {
                expect(func(nonHex)).toBe(nonHex)
            });
        });

    });

    describe('mergeDeep()', () => {
        const func = otherUtils.mergeDeep;

        it('should merge multiple objects', () => {
            expect(func({ name: 'piet' }, { id: 0 })).toEqual({ id: 0, name: 'piet' });
            expect(func({ name: 'jan' }, {})).toEqual({ name: 'jan' });
        });
        it('should be able to handle multiple objects', () => {
            expect(func({}, {}, {})).toEqual({});
            const obj1: any = {};
            const obj2: any = {};
            const obj3: any = {};
            const obj4: any = {};
            const expected: any = {};
            for (let i = 0; i < 100; i++) {
                expected['key' + i] = i;
                if (i % 3) obj1['key' + i] = i;
                else if (i % 4) obj2['key' + i] = i;
                else if (i % 5) obj3['key' + i] = i;
                else obj4['key' + i] = i;
            }
            expect(func(obj1, obj2, obj3, obj4)).toEqual(expected);
        });
        it('should be able to merge objects with the same keys', () => {
            expect(func({ name: 'piet' }, { name: 'piet', id: 0 })).toEqual({ id: 0, name: 'piet' });
        });
        it('should take the value from the last merged object for duplicate keys', () => {
            expect(func({ name: 'piet' }, { name: 'jan' })).toEqual({ name: 'jan' });
        });
        it('should take the merge the value from the last merged object for duplicate keys if both of the values are objects', () => {
            expect(func({ info: { msg: 'hello' } }, { info: { id: 0 } })).toEqual( { info: { id: 0, msg: 'hello' } });
            expect(func({ info: { msg: 'hello' } }, { info: { msg: 'bye' } })).toEqual( { info: { msg: 'bye' } });
        });
        it('should overwrite a value of a key that is an object, if the new value is a primitive value', () => {
            expect(func({ info: { msg: 'hello' } }, { info: 'string' })).toEqual( { info: 'string' });
            expect(func({ info: { msg: 'hello' } }, { info: 123 })).toEqual( { info: 123 });
            expect(func({ info: { msg: 'hello' } }, { info: true })).toEqual( { info: true });
        });
    })
});
