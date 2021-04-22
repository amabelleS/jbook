import * as esbuild from 'esbuild-wasm';

// testing indexDB:
// (async () => {
//     await fileCache.setItem('color', 'red');

//     const color = await fileCache.getItem('color')
//     console.log(color);
    
// })()
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        // Handel root entry file of 'index.js'
      build.onResolve({filter: /(^index\.js$)/}, () => {
            return {path: 'index.js', namespace: 'a'};
        })

        // Handel relative paths in a module
      build.onResolve({filter: /^\.+\//}, (args:any) => {
         return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
            }
      })

      // Handel main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        
        return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`
        }
        
        
      });
 
      
    },
  };
};
