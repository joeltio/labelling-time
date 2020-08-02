import React, { ReactNode } from 'react';

import styles from './card.module.css';

type PropTypes = {
    children: ReactNode,
    className?: string,
    onClick?: (event: Event) => void,
}

const Card: React.FC<PropTypes> = ({ children, className, onClick }) => (
    <div
        className={`${styles.container} ${onClick ? styles.clickable : ''} ${className || ''}`}
        onClick={onClick}
        role="button"
    >
        {children}
    </div>
);

export default Card;
