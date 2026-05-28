/**
 * createAdapter validates that an adapter contains the required components.
 * By default, validates 'Button', 'Table', and 'Sidebar', but the list is customizable.
 * 
 * Returns a frozen adapter object containing all passed components.
 */
export function createAdapter(components = {}, options = {}) {
  const { required = ['Button', 'Table', 'Sidebar'] } = options;
  const missing = [];

  if (Array.isArray(required)) {
    for (const componentName of required) {
      if (!components[componentName]) {
        missing.push(componentName);
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Invalid Nexus Adapter: Missing required component(s): ${missing.join(', ')}`
    );
  }

  return Object.freeze({
    ...components,
    __nexusAdapter: true,
  });
}
