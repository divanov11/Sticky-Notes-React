import React from "react";

const Spinner = ({ color = "#fff", size = "20" }) => {
    return (
        <svg
            className="spinner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke={color}
            fill="none"
            strokeWidth="1.5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20c-4.416 0-8-3.584-8-8s4.448-7.112 4.448-7.112m0 0v3.616m0-3.616h-4M12 4c4.416 0 8 3.552 8 8 0 5.336-4.448 8-4.448 8m0 0h4m-4 0v-3.552"
            ></path>
        </svg>
    );
};

export default Spinner;
