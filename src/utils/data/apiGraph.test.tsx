
import * as apiGraphUtils from './apiGraph';

describe('apiGraph.tsx (utils)', () => {

    describe('getAllDatasets()', () => {
        const func = apiGraphUtils.getAllDatasets;

        it('should return a list of all datasets', () => {
            expect(func()).toEqual(['AVERAGE_TEMPERATURE', 'AVERAGE_WATER_USAGE']);
        });

    });

});
