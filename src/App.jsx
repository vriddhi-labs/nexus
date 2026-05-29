import React, { useState } from "react";
import {
  Layers,
  LayoutDashboard,
  Settings,
  Users,
  Box,
  Terminal,
} from "lucide-react";

// Import generic primitives from the root primitives index
import {
  Sidebar,
  Button,
  Table,
  ProfileDialog,
  StickyFooterDialog,
  DialogCloseButton,
  DialogNoCloseButton,
  DropDown,
  TabsLine,
  TabsVertical,
  TabsDisabled,
} from "./primitives";

import { ShadcnSidebar, ShadcnButton, ShadcnTable, ShadcnInput, ShadcnForm, ShadcnCard, AntdSidebar, AntdButton, AntdTable, AntdInput, AntdForm, AntdCard } from "./primitives";

const Input = React.forwardRef(
  ({ className = "", type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 ${className}`}
      {...props}
    />
  ),
);
Input.displayName = "Input";
// Import specific primitives to enable live switching in the showcase
// import { ShadcnSidebar, ShadcnButton, ShadcnTable, ShadcnInput, ShadcnForm, ShadcnCard, AntdSidebar, AntdButton, AntdTable, AntdInput, AntdForm, AntdCard } from "./primitives";

export default function App() {
  const [activeLibrary, setActiveLibrary] = useState("shadcn");
  const [activeTheme, setActiveTheme] = useState("light");
  const [activeSidebarItem, setActiveSidebarItem] = useState("components");

  // Dynamically select components based on activeLibrary
  const Button = activeLibrary === "antd" ? AntdButton : ShadcnButton;
  const Table = activeLibrary === "antd" ? AntdTable : ShadcnTable;
  const Sidebar = activeLibrary === "antd" ? AntdSidebar : ShadcnSidebar;
  const Input = activeLibrary === "antd" ? AntdInput : ShadcnInput;
  const Form = activeLibrary === "antd" ? AntdForm : ShadcnForm;
  const Card = activeLibrary === "antd" ? AntdCard : ShadcnCard;

  // Shared mock data for the tables
  const tableColumns = [
    { title: "Component ID", key: "id", dataIndex: "id" },
    { title: "Status", key: "status", dataIndex: "status" },
    { title: "Engine Render", key: "engine", dataIndex: "engine" },
  ];

  const tableData = [
    {
      id: "@nexus/button",
      status: "Active",
      engine: activeLibrary.toUpperCase(),
    },
    {
      id: "@nexus/table",
      status: "Active",
      engine: activeLibrary.toUpperCase(),
    },
    {
      id: "@nexus/sidebar",
      status: "Active",
      engine: activeLibrary.toUpperCase(),
    },
  ];

  // Shared mock items for the sidebars
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "components", label: "Components", icon: Box },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Use generic primitives imported from the root `./primitives`.
  // To switch implementations change the path in `src/primitives/theme.js`.

  return (
    <div
      className={`min-h-screen font-sans ${activeTheme === "dark" ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Top Navigation Bar / Controls */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">
              Nexus Primitives Showcase
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Live Component Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
          <button
            onClick={() => setActiveLibrary("shadcn")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeLibrary === "shadcn" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            ShadCN
          </button>
          <button
            onClick={() => setActiveLibrary("antd")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeLibrary === "antd" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-500" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Ant Design
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setActiveTheme((t) => (t === "light" ? "dark" : "light"))
            }
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {activeTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
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
            <p className="text-slate-500 text-sm mt-1">
              Normalized to variants: primary, secondary, danger. Sizes: small,
              medium, large.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-8 overflow-hidden relative">
            <div className="flex items-center gap-6 flex-wrap">
              <Button
                variant="primary"
                size="large"
                onClick={() => alert("Primary Large clicked!")}
              >
                Primary Large
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={() => alert("Primary Default clicked!")}
              >
                Primary Default
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => alert("Primary Small clicked!")}
              >
                Primary Small
              </Button>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <Button
                variant="secondary"
                size="medium"
                onClick={() => alert("Secondary clicked!")}
              >
                Secondary / Outline
              </Button>
              <Button
                variant="danger"
                size="medium"
                onClick={() => alert("Danger clicked!")}
              >
                Danger / Destructive
              </Button>
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
            <p className="text-slate-500 text-sm mt-1">
              Normalized data structures passed into framework-specific
              rendering engines.
            </p>
          </div>

          <div className="p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <Table data={tableData} columns={tableColumns} />
          </div>
        </section>

        {/* Input Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-500" />
              Inputs
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Standalone input field for data entry.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-8 overflow-hidden relative">
            <div className="w-full max-w-sm">
              <label className="text-sm font-medium mb-1 block">Email Address</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              Forms
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Form container managing layout and validation states.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <Form layout="vertical" className="space-y-4 max-w-md">
              <div>
                <label className="text-sm font-medium mb-1 block">Username</label>
                <Input placeholder="Enter your username" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              <Button variant="primary" className="w-full mt-4">Sign In</Button>
            </Form>
          </div>
        </section>

        {/* Card Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-500" />
              Cards
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Content container with standard padding and borders.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="w-full max-w-sm">
              <Card title="Project Summary" className="p-6">
                <h3 className="font-semibold text-lg mb-2">Nexus Framework</h3>
                <p className="text-sm text-slate-500 mb-4">
                  A high-performance build-time orchestrated dashboard engine.
                </p>
                <Button variant="secondary" size="small">View Details</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Sidebar Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-indigo-500" />
              Sidebar Navigation
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Universal layout routing shell isolated inside a 500px container
              frame.
            </p>
          </div>

          {/* Framed Container to show Sidebar without breaking the whole page */}
          <div className="h-[500px] border-4 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-50 dark:bg-slate-950 flex ring-4 ring-white dark:ring-slate-900">
            <Sidebar
              items={sidebarItems}
              activeItem={activeSidebarItem}
              onSelect={(item) => setActiveSidebarItem(item.id)}
              theme={activeTheme}
              title="Nexus Shell"
              logo={
                <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  N
                </div>
              }
            />
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="text-center text-slate-400 dark:text-slate-600 font-medium">
                <p>Sidebar renders cleanly in {activeLibrary}</p>
                <p className="text-sm mt-2 opacity-50">
                  Active route: /{activeSidebarItem}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dialog Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="text-2xl font-bold flex items-center gap-2">
              Dialog Component
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            {/* Dialog 1 */}
            <ProfileDialog />

            {/* Dialog 2 */}
            <StickyFooterDialog />

            {/* Dialog 3 */}
            <DialogCloseButton />

            {/* Dialog 4 */}
            <DialogNoCloseButton />
          </div>
        </section>

        {/* Drop Down Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="text-2xl font-bold flex items-center gap-2">
              Drop Down Component
            </div>
          </div>
          <DropDown />
        </section>

        {/* Tabs Component Section */}
        <section>
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Tabs Component
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Supports line tabs, vertical tabs, and disabled state configurations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Line Tabs</h3>
              <TabsLine />
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Disabled Tabs</h3>
              <TabsDisabled />
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Vertical Tabs</h3>
              <TabsVertical />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
