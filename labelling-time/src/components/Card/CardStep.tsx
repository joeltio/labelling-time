import React from 'react';

import Button from '../Button';

import styles from './cardStep.module.css';

type PropTypes = {
    children: React.ReactNode,
    stepNum: string,
    onNext?: () => void,
    onPrev?: () => void,
    className?: string,
}

const CardStep: React.FC<PropTypes> = ({
    children,
    stepNum,
    onNext,
    onPrev,
    className,
}) => {
    let prevButton: React.ReactNode;
    if (onPrev !== undefined) {
        prevButton = (
            <Button
                type="secondary"
                className={styles.prevButton}
                onClick={onPrev}
            >
                Back
            </Button>
        );
    }

    let nextButton: React.ReactNode;
    if (onNext !== undefined) {
        nextButton = (
            <Button
                type="primary"
                className={styles.nextButton}
                onClick={onNext}
            >
                Next
            </Button>
        );
    }

    return (
        <div>
            <div>
                <h2>{`Step: ${stepNum}`}</h2>
                <div className={className}>
                    {children}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {prevButton}
                {nextButton}
            </div>
        </div>
    );
};

export default CardStep;
