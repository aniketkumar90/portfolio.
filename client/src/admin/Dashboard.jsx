import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from './Projects/ProjectList';
import AddProject from './Projects/AddProject';
import EditProject from './Projects/EditProject';
import Button from '../components/common/Button';

export default function Dashboard({ onClose }) {
  const { projects, loading, error, refreshProjects, removeProject } = useProjects();
  const [activeTab, setActiveTab] = useState('projects');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const stats = [
    { label: 'Total Projects', value: projects.length, change: '+100%', color: 'from-cyan-500/20 to-blue-500/10' },
    { label: 'Featured Projects', value: projects.filter(p => p.featured).length, change: 'Active', color: 'from-violet-500/20 to-purple-500/10' },
    { label: 'Database Status', value: 'Live', change: 'Online', color: 'from-emerald-500/20 to-teal-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Stat Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/10 backdrop-blur-md relative overflow-hidden`}
          >
            <div className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-1">
              {stat.label}
            </div>
            <div className="text-3xl font-black text-white tracking-tight">
              {stat.value}
            </div>
            <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Live Project Registry
            </h3>
            <p className="text-xs text-slate-400">
              Manage website portfolio entries, URLs, and technologies
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="text-xs !py-2 !px-4"
        >
          <span className="text-base mr-1">+</span> New Project
        </Button>
      </div>

      {/* Project List */}
      <ProjectList
        projects={projects}
        loading={loading}
        error={error}
        onEdit={(project) => setEditingProject(project)}
        onDelete={async (id) => {
          if (window.confirm('Are you sure you want to delete this project?')) {
            await removeProject(id);
          }
        }}
        onAddNew={() => setShowAddModal(true)}
      />

      {/* Add Project Modal */}
      <AddProject
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          refreshProjects();
        }}
      />

      {/* Edit Project Modal */}
      <EditProject
        isOpen={!!editingProject}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSuccess={() => {
          refreshProjects();
        }}
      />
    </div>
  );
}
