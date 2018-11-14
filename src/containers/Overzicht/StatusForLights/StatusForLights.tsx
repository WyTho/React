import * as React from 'react';
import {connect} from 'react-redux';
import {Grid, Icon, Theme, Typography} from '@material-ui/core';
import {IApiItem} from '../../../utils/data/dataTypes';
import InformationCard from '../../../components/InformationCard/InformationCard';

export interface IStatusForLightsProps {
    theme: Theme
    fetchApiItemsData: () => void
    openModal: (title: string, date: Date, value: number | string) => void
    items: IApiItem[],
    loading: boolean
}

class StatusForLights extends React.Component<IStatusForLightsProps, {}> {
    public render() {
        const { props, props: { items, loading } } = this;

        const title = 'Lampen in huis';

        let content = null;

        if (!loading && items) {

            // Create a list of all items in the group "Verlichting" that have "KILOWATT" usage
            let lights = items.filter(item => item.groups.map(group => group.name).indexOf('Verlichting') !== -1);
            lights = lights.filter(light => !!light.usages.filter(u => u.usage_type === 'KILOWATT')[0]);

            const lightsOn = lights.filter(light => light.last_use.last_used);
            const lightsOff = lights.filter(light => !light.last_use.last_used);

            const lightsOnUsage = lightsOn
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
                            {lightsOn.length} staan aan
                        </Typography>
                    </Grid>
                    <Grid item>
                        <hr />
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1'>
                            {lightsOff.length} staan uit
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        return (
            <InformationCard title={title}
                             loading={loading}
                             errorMessage={!loading && !items ?  `Het laden van ${title.toLowerCase()} is mislukt!` : null}
                             onFetchData={props.fetchApiItemsData} >
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
