import { NextResponse } from "next/server";

import prisma from "@/app/db";

export async function GET(req, res) {
	const data = await prisma.acommodations.findMany({
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
		zipcode: data.zipcode ? data.zipcode.toString() : null,
		n_bedrooms: data.n_bedrooms ? parseInt(data.n_bedrooms) : null,
		is_private_washroom: formatBoolean(data.is_private_washroom),
		gender_pref: data.gender_pref ? data.gender_pref : null,
		room_type: data.room_type ? data.room_type : null,
		accom_type: data.accom_type ? data.accom_type.trim() : null,
		main_floor_rent: data.main_floor_rent
			? parseFloat(data.main_floor_rent)
			: null,
		basement_floor_rent: data.basement_floor_rent
			? parseFloat(data.basement_floor_rent)
			: null,
		first_month_last_month_rent: formatBoolean(
			data.first_month_last_month_rent
		),
		util_extra: formatBoolean(data.util_extra),
		move_in_date: data.move_in_date
			? new Date(data.move_in_date).toISOString()
			: null,
	};

	const post = await prisma.acommodations.create({
		data: new_data,
	});

	return NextResponse.json(post);
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

	return null;
}
