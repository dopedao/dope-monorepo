import React from 'react';

import DopeTabs, { DopeTabType } from '../ui/components/DopeTabs';

export default {
  title: 'DopeTabs',
  component: DopeTabs,
};

const tabs: DopeTabType[] = [
  {
    title: '0x0000000000000000000000000E770',
    number: 9,
    content: (
      <div>
        <p>first tab content</p>
      </div>
    ),
  },
  {
    title: 'Dope',
    number: 12,
    content: (
      <div>
        <p>second tab content</p>
      </div>
    ),
  },
  {
    title: 'Hustler',
    number: 26,
    content: (
      <div>
        <p>third tab content</p>
      </div>
    ),
  },
  {
    title: 'Equipment',
    number: 32,
    content: (
      <div>
        <p>fourth tab content</p>
      </div>
    ),
  },
];

export const Primary = () => <DopeTabs tabs={tabs} />;
