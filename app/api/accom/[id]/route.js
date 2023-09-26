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
		n_bedrooms: data.n_bedrooms ? parseInt(data.n_bedrooms) : undefined,
		is_private_washroom: formatBoolean(data.is_private_washroom),
		gender_pref: data.gender_pref ? data.gender_pref : undefined,
		room_type: data.room_type ? data.room_type : undefined,
		accom_type: data.accom_type ? data.accom_type.trim() : undefined,
		main_floor_rent: data.main_floor_rent
			? parseFloat(data.main_floor_rent)
			: undefined,
		basement_floor_rent: data.basement_floor_rent
			? parseFloat(data.basement_floor_rent)
			: undefined,
		first_month_last_month_rent: formatBoolean(
			data.first_month_last_month_rent
		),
		util_extra: formatBoolean(data.util_extra),
		move_in_date: data.move_in_date
			? new Date(data.move_in_date).toISOString()
			: undefined,
		zipcode: data.zipcode ? data.zipcode.toString() : undefined,
		is_published:
			typeof data.is_published === "boolean" ? data.is_published : undefined,
	};

	const post = await prisma.acommodations.update({
		where: {
			id: parseInt(jobid),
		},
		data: new_data,
	});

	return NextResponse.json(post);
}

export async function DELETE(req, res) {
	const urls = req.url.split("/");
	const acomid = urls[urls.length - 1];

	await prisma.acommodations.delete({
		where: {
			id: parseInt(acomid),
		},
	});

	return NextResponse.json({ message: "Accomm Id:  " + acomid + " deleted!" });
}

function formatBoolean(boolStr = "") {
	if (typeof boolStr === "boolean") {
		return boolStr;
	}

	if (boolStr === "true") {
		return true;
	}

	if (boolStr === "false") {
		return false;
	}

	return undefined;
}
