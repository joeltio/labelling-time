import React from 'react';

import styles from './button.module.css';

type ButtonTypes = 'primary' | 'secondary'

type PropTypes = {
    type: ButtonTypes,
    children: string | React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
}

const Button: React.FC<PropTypes> = ({
    type,
    children,
    onClick,
    className,
}) => {
    const styleMap = {
        primary: styles.primary,
        secondary: styles.secondary,
    };

    return (
        <button
            className={`${styles.button} ${styleMap[type] || ''} ${className || ''}`}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
};

export default Button;

export type {
    ButtonTypes,
};
