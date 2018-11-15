import * as React from 'react';
import {connect} from 'react-redux';
import {Grid, Icon, Theme, Typography} from '@material-ui/core';
import {IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {IModalDataItems, ModalType} from '../../../../utils/modal/modal';

export interface IStatusForLightsProps {
    theme: Theme
    fetchApiItemsData: () => void
    openModal: (type: ModalType, title: string, data: IModalDataItems) => void
    items: IApiItem[],
    loading: boolean
}

class StatusForLights extends React.Component<IStatusForLightsProps, {}> {

    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Lampen in huis';

        let lights: IApiItem[] = [];
        let on: IApiItem[] = [];
        let off: IApiItem[] = [];

        let content = null;

        if (!loading && items) {

            // Create a list of all items in the group "Verlichting" that have "KILOWATT" usage
            lights = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') !== -1);
            lights = lights.filter(light => !!light.usages.filter(u => u.usage_type === 'KILOWATT')[0]);

            on = lights.filter(light => light.last_use.last_used);
            off = lights.filter(light => !light.last_use.last_used);

            const lightsOnUsage = on
                .map(light => light.usages.find(u => u.usage_type === 'KILOWATT').usage)
                // TODO: remove mapping to Number once backend-bug if fixed (sends strings instead of numbers)
                .map(x => Number(x))
                .reduce((sum, usage) => sum + usage, 0);

            content = (
                <Grid container direction='column' justify='space-between' alignItems='stretch' className={'textCenter'}>
                    <Grid item>
                        <Typography variant='overline' className='tinyText'>
                            verbruik: {lightsOnUsage} Kwh
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Icon style={{ fontSize: 120 }} color='secondary'>wb_incandescent</Icon>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1' color='secondary'>
                            {on.length} staan aan
                        </Typography>
                    </Grid>
                    <Grid item>
                        <hr />
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1'>
                            {off.length} staan uit
                        </Typography>
                    </Grid>
                </Grid>
            );
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
