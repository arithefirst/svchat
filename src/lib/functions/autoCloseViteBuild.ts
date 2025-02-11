import type { PluginOption } from 'vite';

export default function closePlugin() {
  const plugin: PluginOption = {
    name: 'BuildWatcher',
    buildEnd: function (error?: Error) {
      if (error) {
        console.error('\x1b[35m[BuildWatcher]\x1b[0m Error building.');
        console.error(error);
        process.exit(1);
      } else {
        console.log('\x1b[35m[BuildWatcher]\x1b[0m Build Stage Ended.');
      }
    },

    closeBundle: function () {
      console.log('\x1b[35m[BuildWatcher]\x1b[0m Bundle closed');
      process.exit(0);
    },
  };

  return plugin;
}
