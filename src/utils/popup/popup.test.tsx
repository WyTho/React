
import * as popupUtils from './popup';

describe('popup.tsx (utils)', () => {

    describe('getIconNameForGroups()', () => {
        const func = popupUtils.getIconNameForGroups;

        it('should get the icon for Lights if it has a light group (light icon has priority over any other groups)', () => {
            expect(func([
                { id: 0, name: 'Verlichting' }
            ])).toBe('wb_incandescent');

            expect(func([
                { id: 0, name: 'Verlichting' },
                { id: 1, name: 'Another_Group' },
            ])).toBe('wb_incandescent');

            expect(func([
                { id: 0, name: 'Another_Group' },
                { id: 1, name: 'Verlichting' },
            ])).toBe('wb_incandescent');

            expect(func([
                { id: 0, name: 'Another_Group' }
            ])).not.toBe('wb_incandescent');
        });

    });

});
