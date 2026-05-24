import React, { createContext, useContext } from 'react';

/**
 * NexusThemeContext holds:
 *  - engine:   the active UI library key (e.g. 'shadcn', 'antd', 'chakra')
 *  - theme:    'light' | 'dark'
 *  - registry: map of { [engineKey]: { Button, Table, Sidebar } }
 */
const NexusThemeContext = createContext({
  engine: 'shadcn',
  theme: 'light',
  registry: {},
});

export const NexusThemeProvider = ({ engine, theme, registry, children }) => {
  return React.createElement(
    NexusThemeContext.Provider,
    { value: { engine, theme, registry } },
    children
  );
};

export const useNexusTheme = () => useContext(NexusThemeContext);
