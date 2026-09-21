import React, { useState, useEffect } from "react";
import projectService from "../../services/projectService";

export function EditProject({ isOpen, project, onClose, onSuccess, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    stack: "",
    link: "",
    image: "",
    order: 1,
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        summary: project.summary || "",
        stack: Array.isArray(project.stack) ? project.stack.join(", ") : project.stack || "",
        link: project.link || project.websiteUrl || "",
        image: project.image || "",
        order: project.order || 1,
      });
    }
  }, [project]);

  if (isOpen !== undefined && !isOpen) return null;
  if (!project) return null;

  const handleClose = () => {
    if (onClose) onClose();
    if (onCancel) onCancel();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      ...project,
      ...form,
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 1,
    };

    const targetId = project._id || project.id;

    try {
      if (onSave) {
        await onSave(payload);
      } else {
        await projectService.updateProject(targetId, payload);
      }
      if (onSuccess) onSuccess();
      handleClose();
    } catch (err) {
      console.error("Failed to update project:", err);
      setErrorMsg(err.response?.data?.message || err.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 text-xs bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Project Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="field w-full text-sm bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Live Website URL</label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          className="field w-full text-sm bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Screenshot Image URL / Path</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="field w-full text-sm bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Tech Stack (comma-separated)</label>
        <input
          name="stack"
          value={form.stack}
          onChange={handleChange}
          className="field w-full text-sm bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-cyan-300 mb-1">Order Priority</label>
        <input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          className="field w-full text-sm bg-slate-900 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-400 outline-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleClose}
          disabled={saving}
          className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:bg-white/10 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="neo-btn text-xs py-2 px-5 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-bold"
        >
          {saving ? "Updating in MongoDB..." : "Update Project"}
        </button>
      </div>
    </form>
  );

  if (isOpen !== undefined) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="w-full max-w-lg p-6 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
              Edit Project (MongoDB)
            </h3>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white text-lg font-mono p-1"
            >
              ✕
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return formContent;
}

export default EditProject;
