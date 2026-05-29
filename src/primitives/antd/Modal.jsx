import React, { useState } from 'react';
import { Modal as AntModal } from 'antd';
import { Button } from "./Button";

export const ProfileDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open Dialog</Button>
      <AntModal
        open={open}
        title="Edit Profile"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>,
          <Button key="submit" type="submit" form="profile-form">Save Changes</Button>
        ]}
        width={400}
        centered
        closable
      >
        <form id="profile-form" onSubmit={(e) => { e.preventDefault(); alert("Profile saved!"); setOpen(false); }}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50">Name</label>
              <input
                id="name"
                name="name"
                defaultValue="Pedro Duarte"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50">Username</label>
              <input
                id="username"
                name="username"
                defaultValue="@peduarte"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
              />
            </div>
          </div>
        </form>
      </AntModal>
    </>
  );
};

export const StickyFooterDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Sticky Footer</Button>
      <AntModal
        open={open}
        title="Sticky Footer"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        ]}
        centered
        closable
      >
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 py-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
      </AntModal>
    </>
  );
};

export const DialogCloseButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Share</Button>
      <AntModal
        open={open}
        title="Share link"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        ]}
        centered
        closable
      >
        <div className="py-4 space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Anyone who has this link will be able to view this.
          </p>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="link" className="sr-only">Link</label>
              <input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </AntModal>
    </>
  );
};

export const DialogNoCloseButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>No Close Button</Button>
      <AntModal
        open={open}
        title="No Close Button"
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        closable={false}
      >
        <div className="py-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This dialog doesn't have a close button in the top-right corner.
          </p>
        </div>
      </AntModal>
    </>
  );
};
