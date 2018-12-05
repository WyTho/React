import * as React from 'react';
import {connect} from 'react-redux';
import {IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {PopupType} from '../../../../utils/popup/popup';
import {createContentForItemsTile, IStatusItemsProps, ItemTileType} from '../../../../utils/dashboard/items';

export class StatusForLights extends React.Component<IStatusItemsProps, {}> {

    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Lampen in huis';

        let content = null;

        let onclickHandler;

        if (!loading && items) {
            let on: IApiItem[];
            let off: IApiItem[];

            // Create a list of all items in the group "Verlichting" that have "KILOWATT" usage
            let devices: IApiItem[] = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') !== -1);
            devices = devices.filter(item => !!item.usages.filter(u => u.consumption_type === 'KILOWATT')[0]);

            const deviceIsOn = (item: IApiItem) => {
                if (item.last_use) {
                    if (item.last_use.data !== item.usages[0].min_value) {
                        return true
                    }
                }
                return false;
            };

            on = devices.filter(item => deviceIsOn(item));
            off = devices.filter(item => !deviceIsOn(item));

            const usage: number = on
                .map(light => light.usages.find(u => u.consumption_type === 'KILOWATT').consumption_amount)
                .reduce((sum, u) => sum + u, 0);

            const show: IApiItem[] = [];

            content = createContentForItemsTile(ItemTileType.LIGHTS, usage, on, off, show);

            onclickHandler = () => props.openPopup({
                type: PopupType.ITEM_LIST,
                title,
                data: { on, off }
            })
        }

        return (
            <InformationCard title={title}
                             loading={loading}
                             errorMessage={!loading && !items ?  `Het laden van ${title.toLowerCase()} is mislukt!` : null}
                             onFetchData={props.fetchApiItemsData}
                             onClicked={onclickHandler}>
                { content }
            </InformationCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { items, loading } = state.data;

    return { theme, items, loading: loading.items }
};

export default connect(mapStateToProps)(StatusForLights);
