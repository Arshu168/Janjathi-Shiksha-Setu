const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// 3. Prevent duplicate react/react-dom by pinning them to apps/mobile's copies
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'react' ||
    moduleName.startsWith('react/') ||
    moduleName === 'react-dom' ||
    moduleName.startsWith('react-dom/')
  ) {
    try {
      const filePath = require.resolve(moduleName, { paths: [projectRoot] });
      return {
        filePath,
        type: 'sourceFile',
      };
    } catch {
      // fallback
    }
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
