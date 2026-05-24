import React from "react";
import { Tabs } from "antd";

const items = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

export function TabsLine() {
  return <Tabs 
    defaultActiveKey="overview" 
    items={items} 
    type="line" />;
}

export function TabsVertical() {
  return (
    <Tabs
      defaultActiveKey="account"
      items={items}
      tabPosition="left"
      style={{ minHeight: 120 }}
    />
  );
}

export function TabsDisabled() {
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
      disabled: true,
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return <Tabs defaultActiveKey="home" items={items} />;
}
