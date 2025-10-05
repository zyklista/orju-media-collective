import { Navigation } from "@/components/Navigation";
import { SEO } from "../SEO";
import { Footer } from "@/components/Footer";
import { Monitor, Megaphone, Video, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
	{
		key: "web-dev",
		icon: Monitor,
		title: "Website Development",
		description: "Modern, responsive websites tailored for entrepreneurs, creatives, and organizations. We build with accessibility, speed, and Filipino-inspired design in mind.",
		images: [
			"/services/web-dev.jpg"
		],
		features: [
			"Custom design & development",
			"Mobile-first & SEO-ready",
			"Easy content management",
			"E-commerce & blog options"
		]
	},
	{
		key: "content-creation",
		icon: Megaphone,
		title: "Content Creation",
		description: "Engaging copy, blogs, and social media content that tells your brand story and connects with your audience.",
			images: [
				"/services/affiliate-partnership.jpg"
			],
		features: [
			"Creative visuals & graphics",
			"Social media campaigns",
			"Brand messaging & strategy",
			"Spotlight your brand and story"
		]
	},
	{
		key: "media-production",
		icon: Video,
		title: "Media Production",
		description: "Professional video, podcast, and photography services for brands ready to amplify their voice.",
		images: [
			"/services/media-production.jpg"
		],
		features: [
			"Podcast & video production",
			"Editing & post-production",
			"Photography & creative direction",
			"Distribution & promotion"
		]
		},
		{
			key: "advertisement-partnership",
			icon: Megaphone,
			title: "Advertisement Partnership",
			description: "Earn commissions and grow your network by partnering with Orju Media. Get co-branded marketing, dedicated support-perfect for agencies, consultants, businesses, and community leaders.",
			images: [
				"/services/content-creation.jpg"
			],
			features: [
        "Expose your business to a wider audience as a brand and partner",
				"Attractive commission structure for refferrals",
				"Easy referral process",
				"Dedicated partner support",
				"Co-branded marketing materials"
			]
		}
];

const Services = () => {
		return (
			<div className="min-h-screen">
				<SEO
					title="Services | Orju Media Collective"
					description="Explore Orju Media's web development, content creation, and media production services for Filipino and multicultural brands."
				>
				</SEO>
			<Navigation />
			{/* Hero Section */}
					<section className="gradient-hero pt-32 pb-20 px-6 relative overflow-hidden">
						<img
							src="/hero-bg.svg"
							alt="Decorative background"
							className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-none opacity-60 pointer-events-none select-none"
							style={{ left: '50%', transform: 'translateX(-50%)', top: 0 }}
							aria-hidden="true"
						/>
						<div className="container mx-auto text-center relative z-10">
							<div className="max-w-4xl mx-auto animate-fade-in">
								<h1 className="text-5xl md:text-7xl font-bold mb-6">
									Our <span className="text-gradient">Services</span>
								</h1>
								<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
									Choose the package that fits your journey. From launching your first site to building a full media presence—
									<span className="text-foreground font-semibold"> we're here for you.</span>
								</p>
							</div>
						</div>
					</section>
			{/* Dynamic Services Section */}
					<section className="py-20 px-6">
						<div className="container mx-auto max-w-5xl space-y-24">
							{services.map((service, idx) => (
								<section key={service.key} className="space-y-8">
									<div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in-up" style={{animationDelay: `${idx * 100}ms`}}>
																				<div className="flex-1 flex justify-center items-center">
																					<span className="inline-block">
																						<service.icon
																							className="w-32 h-32 md:w-48 md:h-48 animate-bounce-slow drop-shadow-lg"
																							aria-label={service.title + ' icon'}
																							style={{ stroke: 'url(#gradient-' + idx + ')' }}
																						/>
																						<svg width="0" height="0">
																							<defs>
																								<linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
																									<stop offset="0%" stopColor="#ff6a00" />
																									<stop offset="50%" stopColor="#ee0979" />
																									<stop offset="100%" stopColor="#00c3ff" />
																								</linearGradient>
																							</defs>
																						</svg>
																					</span>
																					<style>{`
																						@keyframes bounce-slow {
																							0%, 100% { transform: translateY(0); }
																							50% { transform: translateY(-24px); }
																						}
																						.animate-bounce-slow {
																							animation: bounce-slow 2.5s infinite;
																						}
																						.drop-shadow-lg {
																							filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
																						}
																						.w-32, .h-32, .md\\:w-48, .md\\:h-48 {
																							stroke-width: 1.5;
																						}
																					`}</style>
																				</div>
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<service.icon className="w-8 h-8 text-primary" />
												<h2 className="text-3xl font-bold">{service.title}</h2>
											</div>
											<p className="mb-4 text-muted-foreground">{service.description}</p>
											<ul className="text-base text-foreground space-y-2 mb-4">
												{service.features.map((feature) => (
													<li key={feature} className="flex items-center gap-2">
														<Check className="w-4 h-4 text-primary" />
														{feature}
													</li>
												))}
											</ul>
											<Link to="/contact">
												<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
													Inquire Now <ArrowRight className="ml-2 w-4 h-4" />
												</Button>
											</Link>
										</div>
									</div>
								</section>
							))}
						</div>
					</section>
			<Footer />
		</div>
	);
};

export default Services;
