import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      name: '@lifebac/intakeq',
      file: pkg.browser,
      format: 'umd',
      globals: {
        axios: 'axios',
      },
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
