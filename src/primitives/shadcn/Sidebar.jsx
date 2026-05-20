import React from 'react';

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
  const handleItemClick = (e, item) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(item);
    }
  };

  const bgClass = theme === 'dark'
    ? 'bg-slate-900/95 backdrop-blur-md text-slate-100 border-slate-800'
    : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200';

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';

  return (
    <aside
      className={`h-screen flex flex-col border-r transition-all duration-300 ease-in-out z-30 select-none ${bgClass} ${sidebarWidth} ${className}`}
      {...restProps}
    >
      {(logo || title) && (
        <div className="flex items-center px-4 py-4 h-16 border-b border-inherit justify-start">
          <div className="flex items-center gap-3 w-full overflow-hidden">
            {logo && (
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 transition-transform duration-300 hover:scale-105">
                {logo}
              </div>
            )}
            {!collapsed && title && (
              <span className="font-bold text-lg tracking-tight truncate animate-fade-in text-inherit leading-none">
                {title}
              </span>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {items.map((item) => {
          const isActive = activeItem === item.id;
          const IconComponent = item.icon;

          let itemStyleClasses = '';
          if (isActive) {
            itemStyleClasses = theme === 'dark'
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
              : 'bg-indigo-50 text-indigo-600 font-semibold border-indigo-100';
          } else {
            itemStyleClasses = theme === 'dark'
              ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';
          }

          return (
            <a
              key={item.id}
              href={item.href || '#'}
              onClick={(e) => handleItemClick(e, item)}
              className={`flex items-center rounded-xl p-2.5 transition-all duration-200 group relative ${itemStyleClasses} ${
                collapsed ? 'justify-center' : 'justify-start gap-3'
              }`}
            >
              {IconComponent && (
                <div className="flex-shrink-0 flex items-center justify-center">
                  {typeof IconComponent === 'function' || (typeof IconComponent === 'object' && IconComponent.$$typeof) ? (
                    <IconComponent className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`} />
                  ) : (
                    IconComponent
                  )}
                </div>
              )}

              {!collapsed && (
                <span className="text-sm font-medium transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              )}

              {isActive && !collapsed && (
                <span className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              )}

              {collapsed && (
                <div className="absolute left-full ml-4 px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-100 text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-50 shadow-xl border border-slate-800">
                  {item.label}
                </div>
              )}
            </a>
          );
        })}
      </nav>

      {footer && (
        <div className="p-4 border-t border-inherit">
          {typeof footer === 'function' ? footer({ collapsed }) : footer}
        </div>
      )}
    </aside>
  );
};
