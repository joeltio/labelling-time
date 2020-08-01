import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';

type PropTypes = {
    children: React.ReactNode,
}

const Layout: React.FC<PropTypes> = ({ children }) => (
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
            <main>{children}</main>
        </div>
    </div>
);

export default Layout;
