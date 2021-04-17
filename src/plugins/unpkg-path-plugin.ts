import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
    name: 'filecache'
});

// testing indexDB:
// (async () => {
//     await fileCache.setItem('color', 'red');

//     const color = await fileCache.getItem('color')
//     console.log(color);
    
// })()
 
export const unpkgPathPlugin = (inputCode: string) => {
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
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        } 

        // Chck to see if we had already fetched this file, and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

        // If it is, return it immediately
        if (cachedResult) {
            return cachedResult
        }

        const {data, request} = await axios.get(args.path)
                        
        const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result        
      });
    },
  };
};
