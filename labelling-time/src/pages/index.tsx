import React, { useEffect } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Card from '../components/Card';
import CardStep from '../components/CardStep';
import FileUpload from '../components/FileUpload';

import styles from './index.module.css';
import { useCSVFile } from '../utils/parseCSV';
import useIndexPageReducer from '../reducers/indexPage';
import HeaderSelect from '../components/HeaderSelect';

type DataProps = {
    site: {
        siteMetadata: {
            githubURL: string,
        },
    },
}

const Home: React.FC<PageProps<DataProps>> = ({ data }) => {
    // const [file, setFile] = useState<File | null>(null);
    const [state, dispatch] = useIndexPageReducer();
    const fileData = useCSVFile(state.file, 'utf-8');

    useEffect(() => {
        if (fileData === null) {
            return () => {};
        }

        switch (fileData.status) {
        case 'success':
            dispatch({ type: 'load_file_data', fileData: fileData.data });
            break;
        case 'failed':
            dispatch({ type: 'error', errorMessage: fileData.error.message });
            break;
        default:
            // Do nothing
            break;
        }

        return () => {};
    }, [fileData]);

    const onUpload = (files: FileList) => {
        dispatch({
            type: 'upload_file',
            file: files.item(0),
        });
    };

    const onFinishPicking = (indices) => {
        dispatch({
            type: 'set_column_indices',
            columnIndices: indices,
        });
    };

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
                <CardStep step={state.step} className={styles.cardStep}>
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
                            <HeaderSelect
                                headers={fileData?.status === 'success' ? fileData.data[0] : []}
                                onFinishPicking={onFinishPicking}
                            />
                        </div>
                    </div>
                    <div>
                        <h2>Step 3</h2>
                        <div className={styles.stepBody}>
                            <p>How should the date be parsed?</p>
                            <input type="text" />
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
