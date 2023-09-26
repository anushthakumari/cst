import React from "react";

const Select = ({ options = [], className = "", ...rest }) => {
	return (
		<select
			{...rest}
			className={`rounded border h-10 px-4 py-2.5 bg-gray-50 ${className}`}>
			{options.map((v, i) => (
				<option key={v.value} value={v.value}>
					{v.label}
				</option>
			))}
		</select>
	);
};

export default Select;
