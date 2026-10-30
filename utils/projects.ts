export type ProjectTag = {
  title: string;
  tags: string[];
};

// Keep project taxonomy available to pages that are rendered outside the home page.
export const projects: ProjectTag[] = [
  { title: "TheSlider", tags: ["Product Development", "Web Platform"] },
  { title: "Adventure Time 8-bit", tags: ["ActionScript", "Design Patterns", "8-bit"] },
];

export const getProjectTags = () =>
  Array.from(new Set(projects.flatMap((project) => project.tags)));
