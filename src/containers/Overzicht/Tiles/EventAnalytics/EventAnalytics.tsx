import * as React from 'react';
import {connect} from 'react-redux';
import {IApiAnalytics, IApiItem} from '../../../../utils/data/dataTypes';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {IPopup, PopupType} from '../../../../utils/popup/popup';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme, Typography} from '@material-ui/core';

export interface IEventAnalyticsProps {
    theme: Theme
    fetchApiData: () => void
    openPopup: (popup: IPopup) => void
    analytics: IApiAnalytics[],
    items: IApiItem[],
    loading: boolean
}
export class EventAnalytics extends React.Component<IEventAnalyticsProps, {}> {

    public render() {
        const { props, props: { analytics, loading, items } } = this;

        const title = 'Voorspelde groepen op basis van jou activiteit';

        let content;

        let onClickHandler: () => void;
        if (!loading) {
            if (!analytics || !analytics.length)  {
                content = <>There are no predicted groups at the moment</>;
            } else {
                const percentageStyles = (persentage: number): any => {
                    let styles: any = {};

                    if (persentage < 25) {
                        styles['color'] = '#bf5a5a';
                    } else if (persentage < 50) {
                        styles['color'] = '#bf7239';
                    } else if (persentage < 75) {
                        styles['color'] = '#009500';
                    } else if (persentage >= 75) {
                        styles['color'] = '#00a700';
                        styles['fontWeight'] = 'bold';
                    }

                    return styles
                };

                let analyticsSorted = analytics.slice();
                analyticsSorted = analyticsSorted.sort((a, b) => {
                    return a.is_predicted_group_percentage - b.is_predicted_group_percentage;
                });
                analyticsSorted = analyticsSorted.sort((a, b) => {
                    return a.is_relevant_group_percentage - b.is_relevant_group_percentage;
                });
                analyticsSorted = analyticsSorted.reverse();

                onClickHandler = () => {

                    props.openPopup({
                        type: PopupType.GROUP,
                        title: 'Nieuwe groep aan maken',
                        data: {
                            name: '',
                            is_module: false,
                            items: []
                        }
                    })
                };
                content = (
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Voorgestelde groepering</TableCell>
                                    <TableCell numeric>Kans dat het een groep is</TableCell>
                                    <TableCell numeric>Relevantie</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {analyticsSorted.slice(0, 4).map((prediction, i) => {
                                    return (
                                        <TableRow key={`prediction-row-${i}`} style={onClickHandler ? {cursor: 'pointer'} : {}} onClick={onClickHandler}>
                                            <TableCell component='th' scope='row'>
                                                {prediction.item_ids.map(itemId => {
                                                    let itemText = `Het item met id ${itemId} bestaat niet meer...`;
                                                    const item = items.find(i => i.id === itemId);
                                                    if (item) {
                                                        itemText = item.name
                                                    }
                                                    return(
                                                        <Typography variant='caption' key={`prediction-item-${i}-${itemId}`}>
                                                            {itemText}
                                                        </Typography>
                                                    )
                                                })}
                                            </TableCell>
                                            <TableCell numeric style={percentageStyles(prediction.is_predicted_group_percentage)}>
                                                {prediction.is_predicted_group_percentage} %
                                            </TableCell>
                                            <TableCell numeric style={percentageStyles(prediction.is_relevant_group_percentage)}>
                                                {prediction.is_relevant_group_percentage} %
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                )
            }
        }
        return (
            <InformationCard title={title}
                             loading={loading}
                             errorMessage={!loading && !analytics ? `Het laden van ${title.toLowerCase()} is mislukt!` : null}
                             onFetchData={props.fetchApiData}>
                { content }
            </InformationCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { analytics, loading, items } = state.data;

    return { theme, analytics, items, loading: loading.analytics }
};

export default connect(mapStateToProps)(EventAnalytics);
