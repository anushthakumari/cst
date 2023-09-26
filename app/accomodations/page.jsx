import React from "react";
import Container from "@/components/HomePage/Container";
import AccomCardList from "@/components/AccomCardList";
import prisma from "@/app/db";

export const dynamic = "force-dynamic";

async function getData() {
	return await prisma.acommodations.findMany({
		where: {
			is_published: true,
		},
		orderBy: [
			{
				id: "desc",
			},
		],
	});
}

const Accom = async () => {
	const accoms = await getData();
	return (
		<div>
			<Container>
				<div className="my-8">
					<h2 className=" text-2xl font-bold text-white md:text-4xl">
						Accomodation
					</h2>
					<p className="text-gray-300">Discover Accomodations</p>
				</div>
				<div className="my-8">
					<AccomCardList data={accoms} />
				</div>
			</Container>
		</div>
	);
};

export default Accom;
