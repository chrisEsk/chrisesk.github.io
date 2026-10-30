import Image from "next/image";
import { useRouter } from "next/router";

import AppHead from "@/components/AppHead";
import { CONTACT_EMAIL } from "utils/site";

const roles = [
  ["Founder", "TheSlider", "November 2025 – Current", "Created and deployed a social media platform for documenting before-and-after transformations.", "/theslider_logo_transparent.png"],
  ["Sr Adv Web UI", "Globant", "December 2021 – May 2026", "Technical direction, application development, code reviews, task allocation, and troubleshooting.", "/logo_globant.png"],
  ["Senior Consultant", "Gorilla Logic", "September 2019 – November 2021", "Collaborated with diverse clients across e-commerce and community platforms under agile methodologies.", "/logo_gl.png"],
  ["Tech Lead and Fullstack Engineer", "El Artesano App", "2017 – 2018", "Co-developed one of Costa Rica’s early social networks and led a small development team.", "/logo_artesano.png"],
  ["Software Architect and PO", "Miguitas Bakery", "2016", "Delivered a 0-to-1 product and automated order-management processes.", "/logo_miguitas.png"],
  ["Fullstack Developer", "Treeseed", "2016 – 2017", "Developed and maintained the frontend and backend of a crowdfunding platform.", "/logo_treeseed.png"],
];

export default function Experience() {
  const router = useRouter();

  return <>
    <AppHead title="Experience - Christian Esquivel" />
    <main className="section max-w-4xl mx-auto">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 rounded-full border border-marrsgreen/40 px-4 py-2 text-sm font-medium text-marrsgreen shadow-sm transition hover:-translate-x-1 hover:bg-marrsgreen hover:text-white focus-visible:outline-2 dark:border-carrigreen/40 dark:text-carrigreen dark:hover:bg-carrigreen dark:hover:text-bgdark"
        >
          <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:-translate-x-1">←</span>
          Back
        </button>
      </div>
      <h1 className="section-heading block">Experience</h1>
      <p className="mb-8">Due to privacy and confidentiality, this page has been trimmed. <a className="link" href={`mailto:${CONTACT_EMAIL}`}>Contact me for my full CV.</a></p>
      <div className="relative border-l-2 border-marrsgreen/40 pl-6 dark:border-carrigreen/40">
        {roles.map(([role, company, period, description, image]) => <article className="relative mb-10 rounded-md border border-marrsgreen/20 bg-white/40 p-5 shadow-sm dark:border-carrigreen/20 dark:bg-white/5" key={`${role}-${company}`}>
          <span className="absolute -left-[2.05rem] top-6 h-4 w-4 rounded-full border-4 border-bglight bg-marrsgreen dark:border-bgdark dark:bg-carrigreen" aria-hidden="true" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-marrsgreen dark:text-carrigreen">{period}</p>
              <h2 className="text-xl font-medium">{role}</h2>
              <p className="font-medium">{company}</p>
            </div>
            {image && <Image src={image} width={220} height={90} alt={`${company} logo`} className="h-auto max-h-16 w-auto max-w-[220px] object-contain" />}
          </div>
          <p className="mt-4">{description}</p>
        </article>)}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-medium mb-4">Timeline</h2>
        <iframe title="Christian Esquivel professional experience timeline" className="w-full rounded-md" height="400" src="https://time.graphics/embed?v=1&id=899573" frameBorder="0" allowFullScreen />
      </section>

    </main>
  </>;
}
