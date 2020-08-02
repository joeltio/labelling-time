import React, { ReactNode } from 'react';

import Card from './Card';

import styles from './cardProcess.module.css';

type PropTypes = {
    children: ReactNode,
    step: number,
    className?: string,
    error?: string,
}

const CardProcess: React.FC<PropTypes> = ({
    children,
    step,
    className,
    error,
}) => {
    const childrenArr = React.Children.toArray(children);
    const current = childrenArr[step];

    let errorBox: React.ReactNode;
    if (error) {
        errorBox = (
            <div className={styles.error}>
                {error}
            </div>
        );
    }

    return (
        <Card className={className}>
            {errorBox}
            {current}
        </Card>
    );
};

export default CardProcess;
