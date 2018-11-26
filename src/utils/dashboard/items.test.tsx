
import * as itemsUtils from './items';
import {ItemTileType} from './items';
import {IApiItem} from '../data/dataTypes';

describe('items.tsx (utils)', () => {

    describe('createContentForItemsTile()', () => {
        const func = itemsUtils.createContentForItemsTile;

        const type = ItemTileType.LIGHTS;
        const usage = 1;
        const on: IApiItem[] = [];
        const off: IApiItem[] = [];
        const itemsToShow: IApiItem[] = [];

        it('Should return some JSX code, even if empty arrays are send', () => {
            const res = func(type, usage, on, off, itemsToShow);
            expect(res).toBeDefined();
            expect(typeof res).toBe('object')
        });

    });

});
