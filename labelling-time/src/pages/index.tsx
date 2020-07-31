import React from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import FileUpload from '../components/FileUpload';

import styles from './index.module.css';

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
                    file: files.item(0),
                },
            },
        );
    };

    return (
        <Layout>
            <SEO title="Home" />
            <div className={styles.container}>
                <FileUpload id="upload" onUpload={onUpload} />
                <div className={styles.content}>
                    <p>
                        <i>Labelling Time</i>
                        {' '}
                        is a tool for labelling time series data. It provides an
                        interactive way to label multiple classes of data and allows
                        you to select specific columns of data from your CSV file.
                    </p>
                    <p>
                        All processing is done on your browser, so no data is sent or
                        stored anywhere outside your browser. To get a closer look at
                        the code, check out the GitHub page of this website:
                        {' '}
                        <a href="https://github.com/joeltio/labelling-time">
                            https://github.com/joeltio/labelling-time
                        </a>
                    </p>
                </div>
            </div>
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
