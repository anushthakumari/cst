import React from "react";

const Input = ({ className = "", ...props }) => {
	return (
		<input
			className={`h-10 border rounded px-4 bg-gray-50 ${className}`}
			{...props}
		/>
	);
};

export default Input;
