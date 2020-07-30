import React from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/SEO';
import FileUpload from '../components/FileUpload';

type DataProps = {
    site: {
        siteMetadata: {
            title: string,
            description: string,
        },
    },
};

const Home: React.FC<PageProps<DataProps>> = ({ data }) => {
    const onUpload = (files: FileList) => {
        navigate(
            'labeller',
            {
                state: {
                    files,
                },
            },
        );
    };

    return (
        <Layout>
            <SEO title="Home" />
            <FileUpload onUpload={onUpload} />
            <p>{data.site.siteMetadata.description}</p>
        </Layout>
    );
};

export const query = graphql`
    {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`;

export default Home;
