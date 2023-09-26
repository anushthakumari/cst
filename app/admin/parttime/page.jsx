"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Container";
import Input from "@/components/controls/Input";
import Select from "@/components/controls/Select";
import Spinner from "@/components/Spinner";
import axios from "axios";

import useAddress from "@/hooks/useAddress";

const days = [
	{
		label: "Na",
		value: "",
	},
	{
		label: "Sunday",
		value: "sunday",
	},
	{
		label: "Monday",
		value: "monday",
	},
	{
		label: "Tuesday",
		value: "tuesday",
	},
	{
		label: "Wednesday",
		value: "wednesday",
	},
	{
		label: "Thursday",
		value: "thursday",
	},
	{
		label: "Friday",
		value: "friday",
	},
	{
		label: "Saturday",
		value: "saturday",
	},
];

const defaultState = {
	title: "",
	desc: "",
	address: "",
	city: "",
	zipcode: "",
	salary: "",
	pay_per_hr: "",
	from_day: "",
	end_day: "",
	from_time: "",
	end_time: "",
	shift: "",
};

const Parttime = () => {
	const [isLoading, setisLoading] = useState(false);
	const [formState, setformState] = useState(defaultState);
	const [jobs, setjobs] = useState([]);

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
				shift: formState.shift ? formState.shift.trim() : null,
				from_day: formState.from_day ? formState.from_day : null,
				end_day: formState.end_day ? formState.end_day : null,
				from_time: formState.from_time ? formState.from_time : null,
				end_time: formState.end_time ? formState.end_time : null,
				salary: formState.salary ? parseFloat(formState.salary) : null,
				pay_per_hr: formState.pay_per_hr
					? parseFloat(formState.pay_per_hr)
					: null,
				zipcode: formState.zipcode ? formState.zipcode.trim() : null,
			};

			//we are editin
			if (formState.id) {
				const { data } = await axios.put(
					"/api/parttime/" + formState.id,
					pdata
				);
				setjobs((prev) => {
					const newData = [...prev];
					newData[formState.index] = data;
					return newData;
				});

				alert("edited Successfully!!");
			} else {
				const { data } = await axios.post("/api/parttime", pdata);
				setjobs((prev) => [data, ...prev]);
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

	const handleEdit = (id, index) => {
		const d = jobs.find((v) => v.id === id);
		setformState({ ...d, index });
	};

	const handleDelete = (id) => {
		setjobs((prev) => prev.filter((v) => v.id !== id));
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
			.get("/api/parttime")
			.then((res) => {
				setjobs(res.data);
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
					<h1 className="text-2xl text-bold my-4">Part Time Job</h1>
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
								<label htmlFor="state">Salary / Per Month</label>
								<div className="h-10">
									<Input
										type="number"
										name="salary"
										id="salary"
										placeholder="0"
										className="w-full"
										value={formState.salary}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="md:col-span-1">
								<label htmlFor="pay_per_hr">Pay Per Hour</label>
								<Input
									type="number"
									name="pay_per_hr"
									id="pay_per_hr"
									className="w-full"
									value={formState.pay_per_hr}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="from_day">From Day</label>
								<Select
									id="from_day"
									name="from_day"
									options={days}
									className="w-full"
									value={formState.from_day}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="end_day">End Day</label>
								<Select
									id="end_day"
									name="end_day"
									options={days}
									className="w-full"
									value={formState.end_day}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="from_time">From Time</label>
								<Input
									type="time"
									name="from_time"
									id="from_time"
									className="w-full"
									value={formState.from_time}
									onChange={handleChange}
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="end_time">End Time</label>
								<Input
									type="time"
									name="end_time"
									id="end_time"
									className="w-full"
									value={formState.end_time}
									onChange={handleChange}
								/>
							</div>

							<div className="md:col-span-2">
								<label htmlFor="shift">Shift</label>
								<div>
									<Select
										value={formState.shift}
										onChange={handleChange}
										className="h-full w-full"
										name="shift"
										options={[
											{ label: "N/A", value: "" },
											{ label: "Day", value: "day" },
											{ label: "Night", value: "night" },
										]}
									/>
								</div>
							</div>

							<div className="md:col-span-5 text-right">
								<div className="inline-flex items-end">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										disabled={isLoading}>
										{isLoading ? "Loading..." : "Submit"}
									</button>
								</div>
							</div>
						</div>
					</form>
					<center>
						{isLoading ? (
							<center>
								<Spinner />
							</center>
						) : null}

						{jobs.length && !isLoading ? (
							jobs.map((v, i) => (
								<JobItem
									key={v.id}
									id={v.id}
									title={v.title}
									desc={v.desc}
									city={v.city}
									address={v.address}
									zipcode={v.zipcode}
									salary={v.salary}
									shift={v.shift}
									payPerHr={v.pay_per_hour}
									fromDay={v.from_day}
									toDay={v.end_day}
									fromTime={v.from_time}
									toTime={v.end_time}
									isPublished={v.is_published}
									createdAt={v.createdAt}
									onEdit={handleEdit}
									onDelete={handleDelete}
									index={i}
								/>
							))
						) : (
							<center>No Data!</center>
						)}
					</center>
				</div>
			</div>
		</Container>
	);
};

export default Parttime;

const JobItem = ({
	id,
	title,
	desc,
	city,
	address,
	zipcode,
	salary,
	shift,
	isPublished,
	payPerHr,
	fromDay,
	toDay,
	fromTime,
	toTime,
	createdAt,
	onDelete,
	onEdit,
	index,
}) => {
	const [isLoading, setisLoading] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [is_pub, setis_pub] = useState(isPublished);

	const togglePublish = async (bool) => {
		try {
			setisLoading(true);
			const { data } = await axios.put("/api/parttime/" + id, {
				is_published: bool,
			});
			setis_pub(data.is_published);
		} catch (error) {
			alert("something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	const deleteJob = async () => {
		try {
			if (!confirm("are you sure you want to delete job id: " + id + "?")) {
				return;
			}

			setdeleteLoading(true);
			const { data } = await axios.delete("/api/parttime/" + id);
			onDelete(parseInt(id));
			alert(data.message);
		} catch (error) {
			alert("something went wrong!");
		} finally {
			setdeleteLoading(false);
		}
	};

	useEffect(() => {
		setis_pub(isPublished);
	}, [isPublished]);

	return (
		<div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
			<div className="py-4 px-6">
				<h1 className="text-lg text-justify font-semibold capitalize text-gray-800">
					{title}
				</h1>
				<p className="py-2 text-md text-gray-700 text-justify">{desc}</p>
				{address ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Address:</h1>
						<h1 className="px-2 text-sm">{address}</h1>
					</div>
				) : null}
				{city ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">City:</h1>
						<h1 className="px-2 text-sm">{city}</h1>
					</div>
				) : null}
				{zipcode ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Zipcode: </h1>
						<h1 className="px-2 text-sm">{zipcode}</h1>
					</div>
				) : null}
				{salary ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Salary: </h1>
						<h1 className="px-2 text-sm">{salary}/m</h1>
					</div>
				) : null}
				{payPerHr ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Pay Per Hour: </h1>
						<h1 className="px-2 text-sm">{payPerHr}</h1>
					</div>
				) : null}
				{shift ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Shift: </h1>
						<h1 className="px-2 text-sm">{shift}</h1>
					</div>
				) : null}

				{fromDay ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">From Day: </h1>
						<h1 className="px-2 text-sm">{fromDay}</h1>
					</div>
				) : null}

				{toDay ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">To Day: </h1>
						<h1 className="px-2 text-sm">{toDay}</h1>
					</div>
				) : null}
				{fromTime ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">From Time: </h1>
						<h1 className="px-2 text-sm">{fromTime}</h1>
					</div>
				) : null}

				{toTime ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">To Time: </h1>
						<h1 className="px-2 text-sm">{toTime}</h1>
					</div>
				) : null}

				<div className="flex mt-4 justify-between flex-end">
					<button
						onClick={togglePublish.bind(this, !is_pub)}
						className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						{isLoading ? "Loading..." : is_pub ? "Unpublish" : "Publish"}
					</button>
					<button
						onClick={onEdit.bind(this, id, index)}
						className="bg-green-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Edit
					</button>
					<button
						onClick={deleteJob}
						className="bg-red-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						{deleteLoading ? "Loading..." : "Delete"}
					</button>
				</div>
				<div className="">
					<p className="text-left">
						Created At: {new Date(createdAt).toLocaleDateString("en-IN")}
					</p>
				</div>
			</div>
		</div>
	);
};
