import * as React from 'react';
import Overzicht from './containers/Overzicht/Overzicht';
import Ruimtes from './containers/Ruimtes/Ruimtes';
import Planning from './containers/Planning/Planning';
import Toezicht from './containers/Toezicht/Toezicht';
import Community from './containers/Community/Community';

interface IRouteItem {
    path: string,
    name: string,
    icon: string,
    component: React.ComponentType,
}

export const routes: IRouteItem[] = [
    { path: '/', name: 'Overzicht', icon: 'dashboard', component: Overzicht  },
    { path: '/ruimtes', name: 'Ruimtes', icon: 'tune', component: Ruimtes  },
    { path: '/planning', name: 'Planning', icon: 'schedule', component: Planning  },
    { path: '/toezicht', name: 'Toezicht', icon: 'remove_red_eye', component: Toezicht  },
    { path: '/community', name: 'Community', icon: 'people', component: Community  }
];

export default routes;
