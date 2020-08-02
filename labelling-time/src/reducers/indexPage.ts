import { useReducer } from 'react';
import type { CSVEntry } from '../utils/parseCSV';

type _Action = {
    type: string,
}

interface ResetAction extends _Action {
    type: 'reset',
}

interface ErrorAction extends _Action {
    type: 'error',
    errorMessage: string,
}

interface UploadFileAction extends _Action {
    type: 'upload_file',
    file: File,
}

interface LoadFileDataAction extends _Action {
    type: 'load_file_data',
    fileData: CSVEntry[],
}

interface SetColumnIndicesAction extends _Action {
    type: 'set_column_indices',
    columnIndices: [number, number],
}

interface SetDateFormatAction extends _Action {
    type: 'set_date_format',
    dateFormat: string,
}

type Action = ResetAction | ErrorAction | UploadFileAction | LoadFileDataAction
    | SetColumnIndicesAction | SetDateFormatAction;

type State = {
    file: File | null,
    fileData: CSVEntry[] | null,
    columnIndices: [number, number] | null,
    dateFormat: string | null,
    step: number,
    error: string | null,
}

const intialState = {
    file: null,
    fileData: null,
    columnIndices: null,
    dateFormat: null,
    step: 0,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
    case 'reset':
        return intialState;
    case 'error':
        return {
            ...state,
            error: action.errorMessage,
        };
    case 'upload_file':
        return {
            file: action.file,
            fileData: null,
            columnIndices: null,
            dateFormat: null,
            error: null,
            step: 1,
        };
    case 'load_file_data':
        return {
            ...state,
            fileData: action.fileData,
            columnIndices: null,
            dateFormat: null,
            error: null,
            step: 1,
        };
    case 'set_column_indices':
        return {
            ...state,
            columnIndices: action.columnIndices,
            dateFormat: null,
            error: null,
            step: 2,
        };
    case 'set_date_format':
        return {
            ...state,
            dateFormat: action.dateFormat,
            error: null,
            step: 3,
        };
    default:
        throw new TypeError('Invalid action type.');
    }
}

function useIndexPageReducer() {
    return useReducer(reducer, intialState);
}

export default useIndexPageReducer;

export type {
    Action,
    ResetAction,
    ErrorAction,
    UploadFileAction,
    LoadFileDataAction,
    SetColumnIndicesAction,
    SetDateFormatAction,
};
