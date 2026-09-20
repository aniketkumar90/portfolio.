import React, { useState } from "react";

export function AddProject({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    stack: "",
    link: "",
    image: "",
    order: 1,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 1,
      featured: true,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Project Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="field w-full text-sm"
          placeholder="e.g. NextGen FinTech"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Live Website URL</label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          className="field w-full text-sm"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Screenshot Image URL / Path</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="field w-full text-sm"
          placeholder="/projects/sample.png"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Tech Stack (comma-separated)</label>
        <input
          name="stack"
          value={form.stack}
          onChange={handleChange}
          className="field w-full text-sm"
          placeholder="React.js, Tailwind CSS, Node.js"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Order Priority</label>
        <input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          className="field w-full text-sm"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:bg-white/10 transition cursor-pointer"
        >
          Cancel
        </button>
        <button type="submit" className="neo-btn text-xs py-2 px-5 cursor-pointer">
          Save Project
        </button>
      </div>
    </form>
  );
}

export default AddProject;
