import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dev from 'rollup-plugin-dev'

export default {
  input: './demo/index.ts',
  output: [
    {
      format: 'es',
      dir: './demo/dist',
      externalLiveBindings: false
    }
  ],
  external: [],
  plugins: [
    typescript({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          lib: ['es5', 'es6'],
          sourceMap: true,
          target: 'es6',
          strict: false
        }
      }
    }),
    resolve(),
    commonjs(),
    dev({
      dirs: ['demo'],
      port: 8000
    })
  ]
}
