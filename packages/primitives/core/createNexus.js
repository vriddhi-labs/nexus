import React from 'react';
import { NexusThemeProvider, useNexusTheme } from './context.js';

/**
 * createNexus is the main factory function.
 * Accepts:
 *  - adapters:      object containing registered adapters, e.g. { shadcn: shadcnAdapter, antd: antdAdapter }
 *  - defaultEngine: fallback engine key if none is active
 * 
 * Returns a Proxy object that dynamically generates stable, adaptive component wrappers
 * for ANY component requested (e.g. Button, Table, Sidebar, or any future additions).
 */
export function createNexus({ adapters = {}, defaultEngine } = {}) {
  const registry = {};

  // Validate each adapter is valid and register it
  for (const [key, adapter] of Object.entries(adapters)) {
    if (!adapter || !adapter.__nexusAdapter) {
      throw new Error(`Adapter for engine "${key}" must be validated/created with createAdapter()`);
    }
    registry[key] = adapter;
  }

  // Ensure defaultEngine exists in registry if specified
  if (defaultEngine && !registry[defaultEngine]) {
    throw new Error(`defaultEngine "${defaultEngine}" is not present in the provided adapters`);
  }

  // The Provider component that wraps NexusThemeProvider
  const Provider = ({ engine, theme, children }) => {
    const activeEngine = engine || defaultEngine;
    return React.createElement(
      NexusThemeProvider,
      { engine: activeEngine, theme, registry },
      children
    );
  };

  // Helper to create an adaptive component dynamically
  const createAdaptiveComponent = (componentName) => {
    const AdaptiveComponent = (props) => {
      const context = useNexusTheme();
      
      // Fallback hierarchy: context.engine -> defaultEngine
      const activeEngine = context.engine || defaultEngine;
      const adapter = context.registry[activeEngine] || context.registry[defaultEngine];

      if (!adapter) {
        throw new Error(
          `No adapter found for engine "${activeEngine}" or defaultEngine "${defaultEngine}" in registry.`
        );
      }

      const Component = adapter[componentName];
      if (!Component) {
        throw new Error(
          `Component "${componentName}" is not implemented by adapter "${activeEngine}"`
        );
      }

      return React.createElement(Component, props);
    };

    AdaptiveComponent.displayName = `NexusAdaptive(${componentName})`;
    return AdaptiveComponent;
  };

  // Cache to ensure component references remain referentially stable
  const componentCache = {};

  // Construct target object pre-populated with components from all registered adapters
  const target = { Provider };
  for (const adapter of Object.values(registry)) {
    for (const key of Object.keys(adapter)) {
      if (key !== '__nexusAdapter') {
        target[key] = null; // Mark key as existing so it's discoverable
      }
    }
  }

  // Return a Proxy to dynamically intercept member access and destructuring
  return new Proxy(target, {
    get(obj, prop) {
      if (prop === 'Provider') {
        return Provider;
      }
      
      // Dynamic getter for components (standard capitalized React component name pattern)
      if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
        if (!componentCache[prop]) {
          componentCache[prop] = createAdaptiveComponent(prop);
        }
        return componentCache[prop];
      }

      return obj[prop];
    },
    
    has(obj, prop) {
      if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
        return true;
      }
      return prop in obj;
    },

    ownKeys(obj) {
      return Reflect.ownKeys(obj);
    },

    getOwnPropertyDescriptor(obj, prop) {
      if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
        return {
          enumerable: true,
          configurable: true,
          writable: false,
          value: this.get(obj, prop),
        };
      }
      return Reflect.getOwnPropertyDescriptor(obj, prop);
    }
  });
}
