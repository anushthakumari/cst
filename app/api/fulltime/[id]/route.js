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
		city: data.city ? data.city?.trim() : undefined,
		shift: data.shift ? data.shift.trim() : undefined,
		salary: data.salary ? parseFloat(data.salary) : undefined,
		zipcode: data.zipcode ? data.zipcode.toString() : undefined,
		is_published:
			typeof data.is_published === "boolean" ? data.is_published : undefined,
	};

	const post = await prisma.FullTimeJobs.update({
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

	await prisma.FullTimeJobs.delete({
		where: {
			id: parseInt(jobid),
		},
	});

	return NextResponse.json({ message: "Job Id:  " + jobid + " deleted!" });
}
