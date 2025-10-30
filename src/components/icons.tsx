import * as React from "react";

export const SaimaConnectLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 100 100" 
        width="24" 
        height="24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g fill="currentColor">
            <path d="M50 2.5A47.5 47.5 0 1 0 97.5 50 47.56 47.56 0 0 0 50 2.5zm0 85A37.5 37.5 0 1 1 87.5 50 37.54 37.54 0 0 1 50 87.5z"/>
            <path d="M50 27.5c-12.4 0-22.5 10.1-22.5 22.5S37.6 72.5 50 72.5 72.5 62.4 72.5 50 62.4 27.5 50 27.5zm0 35c-6.9 0-12.5-5.6-12.5-12.5S43.1 37.5 50 37.5s12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5z"/>
            <circle cx="50" cy="50" r="7.5"/>
        </g>
    </svg>
);
