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
		<div className="min-h-screen w-full">
									<SEO
										title="Services | Orju Media Collective"
										description="Explore Orju Media's web development, content creation, and media production services for Filipino and multicultural brands."
										image="https://lovable.dev/opengraph-image-p98pqg.png"
										type="website"
										twitterHandle="@orjumedia"
									/>
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
				
				{/* Floating media-themed icons */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
					<div className="absolute top-24 left-12 opacity-15 animate-pulse" style={{ animationDuration: '2.5s' }}>
						<svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</div>
					<div className="absolute bottom-20 right-16 opacity-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
						<svg className="w-20 h-20 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
					</div>
					<div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
				</div>
				
				<div className="container mx-auto relative z-10">
					<div className="max-w-4xl animate-fade-in">
						<h1 className="text-7xl md:text-8xl font-bold mb-8">
							Our <span className="text-gradient">Services</span>
						</h1>
						<p className="text-3xl text-muted-foreground">
							Discover a range of creative and digital services designed to help you grow, connect, and succeed. Whether you're launching your first website, building a brand, or expanding your media presence, our team is ready to support your journey every step of the way.
						</p>
						<p className="text-3xl text-foreground font-bold mt-6">
							Let's create something amazing together.
						</p>
					</div>
				</div>
			</section>
			{/* Dynamic Services Section */}
			   <section className="py-4 xs:py-6 md:py-8 px-0 xs:px-0 w-full">
				   <div className="w-full space-y-10 xs:space-y-14">
					{services.map((service, idx) => (
						<section key={service.key} className={`space-y-6 xs:space-y-8${idx === 0 ? ' mt-48 xs:mt-56' : ''}`}> 
							<div className="flex flex-col md:flex-row items-center gap-6 xs:gap-12 animate-fade-in-up" style={{animationDelay: `${idx * 100}ms`}}>
								<div className="flex-1 flex justify-center items-center">
									<span className="inline-block">
										<service.icon
											className="w-20 h-20 xs:w-32 xs:h-32 md:w-48 md:h-48 animate-bounce-slow drop-shadow-lg"
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
											50% { transform: translateY(-16px); }
										}
										.animate-bounce-slow {
											animation: bounce-slow 2.5s infinite;
										}
										.drop-shadow-lg {
											filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
										}
										.w-20, .h-20, .xs\\:w-32, .xs\\:h-32, .md\\:w-48, .md\\:h-48 {
											stroke-width: 1.5;
										}
									`}</style>
								</div>
								<div className="flex-1 w-full text-left">
									<div className="flex items-center gap-2 xs:gap-3 mb-8 xs:mb-12">
										{/* Remove icon from here, only show title */}
										{service.key === "web-dev" ? (
											<h2 className="text-4xl xs:text-6xl font-extrabold whitespace-nowrap">{service.title}</h2>
										) : (
											<h2 className="text-5xl xs:text-7xl font-extrabold">{service.title}</h2>
										)}
									</div>
									<p className="mb-10 xs:mb-16 text-muted-foreground text-2xl xs:text-4xl">{service.description}</p>
									<ul className="text-lg xs:text-2xl text-foreground space-y-1 xs:space-y-2 mb-8 xs:mb-12 font-medium">
										{service.features.map((feature) => (
											<li key={feature} className="flex items-center gap-1 xs:gap-2">
												<Check className="w-3 h-3 xs:w-4 xs:h-4 text-primary" />
												{feature}
											</li>
										))}
									</ul>
									<div className="mb-12 xs:mb-20">
										<Link to="/contact">
											<Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full xs:w-auto px-4 py-1.5 text-sm rounded-md">
												Inquire Now <ArrowRight className="ml-2 w-4 h-4" />
											</Button>
										</Link>
									</div>
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
