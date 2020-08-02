import React, { useState, useEffect } from 'react';

import styles from './headerSelect.module.css';

type PropTypes = {
    headers: string[],
    onChange: (indices: [number, number]) => void
}

type HeaderState = {
    xIndex: number,
    yIndex: number,
}

const HeaderSelect: React.FC<PropTypes> = ({
    headers,
    onChange,
}) => {
    const [xIndex, setXIndex] = useState<number>();
    const [yIndex, setYIndex] = useState<number>();

    useEffect(() => {
        onChange([xIndex, yIndex]);
    }, [xIndex, yIndex]);

    const xChoices = headers.map((header, index) => {
        const onXChange = (event) => {
            setXIndex(parseInt(event.target.value, 10));
        };

        return (
            <label
                htmlFor={`x_${header}`}
                key={`x_${header}`}
            >
                {header}
                <input
                    type="radio"
                    id={`x_${header}`}
                    name="x_axis"
                    value={index}
                    onChange={onXChange}
                />
            </label>
        );
    });

    const yChoices = headers.map((header, index) => {
        const onYChange = (event) => {
            setYIndex(parseInt(event.target.value, 10));
        };

        return (
            <label
                htmlFor={`y_${header}`}
                key={`y_${header}`}
            >
                {header}
                <input
                    type="radio"
                    id={`y_${header}`}
                    name="y_axis"
                    value={index}
                    onChange={onYChange}
                />
            </label>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.axisPicker}>
                <h3>X-Axis (Time Axis)</h3>
                {xChoices}
            </div>
            <div className={styles.axisPicker}>
                <h3>Y-Axis</h3>
                {yChoices}
            </div>
        </div>
    );
};

export default HeaderSelect;
