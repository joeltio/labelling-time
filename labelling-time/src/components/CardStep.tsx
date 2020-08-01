import React, { ReactNode } from 'react';

import Card from './Card';

type PropTypes = {
    children: ReactNode,
    step: number,
    className?: string,
}

const CardStep: React.FC<PropTypes> = ({
    children,
    step,
    className,
}) => {
    const childrenArr = React.Children.toArray(children);
    const current = childrenArr[step];

    return (
        <Card className={className}>
            {current}
        </Card>
    );
};

export default CardStep;
