import { describe, it, expect } from 'vitest';
import React from 'react';
import { createAdapter } from './core/createAdapter.js';
import { createNexus } from './core/createNexus.js';
import { shadcnAdapter } from '@nexus-ui/shadcn';
import { antdAdapter } from '@nexus-ui/antd';

describe('@nexus-ui/primitives package', () => {
  describe('createAdapter', () => {
    it('should successfully freeze a valid adapter with all components', () => {
      const MockButton = () => React.createElement('button', null, 'Click me');
      const MockTable = () => React.createElement('table', null);
      const MockSidebar = () => React.createElement('aside', null);

      const adapter = createAdapter({
        Button: MockButton,
        Table: MockTable,
        Sidebar: MockSidebar,
      });

      expect(adapter.Button).toBe(MockButton);
      expect(adapter.Table).toBe(MockTable);
      expect(adapter.Sidebar).toBe(MockSidebar);
      expect(adapter.__nexusAdapter).toBe(true);
      expect(Object.isFrozen(adapter)).toBe(true);
    });

    it('should throw descriptive error when components are missing', () => {
      const MockButton = () => React.createElement('button', null, 'Click me');

      expect(() => createAdapter({ Button: MockButton })).toThrowError(
        'Invalid Nexus Adapter: Missing required component(s): Table, Sidebar'
      );
    });

    it('should support adding custom required components list', () => {
      const MockCard = () => React.createElement('div', null);
      const adapter = createAdapter({ Card: MockCard }, { required: ['Card'] });
      expect(adapter.Card).toBe(MockCard);
    });
  });

  describe('createNexus', () => {
    it('should instantiate and return adaptive components and Provider', () => {
      const mockAdapter = createAdapter({
        Button: () => React.createElement('button', null, 'Button'),
        Table: () => React.createElement('table', null),
        Sidebar: () => React.createElement('aside', null),
      });

      const { Provider, Button, Table, Sidebar } = createNexus({
        adapters: { mock: mockAdapter },
        defaultEngine: 'mock',
      });

      expect(typeof Provider).toBe('function');
      expect(typeof Button).toBe('function');
      expect(typeof Table).toBe('function');
      expect(typeof Sidebar).toBe('function');
    });

    it('should dynamically generate any new future component on demand via Proxy', () => {
      const MockCard = () => React.createElement('div', null, 'Card');
      const mockAdapter = createAdapter({
        Button: () => null,
        Table: () => null,
        Sidebar: () => null,
        Card: MockCard,
      });

      const nexus = createNexus({
        adapters: { mock: mockAdapter },
        defaultEngine: 'mock',
      });

      // Dynamically access a new component "Card" that was never hardcoded in createNexus
      const { Card } = nexus;
      expect(typeof Card).toBe('function');
      expect(Card.displayName).toBe('NexusAdaptive(Card)');

      // Ensure stable referential identity (subsequent gets return the exact same component)
      expect(nexus.Card).toBe(Card);
      expect(nexus.Card).toBe(nexus.Card);
    });

    it('should validate all registered adapters using createAdapter logic', () => {
      const invalidAdapter = { Button: () => null };

      expect(() => {
        createNexus({
          adapters: { invalid: invalidAdapter },
        });
      }).toThrowError('Adapter for engine "invalid" must be validated/created with createAdapter()');
    });

    it('should throw if defaultEngine is not registered in adapters', () => {
      const mockAdapter = createAdapter({
        Button: () => null,
        Table: () => null,
        Sidebar: () => null,
      });

      expect(() => {
        createNexus({
          adapters: { mock: mockAdapter },
          defaultEngine: 'nonexistent',
        });
      }).toThrowError('defaultEngine "nonexistent" is not present in the provided adapters');
    });
  });

  describe('Built-in adapters integrity', () => {
    it('should successfully expose shadcnAdapter with valid structure', () => {
      expect(shadcnAdapter.__nexusAdapter).toBe(true);
      expect(typeof shadcnAdapter.Button).toBe('function');
      expect(typeof shadcnAdapter.Table).toBe('function');
      expect(typeof shadcnAdapter.Sidebar).toBe('function');
    });

    it('should successfully expose antdAdapter with valid structure', () => {
      expect(antdAdapter.__nexusAdapter).toBe(true);
      expect(typeof antdAdapter.Button).toBe('function');
      expect(typeof antdAdapter.Table).toBe('function');
      expect(typeof antdAdapter.Sidebar).toBe('function');
    });
  });
});
