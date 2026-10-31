import AppHead from "@/components/AppHead";

const levels = {
  SME: [
    "Angular + TypeScript",
    "Ionic",
    "RxJS",
    "HTML + JS + SCSS",
    "Parse Platform",
    "Back4App",
  ],
  Expert: [
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
  Advanced: [
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
  Basic: [
    "MongoDB",
    "Python",
    "Google Ads Manager",
    "Jenkins",
    "Travis",
    "Handlebars",
  ],
  Beginner: ["Supabase", "Oracle Commerce Platform", "Cheetahmail"],
};

export default function Technologies() {
  return (
    <>
      <AppHead title="Technologies - Christian Esquivel" />
      <main className="section max-w-4xl mx-auto">
        <h1 className="section-heading">Technologies</h1>
        {Object.entries(levels).map(([level, technologies]) => (
          <section className="mb-8" key={level}>
            <h2 className="text-xl font-medium">{level}</h2>
            <ul className="list-disc pl-6">
              {technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
