import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.resolve(__dirname, '../nexus.config.js');
const REGISTRY_OUTPUT = path.resolve(__dirname, '../src/_generated_registry.js');
const THEME_OUTPUT = path.resolve(__dirname, '../src/primitives/theme.js');

async function runOrchestrator() {
  console.log('🚀 Nexus Orchestrator: Starting compilation pipeline...');

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Configuration file missing: nexus.config.js');
    process.exit(1);
  }

  const { default: config } = await import(pathToFileURL(CONFIG_PATH).href);

  generateThemeSwitch(config.uiLibrary || 'shadcn');
  await generatePluginRegistry(config.plugins || []);

  console.log('✅ Nexus Orchestrator: Compilation complete.');
}

function generateThemeSwitch(chosenLibrary) {
  const components = ['Sidebar', 'Button', 'Table'];

  let fileContent = '// AUTO-GENERATED THEME INTERFACE - DO NOT EDIT\n\n';

  components.forEach(comp => {
    fileContent += `export { ${comp} } from "./${chosenLibrary}/${comp}";\n`;
  });

  const dir = path.dirname(THEME_OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(THEME_OUTPUT, fileContent, 'utf8');
  console.log(`🎯 Theme interface compiled using [${chosenLibrary}] engine.`);
}

async function generatePluginRegistry(plugins) {
  let importStatements = '';
  let registryEntries = [];

  plugins.forEach((pluginPath, index) => {
    const manifestPath = path.resolve(path.dirname(CONFIG_PATH), pluginPath, 'manifest.json');

    if (!fs.existsSync(manifestPath)) {
      console.warn(`⚠️ Manifest not found for plugin at path: ${pluginPath}. Skipping.`);
      return;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const variableName = `Plugin_${index}`;
    const entryAbsolutePath = path.resolve(path.dirname(CONFIG_PATH), pluginPath, manifest.entry || 'index.js');
    let relativeEntryPath = path.relative(path.dirname(REGISTRY_OUTPUT), entryAbsolutePath).replace(/\\/g, '/');
    if (!relativeEntryPath.startsWith('.')) relativeEntryPath = './' + relativeEntryPath;

    importStatements += `import * as ${variableName} from '${relativeEntryPath}';\n`;

    manifest.slots.forEach(slot => {
      registryEntries.push({
        slotId: slot.id,
        pluginId: manifest.id,
        priority: slot.priority || 10,
        componentName: slot.component,
        variableName: variableName,
        dataRequirements: manifest.data || {}
      });
    });
  });

  registryEntries.sort((a, b) => a.priority - b.priority);

  const fileContent = `// AUTO-GENERATED FILE - DO NOT MODIFY DIRECTLY\n\n${importStatements}
export const pluginRegistry = [
${registryEntries.map(entry => `  {
    slotId: '${entry.slotId}',
    pluginId: '${entry.pluginId}',
    dataRequirements: ${JSON.stringify(entry.dataRequirements, null, 2)},
    Component: ${entry.variableName}.${entry.componentName}
  }`).join(',\n')}
];\n`;

  fs.writeFileSync(REGISTRY_OUTPUT, fileContent, 'utf8');
  console.log(`📦 Plugin registry compiled with ${registryEntries.length} slot(s).`);
}

runOrchestrator().catch(console.error);
