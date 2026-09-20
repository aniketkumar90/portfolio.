import React from "react";
import SectionTitle from "../components/common/SectionTitle";

export function Blogs() {
  const posts = [
    {
      title: "Architecting Resilient MERN Web Applications in 2026",
      summary:
        "Deep-dive into componentized design, clean RESTful services, and automated fallback caching patterns for high-throughput portfolios.",
      date: "Sep 2026",
      tag: "Architecture",
    },
    {
      title: "Interactive 3D Perspectives and Spring Physics in React",
      summary:
        "How to use Framer Motion useSpring and useMotionValue to create fluid, hardware-accelerated 3D parallax tilt interactions.",
      date: "Aug 2026",
      tag: "Frontend",
    },
  ];

  return (
    <div className="section-container pt-28 pb-16">
      <SectionTitle kicker="Articles & Insights" title="Technical Journal" />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-2xl border border-cyan-300/25 bg-slate-900/60 p-6 md:p-8 backdrop-blur hover:border-cyan-300/50 transition duration-300"
          >
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-3">
              <span>{post.tag}</span>
              <span>{post.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-rajdhani">{post.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
