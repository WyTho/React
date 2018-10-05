import { createStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

export default (
    { shape, breakpoints, transitions, zIndex, mixins, palette, spacing }: Theme
) => createStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
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
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    // menuButton: {
    //     marginLeft: -12,
    //     marginRight: 20,
    // },
    hide: {
        display: 'none',
    },
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
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: palette.background.default,
        padding: spacing.unit * 3,
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
    search: {
        position: 'relative',
        borderRadius: shape.borderRadius,
        backgroundColor: fade(palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(palette.common.white, 0.25),
        },
        marginRight: spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [breakpoints.up('sm')]: {
            marginLeft: spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: spacing.unit,
        paddingRight: spacing.unit,
        paddingBottom: spacing.unit,
        paddingLeft: spacing.unit * 10,
        transition: transitions.create('width'),
        width: '100%',
        [breakpoints.up('md')]: {
            width: 200,
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
});
