"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@/components/Container";
import Input from "@/components/controls/Input";
import Select from "@/components/controls/Select";
import Spinner from "@/components/Spinner";

import useAddress from "@/hooks/useAddress";

const defaultState = {
	title: "",
	desc: "",
	address: "",
	city: "",
	zipcode: "",
	salary: "",
	shift: "",
};

const Fulltime = () => {
	const [isLoading, setisLoading] = useState(false);
	const [jobs, setjobs] = useState([]);
	const [formState, setformState] = useState(defaultState);

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
				salary: formState.salary ? parseFloat(formState.salary) : null,
				zipcode: formState.zipcode ? formState.zipcode.trim() : null,
			};

			//we are editin
			if (formState.id) {
				const { data } = await axios.put(
					"/api/fulltime/" + formState.id,
					pdata
				);
				setjobs((prev) => {
					const newData = [...prev];
					newData[formState.index] = data;
					return newData;
				});

				alert("edited Successfully!!");
			} else {
				const { data } = await axios.post("/api/fulltime", pdata);
				setjobs((prev) => [data, ...prev]);
				alert("created!!");
			}

			setformState(defaultState);
		} catch (error) {
			alert("something went wrong!");
			return;
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
			.get("/api/fulltime")
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
					<h1 className="text-2xl text-bold my-4">Full Time Job</h1>
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
									className="border rounded px-4 bg-gray-50 mt-1 w-full"
									rows={8}
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
									placeholder=""
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
									placeholder=""
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

							<div className="md:col-span-2">
								<label htmlFor="shift">Shift</label>
								<div>
									<Select
										className="h-full w-full"
										name="shift"
										options={[
											{ label: "N/A", value: "" },
											{ label: "Day", value: "day" },
											{ label: "Night", value: "night" },
										]}
										value={formState.shift}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="md:col-span-2">
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
	createdAt,
	onDelete,
	onEdit,
	index,
}) => {
	const [isLoading, setisLoading] = useState(false);
	const [deleteLoading, setdeleteLoading] = useState(false);
	const [is_pub, setis_pub] = useState(isPublished);

	const togglePublish = async () => {
		try {
			setisLoading(true);
			const { data } = await axios.put("/api/fulltime/" + id, {
				is_published: !is_pub,
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
			const { data } = await axios.delete("/api/fulltime/" + id);
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
				{shift !== "na" ? (
					<div className="flex items-center mt-4 text-gray-700">
						<h1 className="text-sm font-bold">Shift: </h1>
						<h1 className="px-2 text-sm">{shift}</h1>
					</div>
				) : null}

				<div className="flex mt-4 justify-between flex-end">
					<button
						onClick={togglePublish}
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

export default Fulltime;
