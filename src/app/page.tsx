import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import MissionVisionSection from "../components/landing/MissionVisionSection";
import FooterSection from "../components/landing/FooterSection";

export default function Home() {
	return (
		<div className="landing-root">
			<HeroSection />
			<AboutSection />
			<BenefitsSection />
			<MissionVisionSection />
			<FooterSection />
		</div>
	);
}

