import React from "react";
import { Edit2, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";

export function ProjectList({ projects, onEdit, onDelete, onAddNew }) {
  const resolveImage = (p) => {
    if (p?.image) return p.image;
    const title = (p?.title || "").toLowerCase();
    if (title.includes("jewel") || title.includes("shiv")) return "/projects/new-shiv-jewellers.png";
    if (title.includes("real") || title.includes("estate")) return "/projects/real-estate.png";
    if (title.includes("relay") || title.includes("mart") || title.includes("commerce")) return "/projects/relaymart.png";
    return p?.heroImage || p?.images?.[0] || "/projects/new-shiv-jewellers.png";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-white font-rajdhani">All Projects ({projects.length})</h4>
        <button
          onClick={onAddNew}
          className="neo-btn text-xs py-2 px-4 rounded-lg cursor-pointer"
        >
          + Add New Project
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950/80 text-cyan-300 border-b border-white/10">
            <tr>
              <th className="p-3">Preview</th>
              <th className="p-3">Order</th>
              <th className="p-3">Title</th>
              <th className="p-3">Stack</th>
              <th className="p-3">Link</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {projects.map((p, index) => {
              const imgUrl = resolveImage(p);
              return (
                <tr key={p._id || p.title} className="hover:bg-white/5 transition">
                  <td className="p-3">
                    <div className="h-10 w-16 rounded overflow-hidden border border-white/15 bg-slate-950 flex items-center justify-center">
                      {imgUrl ? (
                        <img src={imgUrl} alt={p.title} className="w-full h-full object-cover object-top" />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-neutral-400">{p.order || index + 1}</td>
                  <td className="p-3 font-semibold text-white">{p.title}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {p.stack?.slice(0, 3).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 hover:underline inline-flex items-center gap-1"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(p)}
                        className="p-1.5 rounded hover:bg-white/10 text-cyan-300 transition cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(p._id || p.id)}
                        className="p-1.5 rounded hover:bg-white/10 text-rose-400 transition cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectList;
