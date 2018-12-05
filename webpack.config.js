const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // context: path.resolve(__dirname, 'public'),
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000'
            }
        },
        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || "0.0.0.0";
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
        open: true, // Open the page in browser

        // provide an overlay for capturing compilation related warnings and errors
        overlay: true,

    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules : [

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader'},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            // All files with a '.scss' extension will be handled by 'css-loader & sass-loader'.
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [

                        {
                            loader: 'css-loader',
                            options: {

                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ]
                })
            }
        ]
    },
    plugins: [

        // reloads webpack after file changes
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),

        // makes a style.css file with all the minified styles from all the sass files
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};