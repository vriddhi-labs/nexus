import React from 'react';
import { Dropdown as AntDropdown } from 'antd';
import { Button } from './Button';

export const DropDown = () => {
  const items = [
    {
      key: 'my-account-group',
      type: 'group',
      label: 'My Account',
      children: [
        {
          key: 'profile',
          label: 'Profile',
          extra: <span className="font-mono text-xs text-slate-400">⇧⌘P</span>,
        },
        {
          key: 'billing',
          label: 'Billing',
          extra: <span className="font-mono text-xs text-slate-400">⌘B</span>,
        },
        {
          key: 'settings',
          label: 'Settings',
          extra: <span className="font-mono text-xs text-slate-400">⌘S</span>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'team-group',
      children: [
        {
          key: 'team',
          label: 'Team',
        },
        {
          key: 'invite-users',
          label: 'Invite users',
          children: [
            {
              key: 'email',
              label: 'Email',
            },
            {
              key: 'message',
              label: 'Message',
            },
            {
              type: 'divider',
            },
            {
              key: 'more',
              label: 'More...',
            },
          ],
        },
        {
          key: 'new-team',
          label: 'New Team',
          extra: <span className="font-mono text-xs text-slate-400">⌘+T</span>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'github',
      label: 'GitHub',
    },
    {
      key: 'support',
      label: 'Support',
    },
    {
      key: 'api',
      label: 'API',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Log out',
      extra: <span className="font-mono text-xs text-slate-400">⇧⌘Q</span>,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') alert('Profile clicked!');
    else if (key === 'billing') alert('Billing clicked!');
    else if (key === 'settings') alert('Settings clicked!');
    else if (key === 'team') alert('Team clicked!');
    else if (key === 'email') alert('Invite via Email');
    else if (key === 'message') alert('Invite via Message');
    else if (key === 'more') alert('Invite via More');
    else if (key === 'new-team') alert('New Team clicked!');
    else if (key === 'github') alert('GitHub clicked!');
    else if (key === 'support') alert('Support clicked!');
    else if (key === 'logout') alert('Log out clicked!');
  };

  return (
    <AntDropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={['click']}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
    >
      <Button variant="secondary">Open</Button>
    </AntDropdown>
  );
};
