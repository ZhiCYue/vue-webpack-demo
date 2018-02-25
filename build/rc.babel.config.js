let plugins = ['transform-runtime'];

if (process.env.NODE_ENV === 'local') {
    plugins = ['transform-runtime', ['transform-es2015-modules-commonjs-simple', {
        noMangle: true
    }]];
}

module.exports = {
    presets: [
        ['env', {
            modules: false
        }],
        'stage-2'
    ],
    plugins,
    comments: false,
    env: {
        test: {
            presets: ['env', 'stage-2'],
            plugins: ['istanbul']
        }
    }
};
