import React from 'react';
import { Helmet, MetaProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type SiteMetadata = {
    title: string,
    description: string,
    author: string,
}

type SiteData = {
    site: {
        siteMetadata: SiteMetadata,
    },
}

type PropTypes = {
    description?: string,
    lang?: string,
    meta?: MetaProps[],
    title: string,
}

const SEO: React.FC<PropTypes> = ({
    description = '',
    lang = 'en',
    meta = [],
    title,
}) => {
    const { site: { siteMetadata } }: SiteData = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
        }
    `);

    const metaDescription = description || siteMetadata.description;

    const defaultMeta: MetaProps[] = [
        {
            name: 'description',
            content: metaDescription,
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: metaDescription,
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            name: 'twitter:card',
            content: 'summary',
        },
        {
            name: 'twitter:creator',
            content: siteMetadata.author,
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: metaDescription,
        },
    ];

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            meta={defaultMeta.concat(meta)}
        />
    );
};

export default SEO;
