import React, { useEffect } from 'react';
import { CheckCircle, Clock, Users, Award, Sparkles, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import founderImage from '../assets/founder-naftali-koome.jpg';
import { usePublicPageContent } from '@/hooks/usePageContent';
import { RenderHtml } from '@/components/common/HtmlContent';
import TeamSection from '@/components/about/TeamSection';

const AboutPage = () => {
  const { getContent, content } = usePublicPageContent('about');

  useEffect(() => {
    const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85) {
          el.classList.add('show');
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroTitle = getContent('hero_title', 'We Build Tools That Work So You Don\u2019t Have To');
  const heroSubtitle = getContent('hero_subtitle', "NafArro Solutions is a small, senior team obsessed with putting boring, repetitive business work on auto-pilot — so founders can get back to growing.");
  const storyTitle = getContent('story_title', 'Our Story');
  const storyContent = getContent('story_content', 'NafArro Solutions was founded with a singular vision: to help businesses leverage the power of automation to achieve greater efficiency and growth. What began as a small team of passionate developers has evolved into a comprehensive technology partner for businesses of all sizes.');
  const missionTitle = getContent('mission_title', 'Our Mission');
  const missionContent = getContent('mission_content', 'To empower businesses through innovative automation solutions that drive efficiency, reduce costs, and accelerate growth, making technology work for people rather than the other way around.');
  const visionTitle = getContent('vision_title', 'Our Vision');
  const visionContent = getContent('vision_content', 'To be recognized as the leading automation solutions provider, known for our technical excellence, innovation, and exceptional client service.');
  const founderName = getContent('founder_name', 'Naftali Koome');
  const founderTitle = getContent('founder_title', 'Founder & Lead Developer');
  const founderBio = getContent('founder_bio', 'With a BSc in Computer Science from The Catholic University of Eastern Africa, Lang\'ata, Naftali brings over half a decade of hands-on experience in software development and business automation.');
  const founderImageUrl = content['founder_image'];

  const coreValues = [
    { icon: CheckCircle, title: 'Quality', description: "We never compromise. Every line of code is built for reliability, security, and speed." },
    { icon: Clock, title: 'Timeliness', description: 'Projects ship in weeks, not quarters. Your time is money — we respect both.' },
    { icon: Users, title: 'Collaboration', description: 'Direct line to the team that builds your product. Real people, real conversations.' },
    { icon: Award, title: 'Excellence', description: 'We obsess over the details others skip, because those details win you customers.' },
  ];

  const stats = [
    { value: '5+', label: 'Years of Experience' },
    { value: '40+', label: 'Projects Shipped' },
    { value: '15+', label: 'Industries Served' },
    { value: '100%', label: 'Owned by You' },
  ];

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NafArro Solutions",
      "description": heroSubtitle,
      "foundingDate": "2023",
      "founders": [{
        "@type": "Person",
        "name": founderName,
        "jobTitle": founderTitle,
        "alumniOf": "The Catholic University of Eastern Africa",
        "knowsAbout": ["Computer Science", "Software Development", "Business Automation"],
      }],
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "knowsAbout": ["Business Process Automation", "Web Development", "Data Analysis"],
    },
  };

  return (
    <>
      <SEO
        title="About NafArro Solutions | Automation Experts"
        description="Meet the team behind NafArro: senior developers and automation experts helping businesses grow with custom web, app, and data solutions."
        keywords="about nafarro, automation experts, company story, mission vision, our team"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={aboutPageSchema}
      />

      <div>
        {/* Hero — matches HomePage gradient + animated background */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-primary via-[#0A3472] to-[#104B8B]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/50 transform rotate-45 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-white/40 transform rotate-12 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
              <div className="absolute bottom-10 left-1/4 w-28 h-28 border-2 border-white/45 transform -rotate-12 animate-spin" style={{ animationDuration: '22s' }} />
            </div>
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-white/30 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
              <div className="absolute bottom-1/4 right-1/6 w-56 h-56 rounded-full bg-accent/40 blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
            </div>
          </div>

          <div className="container-custom relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-secondary" /> About NafArro Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {heroTitle}
            </h1>
            <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <RenderHtml content={heroSubtitle} className="text-lg md:text-xl text-gray-200/90 leading-relaxed" />
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm p-4">
                  <div className="text-2xl md:text-3xl font-bold text-secondary">{s.value}</div>
                  <div className="text-xs md:text-sm text-gray-200/90 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  <Rocket className="w-3 h-3" /> Our Journey
                </span>
                <h2 className="section-title text-left">{storyTitle}</h2>
                <RenderHtml content={storyContent} className="text-gray-700 mb-4 leading-relaxed" />
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our journey started when we recognized a common challenge across industries — businesses were drowning in repetitive tasks that could be automated. We saw an opportunity to free up human time for the work that actually grows a company.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we continue to innovate and expand, staying true to our mission of being the "King of Automation" and delivering real, measurable value to every client.
                </p>
              </div>

              <div className="animate-on-scroll relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white">
                  <img alt="Team collaboration" className="w-full h-auto" src="/lovable-uploads/c3e2aec1-cfb1-4841-8d57-5f075f5db03d.png" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values — styled like ProblemsSection cards */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-14 animate-on-scroll">
              <h2 className="section-title">What We Stand For</h2>
              <p className="section-subtitle mx-auto">
                Four principles guide every decision we make and every project we ship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="animate-on-scroll p-6 rounded-xl border border-gray-100 bg-white hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{v.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-on-scroll relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#0A3472] p-8 md:p-10 text-white shadow-xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 relative">{missionTitle}</h3>
                <RenderHtml content={missionContent} className="text-gray-200/90 mb-4 leading-relaxed relative" />
                <p className="text-gray-200/90 leading-relaxed relative">
                  We deliver high-quality, customized solutions that solve real problems and create tangible value.
                </p>
              </div>

              <div className="animate-on-scroll relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-[#0A3472] p-8 md:p-10 text-white shadow-xl" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 relative">{visionTitle}</h3>
                <RenderHtml content={visionContent} className="text-gray-200/90 mb-4 leading-relaxed relative" />
                <p className="text-gray-200/90 leading-relaxed relative">
                  A future where every business — big or small — can harness automation to thrive in a digital world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-14 animate-on-scroll">
              <h2 className="section-title">Meet Our Founder</h2>
              <p className="section-subtitle mx-auto">
                The vision and technical leadership steering NafArro's mission.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-on-scroll">
                <h3 className="text-3xl font-bold mb-2 text-primary">{founderName}</h3>
                <p className="text-lg text-accent mb-6 font-medium">{founderTitle}</p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <RenderHtml content={founderBio} className="text-gray-700" />
                  <p>
                    His expertise spans full-stack development, database design, and enterprise automation. From church management systems to GPS tracking platforms, Naftali understands the unique challenges businesses face going digital.
                  </p>

                  <div className="pt-4">
                    <h4 className="font-semibold text-primary mb-3">Core Expertise:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {['React & TypeScript', 'Node.js & Express', 'Database Design', 'API Development', 'Process Automation', 'Cloud Solutions'].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span className="text-gray-700">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 animate-on-scroll">
                <div className="relative max-w-sm mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl" />
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={founderImageUrl || founderImage}
                      alt={`${founderName}, Founder of NafArro Solutions`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-xl">
                    <p className="text-sm font-bold">5+ Years</p>
                    <p className="text-xs text-gray-200">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team — CMS-managed */}
        <TeamSection />

        {/* CTA — mirrors home ContactCTA style */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-[#0A3472] to-[#104B8B]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/30 blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-accent/40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-on-scroll">
              Ready to Put Your Business on Auto-Pilot?
            </h2>
            <p className="text-lg text-gray-200/90 mb-8 max-w-2xl mx-auto animate-on-scroll">
              Let's chat about how the right automation can save you hours every week and unlock real growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-on-scroll">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 py-3 px-7 rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-7 rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
