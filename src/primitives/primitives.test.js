import { describe, it, expect } from 'vitest';
import { Sidebar as AntdSidebar, Button as AntdButton, Table as AntdTable } from './antd/index.js';
import { Sidebar as ShadcnSidebar, Button as ShadcnButton, Table as ShadcnTable } from './shadcn/index.js';
import { Sidebar as ThemeSidebar, Button as ThemeButton, Table as ThemeTable } from './theme.js';
import { Sidebar as RootSidebar, Button as RootButton, Table as RootTable } from './index.js';

describe('primitives module exports', () => {
  it('should export AntD Sidebar, Button, and Table from ant index', () => {
    expect(typeof AntdSidebar).toBe('function');
    expect(typeof AntdButton).toBe('function');
    expect(typeof AntdTable).toBe('function');
  });

  it('should export ShadCN Sidebar, Button, and Table from shadcn index', () => {
    expect(typeof ShadcnSidebar).toBe('function');
    expect(typeof ShadcnButton).toBe('function');
    expect(typeof ShadcnTable).toBe('function');
  });

  it('should export Sidebar, Button, and Table from theme.js via selected library', () => {
    expect(typeof ThemeSidebar).toBe('function');
    expect(typeof ThemeButton).toBe('function');
    expect(typeof ThemeTable).toBe('function');
  });

  it('should export Sidebar, Button, and Table from primitives root index', () => {
    expect(typeof RootSidebar).toBe('function');
    expect(typeof RootButton).toBe('function');
    expect(typeof RootTable).toBe('function');
  });
});
