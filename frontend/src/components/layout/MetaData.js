import React from 'react';
import { Helmet } from 'react-helmet';

// The meta data component that shows the title of the current page on the tab.
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>
                {`${title} - All You Need`}
            </title>
        </Helmet>
    )
}

export default MetaData;