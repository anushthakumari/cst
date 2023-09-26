import { NextResponse } from "next/server";

import prisma from "@/app/db";

export async function PUT(req, res) {
	const urls = req.url.split("/");
	const jobid = urls[urls.length - 1];

	const data = await req.json();

	const new_data = {
		title: data.title ? data.title.trim() : undefined,
		desc: data.desc ? data.desc.trim() : undefined,
		address: data.address ? data.address.trim() : undefined,
		city: data.city ? data.city.trim() : undefined,
		shift: data.shift ? data.shift.trim() : undefined,
		from_day: data.from_day ? data.from_day : undefined,
		end_day: data.end_day ? data.end_day : undefined,
		from_time: data.from_time ? data.from_time : undefined,
		end_time: data.end_time ? data.end_time : undefined,
		salary: data.salary ? parseFloat(data.salary) : undefined,
		pay_per_hour: data.pay_per_hr ? parseFloat(data.pay_per_hr) : undefined,
		zipcode: data.zipcode ? data.zipcode.toString() : undefined,
		is_published:
			typeof data.is_published === "boolean" ? data.is_published : undefined,
	};

	const post = await prisma.parttimejobs.update({
		where: {
			id: parseInt(jobid),
		},
		data: new_data,
	});

	return NextResponse.json(post);
}

export async function DELETE(req, res) {
	const urls = req.url.split("/");
	const jobid = urls[urls.length - 1];

	await prisma.parttimejobs.delete({
		where: {
			id: parseInt(jobid),
		},
	});

	return NextResponse.json({ message: "Job Id:  " + jobid + " deleted!" });
}
