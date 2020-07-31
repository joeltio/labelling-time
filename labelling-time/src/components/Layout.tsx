import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import './layout.css';

type PropTypes = {
    children: React.ReactNode,
}

const Layout: React.FC<PropTypes> = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
                style={{
                    height: '100%',
                    margin: '0 auto',
                    maxWidth: 960,
                    flexGrow: 1,
                }}
            >
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
