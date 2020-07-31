import React from 'react';
import { Link } from 'gatsby';

import styles from './header.module.css';

type PropTypes = {
    siteTitle: string,
}

const Header: React.FC<PropTypes> = ({ siteTitle = '' }) => (
    <header>
        <div className={styles.container}>
            <h1 className={styles.title}>
                <Link
                    className={styles.titleLink}
                    to="/"
                >
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);

export default Header;
