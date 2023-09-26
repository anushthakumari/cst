import { NextResponse } from "next/server";

import prisma from "@/app/db";

export async function GET(req, res) {
	const data = await prisma.parttimejobs.findMany({
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
		city: data.city ? data.city.trim() : null,
		shift: data.shift ? data.shift.trim() : null,
		from_day: data.from_day ? data.from_day : null,
		end_day: data.end_day ? data.end_day : null,
		from_time: data.from_time ? data.from_time : null,
		end_time: data.end_time ? data.end_time : null,
		salary: data.salary ? parseFloat(data.salary) : null,
		pay_per_hour: data.pay_per_hr ? parseFloat(data.pay_per_hr) : null,
		zipcode: data.zipcode ? data.zipcode.toString() : null,
	};

	const post = await prisma.parttimejobs.create({
		data: new_data,
	});

	return NextResponse.json(post);
}
