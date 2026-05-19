import React, { useState } from 'react';
import { Layers, LayoutDashboard, Settings, Users, Box, Terminal } from 'lucide-react';

// Import all Shadcn Primitives
import { Sidebar as ShadcnSidebar } from './primitives/shadcn/Sidebar';
import { Button as ShadcnButton } from './primitives/shadcn/Button';
import { Table as ShadcnTable } from './primitives/shadcn/Table';

// Import all AntD Primitives
import { Sidebar as AntdSidebar } from './primitives/antd/Sidebar';
import { Button as AntdButton } from './primitives/antd/Button';
import { Table as AntdTable } from './primitives/antd/Table';

export default function App() {
  const [activeLibrary, setActiveLibrary] = useState('shadcn');
  const [activeTheme, setActiveTheme] = useState('light');
  const [activeSidebarItem, setActiveSidebarItem] = useState('components');

  // Shared mock data for the tables
  const tableColumns = [
    { title: 'Component ID', key: 'id', dataIndex: 'id' },
    { title: 'Status', key: 'status', dataIndex: 'status' },
    { title: 'Engine Render', key: 'engine', dataIndex: 'engine' }
  ];
  
  const tableData = [
    { id: '@nexus/button', status: 'Active', engine: activeLibrary.toUpperCase() },
    { id: '@nexus/table', status: 'Active', engine: activeLibrary.toUpperCase() },
    { id: '@nexus/sidebar', status: 'Active', engine: activeLibrary.toUpperCase() }
  ];

  // Shared mock items for the sidebars
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'components', label: 'Components', icon: Box },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Dynamically select the correct library maps
  const Sidebar = activeLibrary === 'shadcn' ? ShadcnSidebar : AntdSidebar;
  const Button = activeLibrary === 'shadcn' ? ShadcnButton : AntdButton;
  const Table = activeLibrary === 'shadcn' ? ShadcnTable : AntdTable;

  return (
    <div className={`min-h-screen font-sans ${activeTheme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation Bar / Controls */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Nexus Primitives Showcase</h1>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Live Component Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
          <button 
            onClick={() => setActiveLibrary('shadcn')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeLibrary === 'shadcn' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            ShadCN
          </button>
          <button 
            onClick={() => setActiveLibrary('antd')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeLibrary === 'antd' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Ant Design
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTheme(t => t === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {activeTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Buttons Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-500" /> 
              Interactive Buttons
            </h2>
            <p className="text-slate-500 text-sm mt-1">Normalized to variants: primary, secondary, danger. Sizes: small, medium, large.</p>
          </div>
          
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-8 overflow-hidden relative">
             <div className="flex items-center gap-6 flex-wrap">
                <Button variant="primary" size="large" onClick={() => alert('Primary Large clicked!')}>Primary Large</Button>
                <Button variant="primary" size="medium" onClick={() => alert('Primary Default clicked!')}>Primary Default</Button>
                <Button variant="primary" size="small" onClick={() => alert('Primary Small clicked!')}>Primary Small</Button>
             </div>
             <div className="flex items-center gap-6 flex-wrap">
                <Button variant="secondary" size="medium" onClick={() => alert('Secondary clicked!')}>Secondary / Outline</Button>
                <Button variant="danger" size="medium" onClick={() => alert('Danger clicked!')}>Danger / Destructive</Button>
             </div>
          </div>
        </section>

        {/* Table Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-500" /> 
              Data Tables
            </h2>
            <p className="text-slate-500 text-sm mt-1">Normalized data structures passed into framework-specific rendering engines.</p>
          </div>
          
          <div className="p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
             <Table data={tableData} columns={tableColumns} />
          </div>
        </section>

        {/* Sidebar Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-indigo-500" /> 
              Sidebar Navigation
            </h2>
            <p className="text-slate-500 text-sm mt-1">Universal layout routing shell isolated inside a 500px container frame.</p>
          </div>
          
          {/* Framed Container to show Sidebar without breaking the whole page */}
          <div className="h-[500px] border-4 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-50 dark:bg-slate-950 flex ring-4 ring-white dark:ring-slate-900">
             <Sidebar 
               items={sidebarItems}
               activeItem={activeSidebarItem}
               onSelect={(item) => setActiveSidebarItem(item.id)}
               theme={activeTheme}
               title="Nexus Shell"
               logo={<div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">N</div>}
             />
             <div className="flex-1 p-8 flex items-center justify-center">
                <div className="text-center text-slate-400 dark:text-slate-600 font-medium">
                  <p>Sidebar renders cleanly in {activeLibrary}</p>
                  <p className="text-sm mt-2 opacity-50">Active route: /{activeSidebarItem}</p>
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
