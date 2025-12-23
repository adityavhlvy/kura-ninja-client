import React from 'react';
import type { IconType } from 'react-icons';
import { RiErrorWarningLine, RiGhostLine } from 'react-icons/ri';

export interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  color: string;
}

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'anti-ux',
    title: 'The Anti-UX Form',
    description: 'A study in frustration. Design rules broken on purpose.',
    icon: RiErrorWarningLine,
    path: '/playground/anti-ux',
    component: React.lazy(() => import('./experiments/anti-ux/AntiUX')),
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'void',
    title: 'The Screaming Void',
    description: 'Throw your thoughts into the abyss. It might scream back.',
    icon: RiGhostLine,
    path: '/playground/void',
    component: React.lazy(() => import('./experiments/screaming-void/ScreamingVoid')),
    color: 'from-gray-900 to-black'
  }
];

