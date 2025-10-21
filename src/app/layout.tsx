
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/theme.css";
import "../styles/landingpage.css";
import "../styles/urbanist.css";
import "../app/api/config";
import { AuthProvider } from "../context/authContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body>
				{/* Proveedor de autenticación global */}
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}

