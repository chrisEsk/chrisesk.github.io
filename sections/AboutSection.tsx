import { useEffect, useRef } from "react";
import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

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

  const { theme } = useTheme();

  const eduRef = useRef<HTMLDivElement>(null);

  // Set active link for about section
  const aboutSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  return (
    <div
      ref={sectionRef}
      className="about-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section id="whoami" className="section">
        <RoughNotationGroup>
          <div className="text-center">
            <RoughNotation
              type="underline"
              color={`${
                theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
              }`}
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
              teaching, QA, DevOps, entrepreneurship and project management. I'm
              dedicated to continuous learning, exploring new technologies and
              embracing experimentation; particularly with a focus on Frontend development.
              <br /><a className="link" href="/experience">Experience</a>
              </p>

              <div className="mt-8" ref={eduRef}>
              <p className="edu-bg my-4">Here is my educational background and Certifications.</p>
              {educationInfo.map((edu) => (
                <EduGroup edu={edu} key={edu.id} />
              ))}
              </div>
            </div>
          </div>
        </RoughNotationGroup>
      </section>

      <section id="expertise" className="section">
        <div className="text-center">
          <h2 className="section-heading">Expertise</h2>
          <p className="mb-8">Technologies grouped by my level of experience.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseLevels.map(({ level, technologies }) => (
            <section className="rounded-md border border-marrsgreen/30 p-5" key={level}>
              <h3 className="text-xl font-medium text-marrsgreen dark:text-carrigreen">{level}</h3>
              <ul className="mt-3 list-disc pl-5">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
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
  { level: "★★★★★ · SME", technologies: ["Angular + TypeScript", "Ionic", "RxJS", "HTML + JS + SCSS", "Parse Platform", "Back4App"] },
  { level: "★★★★☆ · Expert", technologies: ["Capacitor", "Bootstrap, Material, Foundation, Tailwind", "Node.js", "Heroku", "MySQL, PostgreSQL", "Jasmine, Karma, Cypress, Jest, Mocha, Chai", "Cloudinary", "Figma", "Chromecast SDK"] },
  { level: "★★★☆☆ · Advanced", technologies: ["React, Vue, Svelte", "Nx", "AWS", "C#", "Java", "Windows Server", "ActionScript", "GitHub Actions", "GIMP"] },
  { level: "★★☆☆☆ · Basic", technologies: ["MongoDB", "Python", "Google Ads Manager", "Jenkins", "Travis", "Handlebars"] },
  { level: "★☆☆☆☆ · Beginner", technologies: ["Supabase", "Oracle Commerce Platform", "Cheetahmail"] },
];

const educationInfo = [
  {
    id: 1,
    title: "Bachelor's Degree in Software Engineering Development",
    star: true,
    subTitle: "CENFOTEC University | 2011 ~ 2018",
    list: [
    ],
  },
  {
    id: 2,
    title: "High School Bachelor's Degree",
    subTitle: "Kamuk School | 2011",
    list: [
    ],
  },
  {
    id: 3,
    title: "Certification: Cisco CCNA Switching & Routing",
    subTitle: "2013",
    list: [
    ],
  },
  {
    id: 4,
    title: "Certification: OWASP Web Developer Security",
    subTitle: "2019 | 2022 | 2023",
    list: [
    ],
  },
  {
    id: 5,
    title: "Certification: Certified SAFe® 5.0 practitioner",
    subTitle: "2020",
    list: [
    ],
  },
];

export default AboutSection;
