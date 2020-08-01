module.exports = {
    siteMetadata: {
        title: 'Labelling Time',
        description: 'Labelling Time is a tool to for labelling time series data.',
        author: '@joeltio',
        githubURL: 'https://github.com/joeltio/labelling-time',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Labelling Time',
                short_name: 'Label Time',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#232442',
                display: 'minimal-ui',
                icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
            },
        },
        'gatsby-plugin-typescript',
    ],
};
