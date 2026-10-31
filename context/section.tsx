import React, { createContext, useContext, useEffect, useState } from "react";

interface SectionInitialType {
  currentSection: string;
  onSectionChange?: (val: string) => void;
}

export const sectionContext = createContext<SectionInitialType>({
  currentSection: "welcome",
});

export const ProvideSection = ({ children }: { children: React.ReactNode }) => {
  const value = useProvideSection();
  return (
    <sectionContext.Provider value={value}>{children}</sectionContext.Provider>
  );
};

export const useSection = () => useContext(sectionContext);

const useProvideSection = () => {
  const [currentSection, setCurrentSection] = useState("welcome");

  useEffect(() => {
    const sections = [
      { id: "whoami", name: "who am i?" },
      { id: "ai-expertise", name: "ai expertise" },
      { id: "expertise", name: "expertise" },
      { id: "projects", name: "projects" },
      { id: "blog", name: "blog" },
      { id: "contact", name: "contact" },
    ];

    const updateCurrentSection = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        setCurrentSection("contact");
        return;
      }

      const position = window.scrollY + 96;
      let activeSection = "welcome";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        const top = element
          ? element.getBoundingClientRect().top + window.scrollY
          : Infinity;
        if (position >= top) {
          activeSection = section.name;
        }
      }

      setCurrentSection(activeSection);
    };

    updateCurrentSection();
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    window.addEventListener("resize", updateCurrentSection);

    return () => {
      window.removeEventListener("scroll", updateCurrentSection);
      window.removeEventListener("resize", updateCurrentSection);
    };
  }, []);

  const onSectionChange = (val: string) => {
    setCurrentSection(val);
  };

  return {
    currentSection,
    onSectionChange,
  };
};
