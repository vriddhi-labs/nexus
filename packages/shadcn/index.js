import { createAdapter } from '@nexus-ui/primitives';
import { Button } from './Button.jsx';
import { Table } from './Table.jsx';
import { Sidebar } from './Sidebar.jsx';

export const shadcnAdapter = createAdapter({
  Button,
  Table,
  Sidebar,
});
