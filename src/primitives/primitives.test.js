import { describe, it, expect } from 'vitest';
import {
  Sidebar as AntdSidebar,
  Button as AntdButton,
  Table as AntdTable,
  ProfileDialog as AntdProfileDialog,
  StickyFooterDialog as AntdStickyFooterDialog,
  DialogCloseButton as AntdDialogCloseButton,
  DialogNoCloseButton as AntdDialogNoCloseButton,
  DropDown as AntdDropDown,
  TabsLine as AntdTabsLine,
  TabsVertical as AntdTabsVertical,
  TabsDisabled as AntdTabsDisabled,
} from './antd/index.js';
import {
  Sidebar as ShadcnSidebar,
  Button as ShadcnButton,
  Table as ShadcnTable,
  ProfileDialog as ShadcnProfileDialog,
  StickyFooterDialog as ShadcnStickyFooterDialog,
  DialogCloseButton as ShadcnDialogCloseButton,
  DialogNoCloseButton as ShadcnDialogNoCloseButton,
  DropDown as ShadcnDropDown,
  TabsLine as ShadcnTabsLine,
  TabsVertical as ShadcnTabsVertical,
  TabsDisabled as ShadcnTabsDisabled,
} from './shadcn/index.js';
import {
  Sidebar as ThemeSidebar,
  Button as ThemeButton,
  Table as ThemeTable,
  ProfileDialog as ThemeProfileDialog,
  StickyFooterDialog as ThemeStickyFooterDialog,
  DialogCloseButton as ThemeDialogCloseButton,
  DialogNoCloseButton as ThemeDialogNoCloseButton,
  DropDown as ThemeDropDown,
  TabsLine as ThemeTabsLine,
  TabsVertical as ThemeTabsVertical,
  TabsDisabled as ThemeTabsDisabled,
} from './theme.js';
import {
  Sidebar as RootSidebar,
  Button as RootButton,
  Table as RootTable,
  ProfileDialog as RootProfileDialog,
  StickyFooterDialog as RootStickyFooterDialog,
  DialogCloseButton as RootDialogCloseButton,
  DialogNoCloseButton as RootDialogNoCloseButton,
  DropDown as RootDropDown,
  TabsLine as RootTabsLine,
  TabsVertical as RootTabsVertical,
  TabsDisabled as RootTabsDisabled,
} from './index.js';

describe('primitives module exports', () => {
  it('should export AntD Sidebar, Button, Table, ProfileDialog, StickyFooterDialog, DialogCloseButton, DialogNoCloseButton, Tabs, and Dropdown components from ant index', () => {
    expect(typeof AntdSidebar).toBe('function');
    expect(typeof AntdButton).toBe('function');
    expect(typeof AntdTable).toBe('function');
    expect(['function', 'object']).toContain(typeof AntdProfileDialog);
    expect(['function', 'object']).toContain(typeof AntdStickyFooterDialog);
    expect(['function', 'object']).toContain(typeof AntdDialogCloseButton);
    expect(['function', 'object']).toContain(typeof AntdDialogNoCloseButton);
    expect(['function', 'object']).toContain(typeof AntdDropDown);
    expect(['function', 'object']).toContain(typeof AntdTabsLine);
    expect(['function', 'object']).toContain(typeof AntdTabsVertical);
    expect(['function', 'object']).toContain(typeof AntdTabsDisabled);
  });

  it('should export ShadCN Sidebar, Button, Table, ProfileDialog, StickyFooterDialog, DialogCloseButton, DialogNoCloseButton, Tabs, and Dropdown components from shadcn index', () => {
    expect(typeof ShadcnSidebar).toBe('function');
    expect(typeof ShadcnButton).toBe('function');
    expect(typeof ShadcnTable).toBe('function');
    expect(['function', 'object']).toContain(typeof ShadcnProfileDialog);
    expect(['function', 'object']).toContain(typeof ShadcnStickyFooterDialog);
    expect(['function', 'object']).toContain(typeof ShadcnDialogCloseButton);
    expect(['function', 'object']).toContain(typeof ShadcnDialogNoCloseButton);
    expect(['function', 'object']).toContain(typeof ShadcnDropDown);
    expect(['function', 'object']).toContain(typeof ShadcnTabsLine);
    expect(['function', 'object']).toContain(typeof ShadcnTabsVertical);
    expect(['function', 'object']).toContain(typeof ShadcnTabsDisabled);
  });

  it('should export Sidebar, Button, Table, ProfileDialog, StickyFooterDialog, DialogCloseButton, DialogNoCloseButton, Tabs, and Dropdown components from theme.js via selected library', () => {
    expect(typeof ThemeSidebar).toBe('function');
    expect(typeof ThemeButton).toBe('function');
    expect(typeof ThemeTable).toBe('function');
    expect(['function', 'object']).toContain(typeof ThemeProfileDialog);
    expect(['function', 'object']).toContain(typeof ThemeStickyFooterDialog);
    expect(['function', 'object']).toContain(typeof ThemeDialogCloseButton);
    expect(['function', 'object']).toContain(typeof ThemeDialogNoCloseButton);
    expect(['function', 'object']).toContain(typeof ThemeDropDown);
    expect(['function', 'object']).toContain(typeof ThemeTabsLine);
    expect(['function', 'object']).toContain(typeof ThemeTabsVertical);
    expect(['function', 'object']).toContain(typeof ThemeTabsDisabled);
  });

  it('should export Sidebar, Button, Table, ProfileDialog, StickyFooterDialog, DialogCloseButton, DialogNoCloseButton, Tabs, and Dropdown components from primitives root index', () => {
    expect(typeof RootSidebar).toBe('function');
    expect(typeof RootButton).toBe('function');
    expect(typeof RootTable).toBe('function');
    expect(['function', 'object']).toContain(typeof RootProfileDialog);
    expect(['function', 'object']).toContain(typeof RootStickyFooterDialog);
    expect(['function', 'object']).toContain(typeof RootDialogCloseButton);
    expect(['function', 'object']).toContain(typeof RootDialogNoCloseButton);
    expect(['function', 'object']).toContain(typeof RootDropDown);
    expect(['function', 'object']).toContain(typeof RootTabsLine);
    expect(['function', 'object']).toContain(typeof RootTabsVertical);
    expect(['function', 'object']).toContain(typeof RootTabsDisabled);
  });
});
