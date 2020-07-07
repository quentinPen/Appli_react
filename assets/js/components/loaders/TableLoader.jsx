import React from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={1080}
            height={400}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="-4" y="41" rx="3" ry="3" width="410" height="6" />
            <rect x="0" y="67" rx="3" ry="3" width="380" height="6" />
            <rect x="-11" y="22" rx="3" ry="3" width="190" height="6" />
            <rect x="0" y="82" rx="3" ry="3" width="380" height="6" />
            <rect x="2" y="98" rx="3" ry="3" width="380" height="6" />
            <rect x="3" y="114" rx="3" ry="3" width="380" height="6" />
            <rect x="2" y="128" rx="3" ry="3" width="380" height="6" />
            <rect x="6" y="161" rx="3" ry="3" width="380" height="6" />
            <rect x="35" y="160" rx="3" ry="3" width="380" height="6" />
            <rect x="1" y="144" rx="3" ry="3" width="380" height="6" />
            <rect x="0" y="158" rx="3" ry="3" width="380" height="6" />
            <rect x="306" y="17" rx="0" ry="0" width="98" height="10" />
        </ContentLoader>
    );
}

export default TableLoader;