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

interface NextStepAction extends _Action {
    type: 'next_step',
}

interface UploadFileAction extends _Action {
    type: 'upload_file',
    filename: string,
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

type Action = ResetAction | ErrorAction | NextStepAction | UploadFileAction
    | LoadFileDataAction | SetColumnIndicesAction | SetDateFormatAction

type State = {
    filename: string,
    file: File | null,
    fileData: CSVEntry[] | null,
    columnIndices: [number | null, number | null],
    dateFormat: string | null,
    step: number,
    error: string | null,
}

const initialState: State = {
    filename: null,
    file: null,
    fileData: null,
    columnIndices: [null, null],
    dateFormat: null,
    step: 0,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
    case 'reset':
        return initialState;
    case 'error':
        return {
            ...state,
            error: action.errorMessage,
        };
    case 'next_step':
        return {
            ...state,
            step: state.step + 1,
        };
    case 'upload_file':
        return {
            ...initialState,
            filename: action.filename,
            file: action.file,
        };
    case 'load_file_data':
        return {
            ...initialState,
            filename: state.filename,
            file: state.file,
            fileData: action.fileData,
        };
    case 'set_column_indices':
        return {
            ...state,
            columnIndices: action.columnIndices,
            dateFormat: initialState.dateFormat,
            error: initialState.error,
        };
    case 'set_date_format':
        return {
            ...state,
            dateFormat: action.dateFormat,
            error: initialState.error,
        };
    default:
        throw new TypeError('Invalid action type.');
    }
}

function useIndexPageReducer() {
    return useReducer(reducer, initialState);
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
