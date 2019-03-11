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
    title: 'My Access',
    icon: 'nb-locked',
   
    children: [
     
      {
        title: 'Active Access',
        link: '#',
      },
      {
        title: 'Pending Access',
        link: '#',
      },
    
      {
        title: 'Deleted Access',
        link: '#',
      },
      {
        title: 'To Validate',
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
    title: 'Groups',
    icon: 'nb-list',
    children: [
      {
        title: 'Manage Groups',
        link: '/pages/groups/users',
      },
      {
        title: 'Add Users To Group ',
        link: '/pages/groups/add-users',
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
        link: '/pages/resources/pending-resources',
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
    title: ' Profile',
    icon: 'ion-document-text',
    link: '/pages/profiles/profile',

  },

  {
    title: ' Settings',
    icon: 'ion-settings',
    link: '/pages/settings/configuration',

  },

];
