import React from "react";
import AccomCard from "@/components/AccomCard";

const AccomCardList = ({ data }) => {
	return (
		<div className="flex flex-col items-center gap-5">
			{data.map((v) => (
				<AccomCard key={v.id} {...v} />
			))}
		</div>
	);
};

export default AccomCardList;
