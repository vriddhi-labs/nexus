import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

// Create context to manage dialog open/close state
const DialogContext = React.createContext(null);

export const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      "Dialog subcomponents must be rendered within a Dialog provider",
    );
  }
  return context;
};

// Root Dialog component (Declarative state provider)
const Dialog = ({ children, open: externalOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = React.useCallback(
    (val) => {
      if (onOpenChange) {
        onOpenChange(val);
      } else {
        setInternalOpen(val);
      }
    },
    [onOpenChange],
  );

  const contextValue = React.useMemo(
    () => ({ open, setOpen }),
    [open, setOpen],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

// Portal to render overlays directly to document.body
const DialogPortal = ({ children }) => {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
};
DialogPortal.displayName = "DialogPortal";

// Trigger component
const DialogTrigger = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const { setOpen } = useDialog();

    const handleClick = React.useCallback(
      (e) => {
        e.preventDefault();
        setOpen(true);
      },
      [setOpen],
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: (e) => {
          handleClick(e);
          if (children.props.onClick) {
            children.props.onClick(e);
          }
        },
      });
    }

    return (
      <button type="button" ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

// Backdrop overlay
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => {
  const { open, setOpen } = useDialog();
  if (!open) return null;

  return (
    <div
      ref={ref}
      onClick={() => setOpen(false)}
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-200",
        className,
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

// Main Dialog Modal container
const dialogSizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] h-[90vh]",
};

const DialogContent = React.forwardRef(
  (
    { className, children, size = "md", showCloseButton = true, ...props },
    ref,
  ) => {
    const { open, setOpen } = useDialog();

    // Lock body scroll when open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    if (!open) return null;

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
            "grid gap-4 p-6 shadow-2xl rounded-3xl duration-200 border border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50",
            dialogSizes[size] || dialogSizes.md,
            className,
          )}
          {...props}
        >
          {children}

          {showCloseButton && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-slate-50",
              )}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = "DialogContent";

// Header subcomponent
const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

// Footer subcomponent
const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4",
      className,
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

// Title subcomponent
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-slate-950 dark:text-slate-50",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// Description subcomponent
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

// Close subcomponent
const DialogClose = React.forwardRef(({ children, asChild, ...props }, ref) => {
  const { setOpen } = useDialog();

  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setOpen(false);
    },
    [setOpen],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: (e) => {
        handleClick(e);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    });
  }

  return (
    <button type="button" ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  );
});
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

export const ProfileDialog = () => {
  return (
    <Dialog>
      <form onSubmit={(e) => { e.preventDefault(); alert("Profile saved!"); }}>
        <DialogTrigger asChild>
          <Button variant="secondary">Open Dialog</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
              <input
                id="name"
                name="name"
                defaultValue="Pedro Duarte"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username</label>
              <input
                id="username"
                name="username"
                defaultValue="@peduarte"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export const StickyFooterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Sticky Footer</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content scrolls.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DialogCloseButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DialogNoCloseButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">No Close Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};