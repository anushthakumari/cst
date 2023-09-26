import { NextResponse } from "next/server";

import prisma from "@/app/db";

export async function GET(req, res) {
	const data = await prisma.FullTimeJobs.findMany({
		orderBy: [
			{
				id: "desc",
			},
		],
	});
	return NextResponse.json(data);
}

export async function POST(req, res) {
	const data = await req.json();

	const new_data = {
		title: data.title ? data.title.trim() : null,
		desc: data.desc ? data.desc.trim() : null,
		address: data.address ? data.address.trim() : null,
		city: data.city ? data.city?.trim() : null,
		shift: data.shift ? data.shift.trim() : null,
		salary: data.salary ? parseFloat(data.salary) : null,
		zipcode: data.zipcode ? data.zipcode.toString() : null,
	};

	const post = await prisma.FullTimeJobs.create({
		data: new_data,
	});

	return NextResponse.json(post);
}
