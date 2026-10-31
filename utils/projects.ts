export type ProjectTag = {
  title: string;
  tags: string[];
  url: string;
  description: string;
  image: string;
};

// Keep project taxonomy available to pages that are rendered outside the home page.
export const projects: ProjectTag[] = [
  {
    title: "TheSlider",
    tags: ["Product Development", "Web Platform"],
    url: "https://theslider.app/",
    description:
      "A social media platform for documenting before-and-after transformations, created and deployed by Christian Esquivel.",
    image: "/logo_theslider.png",
  },
  {
    title: "Adventure Time 8-bit",
    tags: ["ActionScript", "Design Patterns", "8-bit"],
    url: "https://www.newgrounds.com/portal/view/617935",
    description:
      "An 8-bit game created as a university design patterns project in 2013.",
    image: "/adventure_time_8bit.png",
  },
];

export const getProjectTags = () =>
  Array.from(new Set(projects.flatMap((project) => project.tags)));
