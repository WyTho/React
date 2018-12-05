import * as React from 'react';
import {connect} from 'react-redux';
import {IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {PopupType} from '../../../../utils/popup/popup';
import {createContentForItemsTile, IStatusItemsProps, ItemTileType} from '../../../../utils/dashboard/items';

export class StatusForOtherDevices extends React.Component<IStatusItemsProps, {}> {

    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Andere apparaten in huis';

        let content = null;

        let onclickHandler;

        if (!loading && items) {
            let on: IApiItem[];
            let off: IApiItem[];

            // Create a list of all devices that are not in the group "Verlichting" and have "KILOWATT" usage
            let devices: IApiItem[] = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') === -1);
            devices = devices.filter(light => !!light.usages.filter(u => u.consumption_type === 'KILOWATT')[0]);

            on = devices.filter(light => light.last_use.last_use_timestamp);
            off = devices.filter(light => !light.last_use.last_use_timestamp);

            // show the 3 items that use the most power
            const show: IApiItem[] = devices.sort(item => item.usages[0].consumption_amount)
                .filter(item => item.last_use.last_use_timestamp).slice(0, 3);

            const usage: number = on
                .map(light => light.usages.find(u => u.consumption_type === 'KILOWATT').consumption_amount)
                .reduce((sum, u) => sum + u, 0);

            content = createContentForItemsTile(ItemTileType.OTHER, usage, on, off, show);
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

export default connect(mapStateToProps)(StatusForOtherDevices);
