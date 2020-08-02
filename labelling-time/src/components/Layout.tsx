import React from 'react';
import PropTypes from 'prop-types';

import SEO from './SEO';
import './layout.css';

type PropTypes = {
    title: string,
    children: React.ReactNode,
}

const Layout: React.FC<PropTypes> = ({ title, children }) => (
    <div
        style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <div
            style={{
                height: '100%',
                width: '100%',
                flexGrow: 1,
            }}
        >
            <main>
                <SEO title={title} />
                {children}
            </main>
        </div>
    </div>
);

export default Layout;
