const presets = [['@babel/env'], ['@babel/react']];

const plugins = [
  [
    '@babel/plugin-proposal-object-rest-spread',
    { useBuiltIns: true, loose: true },
  ],
];

module.exports = { presets, plugins };
