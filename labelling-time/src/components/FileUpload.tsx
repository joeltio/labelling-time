import React from 'react';

import styles from './fileUpload.module.css';

type PropType = {
    id: string,
    onUpload: (files: FileList) => void,
};

const FileUpload: React.FC<PropType> = ({ id, onUpload }) => (
    <label
        className={styles.label}
        htmlFor={id}
    >
        Upload File
        <input
            type="file"
            id={id}
            className={styles.input}
            onChange={(event) => {
                onUpload(event.target.files);
            }}
        />
    </label>
);

export default FileUpload;
