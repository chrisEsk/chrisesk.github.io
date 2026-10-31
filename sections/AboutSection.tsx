import { useEffect, useRef } from "react";
import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import useOnScreen from "hooks/useOnScreen";

import me from "../public/me.png";
import AboutBgSvg from "@/components/AboutBgSvg";
import EduGroup from "@/components/EduGroup";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    // profile-picture
    gsap.fromTo(
      q(".profile-picture"),
      {
        x: -200,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: q(".profile-picture"),
          start: "20% bottom",
        },
      }
    );

    const fromAnimation = {
      y: 100,
      opacity: 0,
    };

    const toAnimation = (triggerTarget: string) => ({
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: q(`.${triggerTarget}`),
        start: "top bottom",
      },
    });

    // about-intro
    gsap.fromTo(q(".about-intro"), fromAnimation, toAnimation("about-intro"));

    // edu-bg
    gsap.fromTo(q(".edu-bg"), fromAnimation, toAnimation("edu-bg"));

    // AI expertise: layered reveal with a subtle tilt and staggered cards.
    gsap.fromTo(
      q(".ai-heading"),
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".ai-heading"), start: "top 82%" },
      }
    );
    gsap.fromTo(
      q(".ai-card"),
      { y: 80, opacity: 0, rotateY: 8 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".ai-card"), start: "top 82%" },
      }
    );
    gsap.fromTo(
      q(".ai-callout"),
      { y: 35, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: q(".ai-callout"), start: "top 88%" },
      }
    );
    gsap.fromTo(
      q(".expertise-heading"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".expertise-heading"), start: "top 84%" },
      }
    );
    gsap.fromTo(
      q(".expertise-card"),
      { y: 65, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".expertise-card"), start: "top 86%" },
      }
    );

    // bg svg parallax effect
    gsap.fromTo(
      q(".bg-svg"),
      { y: -80 },
      {
        scrollTrigger: {
          trigger: q(".bg-svg"),
          scrub: true,
        },
        y: 65,
        duration: 3,
      }
    );

    // image bg svg parallax effect
    gsap.fromTo(
      q(".img-svg"),
      { y: -30 },
      {
        scrollTrigger: {
          trigger: q(".img-svg"),
          start: "80% 75%",
          scrub: true,
        },
        y: 30,
      }
    );
  }, []);

  const eduRef = useRef<HTMLDivElement>(null);
  const whoamiRef = useRef<HTMLDivElement>(null);
  const aiExpertiseRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className="about-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section ref={whoamiRef} id="whoami" className="section">
        <RoughNotationGroup>
          <div className="text-center">
            <RoughNotation
              type="underline"
              color={`${"#387BF8"}`}
              strokeWidth={2}
              order={1}
              show={isSecOnScreen}
            >
              <h2 className="section-heading">Who am I?</h2>
            </RoughNotation>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,280px)_1fr] lg:items-start lg:gap-x-16">
            <div className="flex justify-center lg:justify-start">
              <div className="profile-picture relative w-56 sm:w-64">
                <svg
                  width="96"
                  height="21"
                  viewBox="0 0 96 21"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute -top-14 -left-14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M79.2202 0.959991L62.7802 17.32L46.3301 0.959991L29.8902 17.32L13.4501 0.959991L0.410156 13.94L0.400146 17.58L13.4501 4.58999L29.8902 20.95L46.3301 4.58999L62.7802 20.95L79.2202 4.58999L93.7302 19.02L95.5402 17.19L79.2202 0.959991Z" />
                </svg>

                <div className="overflow-hidden rounded-full shadow-2xl">
                  <Image
                    src={me}
                    width={180}
                    height={180}
                    priority
                    alt="Christian Esquivel profile picture"
                    className="aspect-square rounded-full object-cover"
                  />
                </div>

                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute bottom-8 -right-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.68 11.51L9.23 7.05998L13.68 2.61C14.24 2.05 14.24 1.12999 13.68 0.569994C13.12 0.00999391 12.2 0.00999391 11.64 0.569994L7.19002 5.02001L2.74001 0.569994C2.18001 0.00999391 1.26003 0.00999391 0.700029 0.569994C0.140029 1.12999 0.140029 2.05 0.700029 2.61L5.15004 7.05998L0.700029 11.51C0.140029 12.07 0.140029 12.99 0.700029 13.55C1.26003 14.11 2.18001 14.11 2.74001 13.55L7.19002 9.09999L11.64 13.55C12.2 14.11 13.12 14.11 13.68 13.55C14.24 12.99 14.24 12.08 13.68 11.51Z" />
                </svg>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-[#FF9D00] absolute -bottom-10 right-6 scale-150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.6799 5.68002C11.6799 8.65002 9.27994 11.05 6.30994 11.05C3.33994 11.05 0.939941 8.65002 0.939941 5.68002C0.939941 2.71002 3.33994 0.309998 6.30994 0.309998C9.27994 0.309998 11.6799 2.71002 11.6799 5.68002Z" />
                </svg>
              </div>
            </div>

            <div className="about-intro min-w-0">
              <p>
                With 10+ years of comprehensive experience in the tech industry,
                I've gained diverse experience across consulting, development,
                teaching, QA, DevOps, entrepreneurship and project management.
                I'm dedicated to continuous learning, exploring new technologies
                and embracing experimentation; particularly with a focus on
                Frontend development.
                <br />
                <a
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-marrsgreen px-4 py-2 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-marrsdark focus-visible:outline-2 dark:bg-carrigreen dark:text-bgdark dark:hover:bg-carridark"
                  href="/experience"
                >
                  Experience{" "}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 fill-current"
                  >
                    <path d="M2 7.25h8.2L7 4.05 8.05 3l5 5-5 5L7 11.95l3.2-3.2H2z" />
                  </svg>
                </a>
              </p>

              <div className="mt-8" ref={eduRef}>
                <p className="edu-bg my-4">
                  Here is my educational background and Certifications.
                </p>
                {educationInfo.map((edu) => (
                  <EduGroup edu={edu} key={edu.id} />
                ))}
              </div>
            </div>
          </div>
        </RoughNotationGroup>
      </section>

      <section
        ref={aiExpertiseRef}
        id="ai-expertise"
        className="section relative overflow-hidden bg-[#eef4ff] dark:bg-[#111d2f]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(56,123,248,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,123,248,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#387BF8]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#7c3aed]/15 blur-3xl" />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 900 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M40 160 C180 40 270 260 410 130 S660 70 850 210 M80 530 C230 390 310 610 500 450 S700 390 860 520"
            fill="none"
            stroke="#387BF8"
            strokeWidth="1"
          />
          <circle cx="410" cy="130" r="6" fill="#387BF8" />
          <circle cx="500" cy="450" r="6" fill="#7c3aed" />
        </svg>
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-marrsgreen dark:text-carrigreen">
              Human judgment · Machine leverage
            </p>
            <h2 className="section-heading ai-heading">AI Expertise</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-marrsdark dark:text-carrilight">
              Building the operating layer for agentic engineering.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="ai-card rounded-2xl border border-white/70 bg-white/70 p-7 shadow-xl shadow-blue-900/10 backdrop-blur-md dark:border-white/10 dark:bg-[#1d2a35]/75">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#387BF8] text-xl text-white">
                  ✦
                </span>
                <h3 className="text-xl font-medium">Model orchestration</h3>
              </div>
              <p className="mt-3">
                I connect the right model to the right moment. My practice spans
                Claude, Codex, Gemini, Ollama, Kiro, and local open source
                models, creating reliable workflows that turn diverse
                capabilities into one focused engineering system.
              </p>
            </div>
            <div className="ai-card rounded-2xl border border-white/70 bg-white/70 p-7 shadow-xl shadow-blue-900/10 backdrop-blur-md dark:border-white/10 dark:bg-[#1d2a35]/75">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed] text-xl text-white">
                  ⌁
                </span>
                <h3 className="text-xl font-medium">Agentic engineering</h3>
              </div>
              <p className="mt-3">
                I design systems where agents can reason, collaborate, and act.
                That includes RAG agents, MCP, parallel agent architectures,
                context injection, and spec driven development, supported by
                carefully prepared datasets and training examples.
              </p>
            </div>
          </div>
          <div className="ai-callout mx-auto mt-8 max-w-3xl rounded-2xl border border-[#387BF8]/20 bg-[#387BF8]/10 p-6 text-center text-lg dark:bg-[#387BF8]/15">
            I am an AI orchestrator for a new era of software development,
            turning models, tools, and human expertise into practical systems
            that think with teams, accelerate delivery, and create leverage.
          </div>
        </div>
      </section>

      <section ref={expertiseRef} id="expertise" className="section">
        <div className="text-center">
          <h2 className="section-heading expertise-heading">Expertise</h2>
          <p className="mb-8">
            Technologies grouped by my level of experience.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseLevels.map(({ level, technologies }) => (
            <section
              className="expertise-card rounded-md border border-marrsgreen/30 p-5"
              key={level}
            >
              <h3 className="text-xl font-medium text-marrsgreen dark:text-carrigreen">
                {level}
              </h3>
              <ul className="mt-3 list-disc pl-5">
                {technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <AboutBgSvg />
    </div>
  );
};

const expertiseLevels = [
  {
    level: "★★★★★ · SME",
    technologies: [
      "Angular + TypeScript",
      "Ionic",
      "RxJS",
      "HTML + JS + SCSS",
      "Parse Platform",
      "Back4App",
    ],
  },
  {
    level: "★★★★☆ · Expert",
    technologies: [
      "Capacitor",
      "Bootstrap, Material, Foundation, Tailwind",
      "Node.js",
      "Heroku",
      "MySQL, PostgreSQL",
      "Jasmine, Karma, Cypress, Jest, Mocha, Chai",
      "Cloudinary",
      "Figma",
      "Chromecast SDK",
    ],
  },
  {
    level: "★★★☆☆ · Advanced",
    technologies: [
      "React, Vue, Svelte",
      "Nx",
      "AWS",
      "C#",
      "Java",
      "Windows Server",
      "ActionScript",
      "GitHub Actions",
      "GIMP",
    ],
  },
  {
    level: "★★☆☆☆ · Basic",
    technologies: [
      "MongoDB",
      "Python",
      "Google Ads Manager",
      "Jenkins",
      "Travis",
      "Handlebars",
    ],
  },
  {
    level: "★☆☆☆☆ · Beginner",
    technologies: ["Supabase", "Oracle Commerce Platform", "Cheetahmail"],
  },
];

const educationInfo = [
  {
    id: 1,
    title: "Bachelor's Degree in Software Engineering Development",
    star: true,
    subTitle: "CENFOTEC University | 2011 ~ 2018",
    list: [],
  },
  {
    id: 2,
    title: "High School Bachelor's Degree",
    subTitle: "Kamuk School | 2011",
    list: [],
  },
  {
    id: 3,
    title: "Certification: Cisco CCNA Switching & Routing",
    subTitle: "2013",
    list: [],
  },
  {
    id: 4,
    title: "Certification: OWASP Web Developer Security",
    subTitle: "2019 | 2022 | 2023",
    list: [],
  },
  {
    id: 5,
    title: "Certification: Certified SAFe® 5.0 practitioner",
    subTitle: "2020",
    list: [],
  },
];

export default AboutSection;
