import { useEffect, useState, useDeferredValue } from "react";

import { getAddressFromZipCode } from "@/utils/maps";

const useAddress = (zipcode) => {
	const [isLoading, setisLoading] = useState(false);
	const [err, seterr] = useState("");
	const [data, setdata] = useState({ city: "", address: "" });

	const deferredZipCode = useDeferredValue(zipcode);

	useEffect(() => {
		if (deferredZipCode) {
			async function fetchAddress() {
				try {
					setisLoading(true);
					const dt = await getAddressFromZipCode(deferredZipCode);
					setdata(dt);
				} catch (error) {
					seterr("somthing went wrong while fetching address!!");
				} finally {
					setisLoading(false);
				}
			}

			fetchAddress();
		}
	}, [deferredZipCode]);

	return { isLoading, err, ...data };
};

export default useAddress;
