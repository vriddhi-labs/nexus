import React from 'react';
import { Layout, Menu } from 'antd';

const Sider = Layout.Sider;

export const Sidebar = ({
  items = [],
  collapsed = false,
  activeItem = '',
  onSelect,
  theme = 'dark',
  logo,
  title,
  footer,
  className = '',
  ...restProps
}) => {
  const menuItems = items.map((item) => {
    const IconComponent = item.icon;

    let renderedIcon = null;
    if (IconComponent) {
      if (typeof IconComponent === 'function' || (typeof IconComponent === 'object' && IconComponent.$$typeof)) {
        renderedIcon = <IconComponent className="w-4 h-4 transition-all" />;
      } else {
        renderedIcon = IconComponent;
      }
    }

    return {
      key: item.id,
      label: item.label,
      icon: renderedIcon,
      title: item.label,
      children: item.children ? item.children.map(child => ({
        key: child.id,
        label: child.label,
        ...child
      })) : undefined,
    };
  });

  const handleMenuClick = ({ key }) => {
    if (onSelect) {
      const findItem = (list) => {
        for (const item of list) {
          if (item.id === key) return item;
          if (item.children) {
            const found = findItem(item.children);
            if (found) return found;
          }
        }
        return null;
      };
      const original = findItem(items);
      if (original) onSelect(original);
    }
  };

  const headerBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      theme={theme}
      className={`h-screen flex flex-col border-r transition-all duration-300 ${
        theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
      } ${className}`}
      {...restProps}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {(logo || title) && (
            <div
              className="flex items-center px-4 py-4 h-16 justify-start overflow-hidden transition-all duration-300"
              style={{ borderBottom: `1px solid ${headerBorderColor}` }}
            >
              <div className="flex items-center gap-3 w-full overflow-hidden">
                {logo && (
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500">
                    {logo}
                  </div>
                )}
                {!collapsed && title && (
                  <span className={`font-bold text-lg tracking-tight truncate ${
                    theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    {title}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">
            <Menu
              theme={theme}
              mode="inline"
              selectedKeys={activeItem ? [activeItem] : []}
              onClick={handleMenuClick}
              items={menuItems}
              className="border-none px-2"
            />
          </div>
        </div>

        {footer && (
          <div
            className="p-4 overflow-hidden transition-all duration-300"
            style={{ borderTop: `1px solid ${headerBorderColor}` }}
          >
            {typeof footer === 'function' ? footer({ collapsed }) : footer}
          </div>
        )}
      </div>
    </Sider>
  );
};
