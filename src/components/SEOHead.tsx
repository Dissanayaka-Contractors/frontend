import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};
