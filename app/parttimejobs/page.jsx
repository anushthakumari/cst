import React from "react";
import Container from "@/components/HomePage/Container";
import ParttimeList from "@/components/ParttimeList";
import prisma from "@/app/db";

export const dynamic = "force-dynamic";

async function getData() {
	return await prisma.parttimejobs.findMany({
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

const Page = async () => {
	const parttimejobs = await getData();

	return (
		<div>
			<Container>
				<div className="my-8">
					<h2 className=" text-2xl font-bold text-white md:text-4xl">
						Part Time Jobs
					</h2>
					<p className="text-gray-300">Find Part Time Jobs</p>
				</div>
				<div className="my-8">
					<ParttimeList data={parttimejobs} />
				</div>
			</Container>
		</div>
	);
};

export default Page;
