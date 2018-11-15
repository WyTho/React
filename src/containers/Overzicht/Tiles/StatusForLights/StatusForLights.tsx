import * as React from 'react';
import {connect} from 'react-redux';
import {IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {ModalType} from '../../../../utils/modal/modal';
import {createContentForItemsTile, IStatusItemsProps, ItemTileType} from '../../../../utils/dashboard/items';

class StatusForLights extends React.Component<IStatusItemsProps, {}> {

    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Lampen in huis';

        let content = null;

        let on: IApiItem[];
        let off: IApiItem[];

        if (!loading && items) {

            // Create a list of all items in the group "Verlichting" that have "KILOWATT" usage
            let devices: IApiItem[] = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') !== -1);
            devices = devices.filter(item => !!item.usages.filter(u => u.usage_type === 'KILOWATT')[0]);

            on = devices.filter(item => item.last_use.last_used);
            off = devices.filter(item => !item.last_use.last_used);

            const usage: number = on
                .map(light => light.usages.find(u => u.usage_type === 'KILOWATT').usage)
                // TODO: remove mapping to Number once backend-bug if fixed (sends strings instead of numbers)
                .map(x => Number(x))
                .reduce((sum, u) => sum + u, 0);

            const show: IApiItem[] = [];

            content = createContentForItemsTile(ItemTileType.LIGHTS, usage, on, off, show)
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

export default connect(mapStateToProps)(StatusForLights);
