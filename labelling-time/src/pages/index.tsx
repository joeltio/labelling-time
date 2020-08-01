import React, { useState } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Card from '../components/Card';
import CardStep from '../components/CardStep';
import FileUpload from '../components/FileUpload';

import styles from './index.module.css';
import { useCSVFile } from '../utils/parseCSV';
import HeaderSelect from '../components/HeaderSelect';

type DataProps = {
    site: {
        siteMetadata: {
            githubURL: string,
        },
    },
}

const Home: React.FC<PageProps<DataProps>> = ({ data }) => {
    const [step, setStep] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const fileData = useCSVFile(file, 'utf-8');

    const onUpload = (files: FileList) => {
        setFile(files.item(0));
        setStep(1);
    };

    if (fileData !== null && fileData.status === 'success') {
        console.log(fileData.data[0]);
    }

    // Create functions to open other pages
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
                <CardStep step={step} className={styles.cardStep}>
                    <div>
                        <h2>Step 1</h2>
                        <div className={styles.stepBody}>
                            <p>Upload your CSV file</p>
                            <FileUpload id="data_file" onUpload={onUpload} />
                        </div>
                    </div>
                    <div>
                        <h2>Step 2</h2>
                        <div className={styles.stepBody}>
                            <p>Pick the axis</p>
                        </div>
                    </div>
                </CardStep>
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
