import React, { createContext, useContext } from 'react';

const NexusThemeContext = createContext({
  engine: 'shadcn',
  theme: 'light'
});

export const NexusThemeProvider = ({ engine = 'shadcn', theme = 'light', children }) => {
  return React.createElement(
    NexusThemeContext.Provider,
    { value: { engine, theme } },
    children
  );
};

export const useNexusTheme = () => {
  return useContext(NexusThemeContext);
};
