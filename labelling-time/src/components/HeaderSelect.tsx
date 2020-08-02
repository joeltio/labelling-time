import React, { useState } from 'react';

import styles from './headerSelect.module.css';

type PropTypes = {
    headers: string[],
    onFinishPicking: (indices: [number, number]) => void
}

type HeaderState = {
    xIndex: number,
    yIndex: number,
}

const HeaderSelect: React.FC<PropTypes> = ({
    headers,
    onFinishPicking,
}) => {
    const [headerIndex, setHeaderIndex] = useState<HeaderState>({
        yIndex: null,
        xIndex: null,
    });

    const xChoices = headers.map((header, index) => {
        const onChange = (event) => {
            const newXIndex = event.target.value;
            setHeaderIndex((prevState) => ({
                xIndex: newXIndex,
                yIndex: prevState.yIndex,
            }));
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
                    onChange={onChange}
                />
            </label>
        );
    });

    const yChoices = headers.map((header, index) => {
        const onChange = (event) => {
            const newYIndex = event.target.value;
            setHeaderIndex((prevState) => ({
                xIndex: prevState.xIndex,
                yIndex: newYIndex,
            }));
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
                    onChange={onChange}
                />
            </label>
        );
    });

    const onButtonClick = () => {
        onFinishPicking([headerIndex.xIndex, headerIndex.yIndex]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.axisPickerContainer}>
                <div className={styles.axisPicker}>
                    <h3>X-Axis (Time Axis)</h3>
                    {xChoices}
                </div>
                <div className={styles.axisPicker}>
                    <h3>Y-Axis</h3>
                    {yChoices}
                </div>
            </div>
            <button type="button" onClick={onButtonClick}>
                Done
            </button>
        </div>
    );
};

export default HeaderSelect;
