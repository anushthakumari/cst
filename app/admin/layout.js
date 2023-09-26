import { AuthProvider } from "../Providers";

export const metadata = {
	title: "Admin",
	description: "admin",
};

export default function AdminLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
