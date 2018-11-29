import * as React from 'react';
import {shallow} from 'enzyme';
import TopBar from './TopBar';
import {AppBar} from '@material-ui/core';

describe('<TopBar /> (component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);
    const props = {
        classes: {},
        title: 'Hello',
        drawerOpened: true,
        darkThemeActive: false,
        handleDrawerOpen: () => { return },
        handleThemeToggle: () => { return }
    };

    const state = {
        mobileMenuAnchorEl: null as HTMLElement,
        menuItems: [
            {
                key: 'notifications',
                text: 'Notificaties',
                icon: 'notifications',
                badge: {
                    amount: 11,
                    color: 'secondary'
                }
            },
            {
                key: 'theme',
                text: 'Donker thema',
                icon: 'brightness_2',
                whenDarkTheme: {
                    text: 'Licht thema',
                    icon: 'wb_sunny'
                }
            },
            {
                key: 'settings',
                text: 'Instellingen',
                icon: 'settings'
            },
        ]
    };

    beforeEach(() => {
        wrapper = shallow(<TopBar {...props} >{children}</TopBar>);
        wrapper.setState(state)
    });

    it('should be defined', () => {
        expect(TopBar).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have an AppBar element', () => {
        expect(wrapper.find(AppBar).length).toEqual(1);
    });
});
