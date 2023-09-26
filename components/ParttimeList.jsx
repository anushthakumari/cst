import React from "react";
import ParttimeCard from "@/components/ParttimeCard";

const ParttimeList = ({ data }) => {
	return (
		<div className="flex flex-col items-center gap-5">
			{data.map((v) => (
				<ParttimeCard key={v.id} {...v} />
			))}
		</div>
	);
};

export default ParttimeList;
