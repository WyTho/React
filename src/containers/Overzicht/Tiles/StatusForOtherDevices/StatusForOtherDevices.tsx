import * as React from 'react';
import {connect} from 'react-redux';
import {IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {ModalType} from '../../../../utils/modal/modal';
import {createContentForItemsTile, IStatusItemsProps, ItemTileType} from '../../../../utils/dashboard/items';

class StatusForOtherDevices extends React.Component<IStatusItemsProps, {}> {

    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Andere apparaten in huis';

        let content = null;

        let on: IApiItem[];
        let off: IApiItem[];

        if (!loading && items) {

            // Create a list of all devices that are not in the group "Verlichting" and have "KILOWATT" usage
            let devices: IApiItem[] = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') === -1);
            devices = devices.filter(light => !!light.usages.filter(u => u.usage_type === 'KILOWATT')[0]);

            on = devices.filter(light => light.last_use.last_used);
            off = devices.filter(light => !light.last_use.last_used);

            // show the 3 items that use the most power
            const show: IApiItem[] = devices.sort(item => item.usages[0].usage).filter(item => item.last_use.last_used).slice(0, 3);

            const usage: number = on
                .map(light => light.usages.find(u => u.usage_type === 'KILOWATT').usage)
                // TODO: remove mapping to Number once backend-bug if fixed (sends strings instead of numbers)
                .map(x => Number(x))
                .reduce((sum, u) => sum + u, 0);

            content = createContentForItemsTile(ItemTileType.OTHER, usage, on, off, show);
        }

        return (
            <InformationCard title={title}
                             loading={loading}
                             errorMessage={!loading && !items ?  `Het laden van ${title.toLowerCase()} is mislukt!` : null}
                             onFetchData={props.fetchApiItemsData}
                             onClicked={() => props.openModal(ModalType.ITEM, title, { on, off })}>
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
