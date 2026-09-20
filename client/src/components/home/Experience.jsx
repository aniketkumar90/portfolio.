import React from "react";
import { experience } from "../../data/profile";
import SectionTitle from "../common/SectionTitle";

export function Experience() {
  const [featured, ...otherItems] = experience;

  return (
    <section id="experience" className="section-wrap">
      <SectionTitle kicker="Career Path" title="Experience Timeline" />

      <div className="mx-auto mt-6 md:mt-8 grid max-w-4xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        {featured ? (
          <article
            className="rounded-[1.8rem] border border-fuchsia-300/35 p-7 md:p-10"
            style={{
              background:
                "linear-gradient(155deg, rgba(105, 35, 159, 0.78), rgba(150, 23, 104, 0.68), rgba(111, 11, 74, 0.74))",
              boxShadow:
                "0 25px 60px rgba(79, 7, 61, 0.38), inset 0 1px 0 rgba(255, 210, 242, 0.25)",
            }}
          >
            <div className="mb-8 flex flex-col gap-2">
              <span className="h-12 w-12 rounded-full bg-white" />
              <span className="h-10 w-20 rounded-full bg-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">{featured.title}</h3>
            <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white">
              {featured.org} <span className="text-yellow-300">•</span> {featured.period}
            </p>
            <div className="mt-7 space-y-2 text-pink-50">
              {featured.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </article>
        ) : null}

        <div className="space-y-8">
          <div className="grid w-fit grid-cols-6 gap-2">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${i % 5 === 0 ? "bg-pink-400/40" : "bg-pink-500"}`}
              />
            ))}
          </div>

          {otherItems.map((item) => (
            <article key={item.title + item.org}>
              <h3 className="text-3xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white">
                {item.org} <span className="text-yellow-300">•</span> {item.period}
              </p>
              <div className="mt-7 space-y-2 text-pink-100/90">
                {item.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
