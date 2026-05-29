import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const DropdownMenuContext = React.createContext(null);

const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("Dropdown subcomponents must be rendered within a DropdownMenu provider");
  }
  return context;
};

// DropdownMenu provider and container
export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const value = React.useMemo(() => ({ open, setOpen }), [open]);

  return (
    <DropdownMenuContext.Provider value={value}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

// Trigger
export const DropdownMenuTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
  const { open, setOpen } = useDropdownMenu();

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: (e) => {
        handleClick(e);
        if (children.props.onClick) children.props.onClick(e);
      }
    });
  }

  return (
    <button type="button" ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// Content Box
export const DropdownMenuContent = React.forwardRef(({ className, children, align = "start", ...props }, ref) => {
  const { open } = useDropdownMenu();
  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[10rem] rounded-xl border border-slate-200 bg-white/95 p-1.5 text-slate-950 shadow-xl backdrop-blur-xl animate-fade-in dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50 mt-2",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

// Group wrapper
export const DropdownMenuGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-0.5", className)} {...props} />
));
DropdownMenuGroup.displayName = "DropdownMenuGroup";

// Item
export const DropdownMenuItem = React.forwardRef(({ className, children, disabled, onClick, ...props }, ref) => {
  const { setOpen } = useDropdownMenu();

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-lg px-2.5 py-2 text-sm outline-none transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

// Label
export const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

// Shortcut helper
export const DropdownMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-slate-400 dark:text-slate-500 pl-4 font-mono", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// Separator line
export const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1.5 my-1 h-px bg-slate-150 dark:bg-slate-800", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// Submenu context
const DropdownMenuSubContext = React.createContext(null);

export const DropdownMenuSub = ({ children }) => {
  const [subOpen, setSubOpen] = React.useState(false);
  const leaveTimeoutRef = React.useRef(null);

  const handleMouseEnter = React.useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setSubOpen(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setSubOpen(false);
    }, 200);
  }, []);

  React.useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const value = React.useMemo(
    () => ({ subOpen, setSubOpen, handleMouseEnter, handleMouseLeave }),
    [subOpen, handleMouseEnter, handleMouseLeave]
  );

  return (
    <DropdownMenuSubContext.Provider value={value}>
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {children}
      </div>
    </DropdownMenuSubContext.Provider>
  );
};
DropdownMenuSub.displayName = "DropdownMenuSub";

// Submenu Trigger
export const DropdownMenuSubTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { setSubOpen, handleMouseEnter } = React.useContext(DropdownMenuSubContext);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={() => setSubOpen(true)}
      className={cn(
        "flex cursor-default select-none items-center rounded-lg px-2.5 py-2 text-sm outline-none transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        className
      )}
      {...props}
    >
      {children}
      <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-mono">▶</span>
    </div>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// Submenu Content
export const DropdownMenuSubContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { subOpen } = React.useContext(DropdownMenuSubContext);
  if (!subOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-1.5 text-slate-950 shadow-xl backdrop-blur-xl animate-fade-in dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50 ml-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// Portal
export const DropdownMenuPortal = ({ children }) => {
  return <>{children}</>;
};
DropdownMenuPortal.displayName = "DropdownMenuPortal";

// Unified DropDown component rendering the complete pre-built layout
export const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => alert("Profile clicked!")}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Billing clicked!")}>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Settings clicked!")}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => alert("Team clicked!")}>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => alert("Invite via Email")}>Email</DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Invite via Message")}>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert("Invite via More")}>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={() => alert("New Team clicked!")}>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => alert("GitHub clicked!")}>GitHub</DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Support clicked!")}>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => alert("Log out clicked!")}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
