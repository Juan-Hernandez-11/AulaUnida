// Next.js App Router layout

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/landingpage.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body>{children}</body>
		</html>
	);
}
