import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import Image from "next/image";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import { projects as projectMetadata } from "utils/projects";


const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [onSectionChange, projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color="#387BF8"
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        A selection of projects I have built and maintained.
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/chrisEsk"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          my GitHub profile
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "TheSlider",
    type: "Product",
    image: (
      <Image
        src="/logo_theslider.png"
        alt="TheSlider logo"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    ),
    desc: "A social media platform for documenting before-and-after transformations, created and deployed by Christian Esquivel.",
    tags: projectMetadata[0].tags,
    liveUrl: "https://theslider.app/",
    bgColor: "bg-[#A6CECE]",
  },
  {
    title: "Adventure Time 8-bit",
    type: "Game",
    image: (
      <Image
        src="/adventure_time_8bit.png"
        alt="Adventure Time 8-bit game"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    ),
    desc: "An 8-bit game created as a university design patterns project in 2013.",
    tags: projectMetadata[1].tags,
    liveUrl: "https://www.newgrounds.com/portal/view/617935",
    codeUrl: "https://github.com/chrisEsk/dcce",
    bgColor: "bg-[#B4BEE0]",
  },
];

export default ProjectSection;
