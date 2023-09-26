import AdminSidebar from "@/components/AdminSidebar";

export default function Layout({ children }) {
	return (
		<main>
			<AdminSidebar active="parttime" />
			{children}
		</main>
	);
}
