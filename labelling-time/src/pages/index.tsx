import React from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import styles from './index.module.css';
import Card from '../components/Card';

type DataProps = {
    site: {
        siteMetadata: {
            githubURL: string,
        },
    },
}

const Home: React.FC<PageProps<DataProps>> = ({ data }) => {
    const { site: { siteMetadata: { githubURL } } } = data;
    const openDocs = () => {
        navigate('/documentation');
    };

    const openGitHub = () => {
        window.open(githubURL, '_blank');
    };

    return (
        <Layout>
            <SEO title="Home" />
            <div className={styles.container}>
                <h1>Labelling Time</h1>
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
                        the code, check out the GitHub page of this website.
                    </p>
                </div>
                <div className={styles.links}>
                    <Card
                        className={styles.cardLeft}
                        onClick={() => openDocs()}
                    >
                        Documentation
                    </Card>
                    <Card
                        className={styles.cardRight}
                        onClick={() => openGitHub()}
                    >
                        GitHub
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query {
        site {
            siteMetadata {
                githubURL
            }
        }
    }
`;

export default Home;
