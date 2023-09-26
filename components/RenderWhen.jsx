import React from "react";

const RenderWhen = ({ isTrue, children }) => {
	if (!Boolean(isTrue)) {
		return null;
	}

	return <>{children}</>;
};

export default RenderWhen;
