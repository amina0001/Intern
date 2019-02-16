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
        title: 'Active access',
        link: '#',
      },
      {
        title: 'Pending access',
        link: '#',
      },
    
      {
        title: 'Deleted access',
        link: '#',
      },
      {
        title: 'To validate',
        link: '#',
      },
     
    ],
  },
  {
    title: 'Users',
    icon: 'nb-person',
    children: [
      {
        title: 'Actives Users',
        link: '/pages/users/active-user',
      },
      {
        title: 'Deleted Users',
        link: '/pages/users/deleted',
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
        link: '/pages/resources/resource',
      },
      {
        title: 'Archiveved Resources',
        link: '/pages/resources/archived-resources',
      },
     
    ],
  },
  {
    title: 'Reports',
    icon: 'ion-folder',
    children: [
      {
        title: 'reports',
        link: '#',
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
