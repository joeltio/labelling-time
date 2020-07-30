import React from 'react';

type PropType = {
    onUpload: (files: FileList) => void,
};

const FileUpload: React.FC<PropType> = ({ onUpload }) => (
    <input
        type="file"
        onChange={(event) => {
            onUpload(event.target.files);
        }}
    />
);

export default FileUpload;
