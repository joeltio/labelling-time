import React from 'react';
import { Link } from 'gatsby';

type PropTypes = {
    siteTitle: string,
}

const Header: React.FC<PropTypes> = ({ siteTitle = '' }) => (
    <header>
        <div>
            <h1>
                <Link to="/">{siteTitle}</Link>
            </h1>
        </div>
    </header>
);

export default Header;
