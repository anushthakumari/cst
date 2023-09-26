export async function getAddressFromZipCode(zipCode) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
	const response = await fetch(url);
	const results = await response.json();

	if (results.status === "OK") {
		const filteredResults = results.results.filter((result) => {
			const countryComponent = result.address_components.find((component) =>
				component.types.includes("country")
			);
			if (countryComponent) {
				const country = countryComponent.short_name;
				return ["US", "CA", "IN"].includes(country);
			}
			return false;
		});

		if (filteredResults.length > 0) {
			const cityComponent = filteredResults[0].address_components.find(
				(component) => component.types.includes("locality")
			);

			const city = cityComponent ? cityComponent.long_name : "N/A";

			return {
				address: filteredResults[0].formatted_address,
				city,
			};
		}

		return { city: "", address: "" };
	}

	return { city: "", address: "" };
}
