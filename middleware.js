export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/admin/fulltime",
		"/admin/parttime",
		"/admin/accom",
		"/api/admin/:path*",
	],
};
