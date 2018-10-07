import { createStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

export default (
    { shape, breakpoints, transitions, zIndex, mixins, palette, spacing }: Theme
) => createStyles({

    // Used in multiple places
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...mixins.toolbar,
    },

    // Navbar
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: palette.background.default,
        padding: spacing.unit * 3,
    },

    // TopBar
    appBar: {
        position: 'absolute',
        zIndex: zIndex.drawer + 1,
        transition: transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [breakpoints.up('md')]: {
            display: 'none',
        },
    },
    iconPadding: {
        padding: '0 16px 0 12px'
    },
    toolbarSpacingLeft: {
        marginLeft: 12,
        marginRight: 36,
    },
    toolbarSpacingRight: {
        paddingRight: 12
    },

    // SideDrawer
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen,
        }),
        width: spacing.unit * 7,
        [breakpoints.up('sm')]: {
            width: spacing.unit * 9,
        },
    },

});
