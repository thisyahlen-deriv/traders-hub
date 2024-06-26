module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-unicode-property-regex', { useUnicodeFlag: false }],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};
