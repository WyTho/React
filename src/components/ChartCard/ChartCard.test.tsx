import * as React from 'react';
import {shallow} from 'enzyme';
import ChartCard from './chartCard';
import {Button, Paper} from '@material-ui/core';
import Loading from '../../components/Loading/Loading';

describe('<ChartCard /> (functional component)', () => {
    let wrapper: any;
    let loadingWrapper: any;
    let errorWrapper: any;
    let noDataWrapper: any;

    const defaultProps = {
        title: 'My card',
        loading: false,
        chartData: {},
        chartOptions: {},
        onFetchData: () => { return }
    };
    beforeEach(() => {

        wrapper = shallow(
            <ChartCard {...defaultProps} >
                <h4>Hello</h4>
                <h4>World</h4>
            </ChartCard>
        );
        loadingWrapper = shallow(<ChartCard {...defaultProps} loading={true}><i>i</i></ChartCard>);
        errorWrapper = shallow(<ChartCard {...defaultProps} errorMessage='error'><i>i</i></ChartCard>);
        noDataWrapper = shallow(<ChartCard {...defaultProps} noDataMessage='noData'><i>i</i></ChartCard>);
    });
    it('should be defined', () => {
        expect(ChartCard).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a only one wrapping Paper element', () => {
        expect(wrapper.find(Paper).length).toEqual(1);
    });
    it('should have a titleContainer div, no matter what the props are', () => {
        expect(wrapper.find(Paper).find('div.titleContainer').text()).toEqual('My card');
        expect(wrapper.find(Paper).find('div.titleContainer').length).toEqual(1);
        expect(loadingWrapper.find(Paper).find('div.titleContainer').length).toEqual(1);
        expect(errorWrapper.find(Paper).find('div.titleContainer').length).toEqual(1);
        expect(noDataWrapper.find(Paper).find('div.titleContainer').length).toEqual(1);
    });
    it('should have a content div while loading = false', () => {
        expect(wrapper.find(Paper).find('div.content').length).toEqual(1);
    });
    it('should have a absoluteFlexContainer when loading, error or noData is truthy', () => {
        expect(loadingWrapper.find(Paper).find('div.absoluteFlexContainer').length).toEqual(1);
        expect(errorWrapper.find(Paper).find('div.absoluteFlexContainer').length).toEqual(1);
        expect(noDataWrapper.find(Paper).find('div.absoluteFlexContainer').length).toEqual(1);
    });
    it('should show a try again button when there is an error', () => {
        expect(errorWrapper.find(Button).length).toEqual(1);
    });
    it('should show a loading indicator when its loading', () => {
        expect(loadingWrapper.find(Loading).length).toEqual(1);
    });
});
