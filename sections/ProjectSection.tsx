import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";


const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

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
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
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
      <div className="h-full flex items-center justify-center bg-[#A6CECE] text-3xl font-semibold text-[#123b3b]">TheSlider</div>
    ),
    desc: "A social media platform for documenting before-and-after transformations, created and deployed by Christian Esquivel.",
    tags: ["Product Development", "Web Platform"],
    liveUrl: "https://theslider.app/",
    codeUrl: "https://github.com/chrisEsk",
    bgColor: "bg-[#A6CECE]",
    githubApi: "https://api.github.com/repos/chrisEsk/chrisEsk.github.io",
  },
  {
    title: "Adventure Time 8-bit",
    type: "Game",
    image: (
      <div className="h-full flex items-center justify-center bg-[#B4BEE0] text-3xl font-semibold text-[#202b52]">Adventure Time 8-bit</div>
    ),
    desc: "An 8-bit game created as a university design patterns project. More details and a refreshed presentation are coming soon.",
    tags: ["ActionScript", "Design Patterns", "8-bit"],
    liveUrl: "https://www.newgrounds.com/portal/view/617935",
    codeUrl: "https://github.com/chrisEsk/dcce",
    bgColor: "bg-[#B4BEE0]",
    githubApi: "https://api.github.com/repos/chrisEsk/dcce",
  },
];

export default ProjectSection;
