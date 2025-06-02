// // filepath: /home/qed42/Desktop/React_Native/expense-tracker/babel.config.js
// export default function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       [
//         'module:react-native-dotenv',
//         {
//           moduleName: '@env',
//           path: '.env',
//           blacklist: null,
//           whitelist: null,
//           safe: false,
//           allowUndefined: true,
//         },
//       ],
//     ],
//   };
// };
export default function (api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],      plugins: [
        [
          'module-resolver',
          {
            root: ['./frontend'],
            alias: {
              '@': './frontend',
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          },
        ],
      ],
    };
  };
  