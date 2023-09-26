"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@/components/Container";
import Input from "@/components/controls/Input";
import Select from "@/components/controls/Select";

import useAddress from "@/hooks/useAddress";
import Spinner from "@/components/Spinner";

const defaultState = {
	title: "",
	desc: "",
	address: "",
	city: "",
	zipcode: "",
	n_bedrooms: "",
	is_private_washroom: "",
	gender_pref: "",
	room_type: "",
	accom_type: "",
	main_floor_rent: "",
	basement_floor_rent: "",
	first_month_last_month_rent: "",
	util_extra: "",
	move_in_date: "",
};

const Accom = () => {
	const [isLoading, setisLoading] = useState(false);
	const [formState, setformState] = useState(defaultState);
	const [accoms, setaccoms] = useState([]);

	const zipcodeData = useAddress(formState.zipcode);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setformState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			setisLoading(true);

			const pdata = {
				title: formState.title ? formState.title.trim() : null,
				desc: formState.desc ? formState.desc.trim() : null,
				address: formState.address ? formState.address.trim() : null,
				city: formState.city ? formState.city.trim() : null,
				zipcode: formState.zipcode ? formState.zipcode.trim() : null,
				n_bedrooms: formState.n_bedrooms
					? parseInt(formState.n_bedrooms)
					: null,
				is_private_washroom: formatBoolean(formState.is_private_washroom),
				gender_pref: formState.gender_pref ? formState.gender_pref : null,
				room_type: formState.room_type ? formState.room_type : null,
				accom_type: formState.accom_type ? formState.accom_type.trim() : null,
				main_floor_rent: formState.main_floor_rent
					? parseFloat(formState.main_floor_rent)
					: null,
				basement_floor_rent: formState.basement_floor_rent
					? parseFloat(formState.basement_floor_rent)
					: null,
				first_month_last_month_rent: formatBoolean(
					formState.first_month_last_month_rent
				),
				util_extra: formatBoolean(formState.util_extra),
				move_in_date: formState.move_in_date ? formState.move_in_date : null,
			};

			//we are editin
			if (formState.id) {
				const { data } = await axios.put("/api/accom/" + formState.id, pdata);
				setaccoms((prev) => {
					const newData = [...prev];
					newData[formState.index] = data;
					return newData;
				});

				alert("edited Successfully!!");
			} else {
				const { data } = await axios.post("/api/accom", pdata);
				setaccoms((prev) => [data, ...prev]);
				alert("created!!");
			}

			setformState(defaultState);
		} catch (error) {
			console.log(error);
			alert("something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	const handleDelete = (id) => {
		setaccoms((prev) => prev.filter((v) => v.id !== id));
	};

	const handleEdit = (id, index) => {
		const d = accoms.find((v) => v.id === id);
		setformState({ ...d, index });
	};

	useEffect(() => {
		setformState((prev) => ({
			...prev,
			address: zipcodeData.address,
			city: zipcodeData.city,
		}));
	}, [zipcodeData.city, zipcodeData.address]);

	useEffect(() => {
		setisLoading(true);
		axios
			.get("/api/accom")
			.then((res) => {
				setaccoms(res.data);
			})
			.catch((e) => {
				alert("something went wrong while fetching data!");
			})
			.finally(() => {
				setisLoading(false);
			});
	}, []);

	return (
		<Container>
			<div className="p-3">
				<div className="container max-w-screen-lg mx-auto">
					<h1 className="text-2xl text-bold my-4">Accomodations</h1>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
							<div className="md:col-span-5">
								<label htmlFor="title">Title</label>
								<Input
									type="text"
									name="title"
									id="title"
									placeholder="Title"
									className="mt-1 w-full"
									value={formState.title}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-5">
								<label htmlFor="desc">Description</label>
								<textarea
									type="text"
									name="desc"
									id="desc"
									rows={8}
									className="border rounded px-4 bg-gray-50 mt-1 w-full"
									value={formState.desc}
									onChange={handleChange}></textarea>
							</div>

							<div className="md:col-span-3">
								<label htmlFor="address">Address / Street</label>
								<Input
									type="text"
									name="address"
									id="address"
									className="mt-1 w-full"
									value={formState.address}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-2">
								<label htmlFor="city">City</label>
								<Input
									type="text"
									name="city"
									id="city"
									className="mt-1 w-full"
									value={formState.city}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-1">
								<label htmlFor="zipcode">Zipcode</label>
								{zipcodeData.isLoading ? <Spinner /> : null}
								<Input
									type="text"
									name="zipcode"
									id="zipcode"
									className="w-full"
									value={formState.zipcode}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-1">
								<label htmlFor="n_bedroom">No Of Bedrooms</label>
								<div className="h-10">
									<Input
										type="number"
										name="n_bedrooms"
										id="n_bedrooms"
										placeholder="0"
										className="w-full"
										value={formState.n_bedrooms}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="md:col-span-2">
								<label htmlFor="is_private_washroom">
									Do Have Private Washroom
								</label>
								<Select
									id="is_private_washroom"
									name="is_private_washroom"
									options={[
										{
											label: "NA",
											value: "",
										},
										{
											label: "Yes",
											value: true,
										},
										{ label: "No", value: false },
									]}
									className="w-full"
									value={formState.is_private_washroom}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-1">
								<label htmlFor="gender_pref">Gender Preference</label>
								<Select
									id="gender_pref"
									name="gender_pref"
									options={[
										{ label: "N/A", value: "" },
										{ label: "Boy", value: "boy" },
										{ label: "Girl", value: "girl" },
									]}
									className="w-full"
									value={formState.gender_pref}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-2">
								<label htmlFor="room_type">Room Type</label>
								<Select
									id="room_type"
									name="room_type"
									options={[
										{
											label: "N/A",
											value: "",
										},
										{
											label: "Basement Floor Room",
											value: "basement_floor_room",
										},
										{ label: "Main Floor Room", value: "main_floor_room" },
									]}
									className="w-full"
									value={formState.room_type}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="accom_type">Accomodation Type</label>
								<Select
									id="accom_type"
									name="accom_type"
									options={[
										{
											label: "N/A",
											value: "",
										},
										{
											label: "Shared",
											value: "shared",
										},
										{ label: "Personal", value: "personal" },
									]}
									className="w-full"
									value={formState.accom_type}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-1">
								<label htmlFor="main_floor_rent">Main Floor Room Rent</label>
								<div className="h-10">
									<Input
										type="number"
										name="main_floor_rent"
										id="main_floor_rent"
										placeholder="0"
										className="w-full"
										value={formState.main_floor_rent}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="basement_floor_rent">
									Basement Floor Room Rent
								</label>
								<div className="h-10">
									<Input
										type="number"
										name="basement_floor_rent"
										id="basement_floor_rent"
										placeholder="0"
										className="w-full"
										value={formState.basement_floor_rent}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="md:col-span-2">
								<label htmlFor="first_month_last_month_rent">
									First Month And Last Month Rent
								</label>
								<Select
									id="first_month_last_month_rent"
									name="first_month_last_month_rent"
									options={[
										{
											label: "N/A",
											value: "",
										},
										{
											label: "Yes",
											value: true,
										},
										{ label: "No", value: false },
									]}
									className="w-full"
									value={formState.first_month_last_month_rent}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="util_extra">Utilities Extras</label>
								<Select
									id="util_extra"
									name="util_extra"
									options={[
										{
											label: "N/A",
											value: "",
										},
										{
											label: "Yes",
											value: true,
										},
										{ label: "No", value: false },
									]}
									className="w-full"
									value={formState.util_extra}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="move_in_date">Move in date</label>
								<Input
									type="date"
									name="move_in_date"
									id="move_in_date"
									placeholder="0"
									className="w-full"
									value={formState.move_in_date}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-5 text-right">
								<div className="inline-flex items-end">
									<button
										type="submit"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										disabled={isLoading}>
										{isLoading ? "Loading..." : "Submit"}
									</button>
								</div>
							</div>
						</div>
					</form>

					<section className="container mx-auto p-6">
						<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
							<div className="w-full overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
											<th className="px-4 py-3">ID</th>
											<th className="px-4 py-3">Title & Desc</th>
											<th className="px-4 py-3">Address</th>
											<th className="px-4 py-3">Accomodation</th>
											<th className="px-4 py-3">Rent</th>
											<th className="px-4 py-3">Action</th>
										</tr>
									</thead>
									<tbody className="bg-white">
										{accoms.length
											? accoms.map((v, i) => {
													return (
														<AccomItem
															key={v.id}
															v={v}
															onDelete={handleDelete}
															onEdit={handleEdit}
															index={i}
														/>
													);
											  })
											: null}
									</tbody>
								</table>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Container>
	);
};

export default Accom;

const AccomItem = ({ v, onDelete, onEdit, index }) => {
	const [isLoading, setisLoading] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [is_pub, setis_pub] = useState(v.is_published);
	const togglePublish = async (bool) => {
		try {
			setisLoading(true);
			const { data } = await axios.put("/api/accom/" + v.id, {
				is_published: bool,
			});
			setis_pub(data.is_published);
		} catch (error) {
			alert("something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	const deleteAccom = async () => {
		try {
			if (!confirm("are you sure you want to delete Accom id: " + v.id + "?")) {
				return;
			}

			setdeleteLoading(true);
			const { data } = await axios.delete("/api/accom/" + v.id);
			onDelete(parseInt(v.id));
			alert(data.message);
		} catch (error) {
			alert("something went wrong!");
		} finally {
			setdeleteLoading(false);
		}
	};

	useEffect(() => {
		setis_pub(v.is_published);
	}, [v.is_published]);
	return (
		<tr className="text-gray-700">
			<td className="px-4 py-3 border">
				<p>ID: {v.id}</p>
				<p>Created At: {new Date(v.createdAt).toLocaleDateString("en-IN")}</p>
			</td>
			<td className="px-4 py-3 border">
				<div className="flex items-center text-sm">
					<div>
						<p className="font-semibold text-black">{v.title}</p>
						<p className="text-xs text-gray-600">{v.desc}</p>
					</div>
				</div>
			</td>
			<td className="px-4 py-3 text-ms font-semibold border">
				{v.address ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Address:</h1>
						<h1 className="px-2 text-sm">{v.address}</h1>
					</div>
				) : null}
				{v.city ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">City:</h1>
						<h1 className="px-2 text-sm">{v.city}</h1>
					</div>
				) : null}
				{v.zipcode ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Zip code:</h1>
						<h1 className="px-2 text-sm">{v.zipcode}</h1>
					</div>
				) : null}
			</td>
			<td className="px-4 py-3 text-xs border">
				{v.n_bedrooms ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">No Of Bedrooms:</h1>
						<h1 className="px-2 text-sm">{v.n_bedrooms}</h1>
					</div>
				) : null}
				{v.is_private_washroom ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Do Have Private Washroom:</h1>
						<h1 className="px-2 text-sm">{v.is_private_washroom.toString()}</h1>
					</div>
				) : null}
				{v.room_type ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Room Type:</h1>
						<h1 className="px-2 text-sm">{v.room_type}</h1>
					</div>
				) : null}
				{v.accom_type ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Accomodation Type:</h1>
						<h1 className="px-2 text-sm">{v.accom_type}</h1>
					</div>
				) : null}
				{v.gender_pref ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Gender Preference:</h1>
						<h1 className="px-2 text-sm">{v.gender_pref}</h1>
					</div>
				) : null}
			</td>
			<td className="px-4 py-3 text-xs border">
				{v.main_floor_rent ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Main Floor Rent:</h1>
						<h1 className="px-2 text-sm">{v.main_floor_rent}</h1>
					</div>
				) : null}
				{v.basement_floor_rent ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Basement Floor Rent</h1>
						<h1 className="px-2 text-sm">{v.basement_floor_rent}</h1>
					</div>
				) : null}
				{typeof v.first_month_last_month_rent === "boolean" ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">
							First Month And Last Month Rent:
						</h1>
						<h1 className="px-2 text-sm">
							{v.first_month_last_month_rent.toString()}
						</h1>
					</div>
				) : null}
				{typeof v.util_extra === "boolean" ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Util Extras:</h1>
						<h1 className="px-2 text-sm">{v.util_extra.toString()}</h1>
					</div>
				) : null}
				{v.move_in_date ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Move In Date:</h1>
						<h1 className="px-2 text-sm">{v.move_in_date}</h1>
					</div>
				) : null}
			</td>
			<td className="px-4 py-3 text-sm border">
				<div className="flex mt-4 justify-end flex-end">
					<button
						onClick={togglePublish.bind(this, !is_pub)}
						className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						{isLoading ? "Loading..." : is_pub ? "Unpublish" : "Publish"}
					</button>
				</div>
				<div className="flex mt-4 justify-end flex-end">
					<button
						onClick={deleteAccom}
						className="bg-red-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						{deleteLoading ? "Loading..." : "Delete"}
					</button>
				</div>
				<div className="flex mt-4 justify-end flex-end">
					<button
						onClick={onEdit.bind(this, v.id, index)}
						className="bg-green-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Edit
					</button>
				</div>
			</td>
		</tr>
	);
};

function formatBoolean(boolStr = "") {
	if (boolStr === "true") {
		return true;
	}

	if (boolStr === "false") {
		return false;
	}

	return null;
}
