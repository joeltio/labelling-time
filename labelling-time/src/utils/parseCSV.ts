import parse from 'csv-parse/lib/sync';
import { useState, useEffect } from 'react';

type CSVEntry = {
    [key: string]: string
}

type Encoding = 'utf-8' | 'utf-16'

type FileResult<DataType> = {
    status: 'success',
    data: DataType,
} | {
    status: 'failed',
    error: DOMException,
} | {
    status: 'loading',
}

function parseCSV(
    text: string,
): CSVEntry[] {
    return parse(text);
}

function useFile(
    file: File | null,
    encoding: Encoding,
): FileResult<string> | null {
    const [result, setResult] = useState<FileResult<string> | null>(null);

    useEffect(() => {
        if (file === null) {
            return () => {};
        }

        // Start to load file
        setResult({
            status: 'loading',
        });

        const fileReader = new FileReader();
        // On successful load
        const loadListener = (event: Event) => {
            const reader = event.target as FileReader;
            setResult({
                status: 'success',
                data: reader.result as string,
            });
        };
        fileReader.addEventListener('load', loadListener);

        // On error
        const errorListener = (event: Event) => {
            const reader = event.target as FileReader;
            setResult({
                status: 'failed',
                error: reader.error,
            });
        };
        fileReader.addEventListener('error', errorListener);

        // Read the file
        fileReader.readAsText(file, encoding);

        return () => {
            fileReader.removeEventListener('load', loadListener);
            fileReader.removeEventListener('error', errorListener);
        };
    }, [file]);

    return result;
}

function useCSVFile(
    file: File | null,
    encoding: Encoding,
): FileResult<CSVEntry[]> | null {
    const result = useFile(file, encoding);

    if (result === null) {
        return null;
    }

    if (result.status === 'success') {
        // Convert the data to CSV entries
        return {
            status: result.status,
            data: parseCSV(result.data),
        };
    }

    return result;
}

export {
    useCSVFile,
};
