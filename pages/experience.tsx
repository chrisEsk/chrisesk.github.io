import AppHead from "@/components/AppHead";

const roles = [
  ["Founder", "TheSlider", "November 2025 – Current", "Created and deployed a social media platform for documenting before-and-after transformations."],
  ["Sr Adv Web UI", "Globant", "December 2021 – Current", "Technical direction, application development, code reviews, task allocation, and troubleshooting."],
  ["Senior Consultant", "Gorilla Logic", "September 2019 – November 2021", "Collaborated with diverse clients across e-commerce and community platforms under agile methodologies."],
  ["Tech Lead and Fullstack Engineer", "El Artesano App", "2017 – 2018", "Co-developed one of Costa Rica’s early social networks and led a small development team."],
  ["Software Architect and PO", "Miguitas Bakery", "2016", "Delivered a 0-to-1 product and automated order-management processes."],
  ["Fullstack Developer", "Treeseed", "2016 – 2017", "Developed and maintained the frontend and backend of a crowdfunding platform."],
];

export default function Experience() {
  return <><AppHead title="Experience - Christian Esquivel" /><main className="section max-w-4xl mx-auto"><h1 className="section-heading">Experience</h1><p className="mb-8">Due to privacy and confidentiality, this page has been trimmed. Contact me for my full CV.</p>{roles.map(([role, company, period, description]) => <article className="mb-8" key={`${role}-${company}`}><h2 className="text-xl font-medium">{role}, {company}</h2><p className="italic">Costa Rica — {period}</p><p>{description}</p></article>)}</main></>;
}
