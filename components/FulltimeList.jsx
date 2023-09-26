import React from "react";
import FulltimeCard from "@/components/FulltimeCard";

const FulltimeList = ({ data }) => {
	return (
		<div className="flex flex-col items-center gap-5">
			{data.map((v) => (
				<FulltimeCard key={v.id} {...v} />
			))}
		</div>
	);
};

export default FulltimeList;
