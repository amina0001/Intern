import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
   {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'My access',
    icon: 'nb-locked',
   
    children: [
     
      {
        title: 'extra-components',
        link: '/pages/extra-components/calendar',
      },
    
      {
        title: 'Deleted access',
        link: '/pages/extra-components/infinite-list',
      },
      {
        title: 'To validate',
        link: '/pages/extra-components/accordion',
      },
     
    ],
  },
  {
    title: 'Users',
    icon: 'nb-person',
    children: [
      {
        title: 'Actives Users',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Deleted Users',
        link: '/pages/tables/deleted',
      }
    ],
  },
  {
    title: 'Resources',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'Active Resources',
        link: '/pages/resources/active-resources',
      },
      {
        title: 'Pending Resources',
        link: '/resources/pending',
      },
      {
        title: 'Archiveved Resources',
        link: '/resources/archived',
      },
     
    ],
  },
  {
    title: 'Reports',
    icon: 'ion-folder',
    children: [
      {
        title: 'reports',
        link: '/pages/modal-overlays/dialog',
      },
   
    ],
  },
  {
    title: 'Script Power Shell',
    icon: 'nb-compose',
    'link': '/pages/scripts/scripts-power-shell',
   
  },
  {
    title: ' Settings',
    icon: 'ion-settings',
    link: '/pages/settings/configuration',

  },

];
