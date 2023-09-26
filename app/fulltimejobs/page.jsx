import React from "react";
import Container from "@/components/HomePage/Container";
import FulltimeList from "@/components/FulltimeList";
import prisma from "@/app/db";

export const dynamic = "force-dynamic";

async function getData() {
	return await prisma.FullTimeJobs.findMany({
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
	const fulltimejobs = await getData();
	return (
		<div>
			<Container>
				<div className="my-8">
					<h2 className=" text-2xl font-bold text-white md:text-4xl">
						Full Time Jobs
					</h2>
					<p className="text-gray-300">Find Full Time Jobs</p>
				</div>
				<div className="my-8">
					<FulltimeList data={fulltimejobs} />
				</div>
			</Container>
		</div>
	);
};

export default Page;
