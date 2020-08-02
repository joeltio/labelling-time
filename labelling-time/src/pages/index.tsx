import React, { useEffect } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import { Card, CardProcess, CardStep } from '../components/Card';
import FileUpload from '../components/FileUpload';

import { useCSVFile } from '../utils/parseCSV';
import useIndexPageReducer from '../reducers/indexPage';
import HeaderSelect from '../components/HeaderSelect';

import styles from './index.module.css';

type DataProps = {
    site: {
        siteMetadata: {
            githubURL: string,
        },
    },
}

const Home: React.FC<PageProps<DataProps>> = ({ data }) => {
    // Create hooks for handling each step's data
    const [state, dispatch] = useIndexPageReducer();
    const fileData = useCSVFile(state.file, 'utf-8');

    // This hook inserts the useCSVFile hook into the reducer
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

    // Step 1: Upload file
    const onUpload = (files: FileList) => {
        dispatch({
            type: 'upload_file',
            file: files.item(0),
        });
    };

    // Step 2: Select columns to use for each axis
    const axisNextCondition = !!(state.columnIndices
        && state.columnIndices[0] && state.columnIndices[1]);
    const onAxisValChange = (indices: [number, number]) => {
        dispatch({
            type: 'set_column_indices',
            columnIndices: indices,
        });
    };

    const onNext = (val: any, errorMessage: string) => (
        () => {
            if (val === null || val === false) {
                dispatch({
                    type: 'error',
                    errorMessage,
                });
            } else {
                dispatch({
                    type: 'next_step',
                });
            }
        }
    );

    // Create functions to open other pages
    const { site: { siteMetadata: { githubURL } } } = data;
    const openDocs = () => {
        navigate('/documentation');
    };

    const openGitHub = () => {
        window.open(githubURL, '_blank');
    };

    return (
        <Layout title="Home">
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

                {/* Process Data */}
                <CardProcess
                    step={state.step}
                    className={styles.cardStep}
                    error={state.error}
                >
                    <CardStep
                        stepNum="1"
                        className={styles.stepBody}
                        onNext={onNext(state.file, 'Please select a file')}
                    >
                        <p>Upload your CSV file</p>
                        <FileUpload id="data_file" onUpload={onUpload} />
                    </CardStep>
                    <CardStep
                        stepNum="2"
                        className={styles.stepBody}
                        onNext={onNext(axisNextCondition, 'Please select the axes')}
                    >
                        <p>Pick the columns in your CSV file to use as the X and Y axes.</p>
                        <HeaderSelect
                            headers={fileData?.status === 'success' ? fileData.data[0] : []}
                            onChange={onAxisValChange}
                        />
                    </CardStep>
                    <CardStep
                        stepNum="3"
                        className={styles.stepBody}
                        onNext={onNext(state.dateFormat, 'Please provide a date format')}
                    >
                        <p>Please specify how the date should be parsed.</p>
                        <input type="text" />
                    </CardStep>
                </CardProcess>
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
