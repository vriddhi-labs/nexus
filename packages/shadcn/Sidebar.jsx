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

  // Standard Shadcn sidebar bg (typically card/background and border)
  const bgClass = "bg-background text-foreground border-border";
  const sidebarWidth = collapsed ? 'w-16' : 'w-64';

  return (
    <aside
      className={`h-full flex flex-col border-r transition-all duration-300 ease-in-out z-30 select-none ${bgClass} ${sidebarWidth} ${className}`}
      {...restProps}
    >
      {(logo || title) && (
        <div className="flex items-center px-4 py-4 h-16 border-b border-border justify-start">
          <div className="flex items-center gap-3 w-full overflow-hidden">
            {logo && (
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-muted text-foreground transition-transform duration-300 hover:scale-105">
                {logo}
              </div>
            )}
            {!collapsed && title && (
              <span className="font-bold text-lg tracking-tight truncate animate-fade-in text-foreground leading-none">
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

          // Default Shadcn sidebar item styles: bg-secondary for active, hover:bg-accent for hover
          const itemStyleClasses = isActive
            ? 'bg-secondary text-secondary-foreground font-semibold shadow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';

          return (
            <a
              key={item.id}
              href={item.href || '#'}
              onClick={(e) => handleItemClick(e, item)}
              className={`flex items-center rounded-md p-2.5 transition-all duration-200 group relative ${itemStyleClasses} ${
                collapsed ? 'justify-center' : 'justify-start gap-3'
              }`}
            >
              {IconComponent && (
                <div className="flex-shrink-0 flex items-center justify-center">
                  {typeof IconComponent === 'function' || (typeof IconComponent === 'object' && IconComponent.$$typeof) ? (
                    <IconComponent className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
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
            </a>
          );
        })}
      </nav>

      {footer && (
        <div className="p-4 border-t border-border">
          {typeof footer === 'function' ? footer({ collapsed }) : footer}
        </div>
      )}
    </aside>
  );
};
