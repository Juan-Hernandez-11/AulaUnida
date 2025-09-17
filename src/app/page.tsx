import { firebaseConfig } from "../app/api/config";
console.log("Firebase Config:", firebaseConfig); // Verifica que las variables de entorno se estén leyendo correctamente
export default function Home() {
	return (
		<div className="landing-root">
			<header className="navbar">
				<div className="navbar-logo">
					{/* Logo SVG */}
					<span className="navbar-title">AulaUnida</span>
				</div>
				<nav className="navbar-menu">
					<a href="#" className="nav-link">Inicio</a>
					<a href="#" className="nav-link">Nosotros</a>
					<a href="#" className="nav-link">Contacto</a>
				</nav>
				<a href="/login" className="navbar-btn">Ingresar</a>
			</header>
			<main>
				<section className="hero-section">
					<h1 className="hero-title">Bienvenido a AulaUnida</h1>
					<p className="hero-desc">Nuestra misión es proporcionar una plataforma educativa integral que fomente el aprendizaje colaborativo y el crecimiento personal de cada estudiante.</p>
					<a href="/login" className="hero-btn">Ingresar</a>
				</section>
			</main>
			<footer className="footer">
				<div className="footer-links">
					<a href="#" className="footer-link">Política de Privacidad</a>
					<a href="#" className="footer-link">Términos de Servicio</a>
					<a href="#" className="footer-link">Contacto</a>
				</div>
				<p className="footer-copy">© 2024 AulaUnida. Todos los derechos reservados.</p>
				<div className="footer-social">
					{/* Facebook, Twitter, GitHub SVGs aquí si lo deseas */}
				</div>
			</footer>
		</div>
	);
}

