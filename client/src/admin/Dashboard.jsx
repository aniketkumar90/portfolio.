import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from './Projects/ProjectList';
import AddProject from './Projects/AddProject';
import EditProject from './Projects/EditProject';
import Button from '../components/common/Button';
import contactService from '../services/contactService';
import { Mail, FolderGit2, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Dashboard({ onClose }) {
  const { projects, loading, error, refreshProjects, removeProject } = useProjects();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await contactService.getMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.warn("Could not load contact messages:", err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const stats = [
    { label: 'Total Projects', value: projects.length, change: 'MongoDB', color: 'from-cyan-500/20 to-blue-500/10' },
    { label: 'Featured Projects', value: projects.filter(p => p.featured).length, change: 'Active', color: 'from-violet-500/20 to-purple-500/10' },
    { label: 'Database Cluster', value: 'Connected', change: 'MongoDB Atlas', color: 'from-emerald-500/20 to-teal-500/10' },
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
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {stat.value}
            </div>
            <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <FolderGit2 className="h-4 w-4" />
          Projects Registry ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition cursor-pointer ${
            activeTab === 'messages'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Mail className="h-4 w-4" />
          Contact Inquiries ({messages.length})
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <>
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live Project Registry (MongoDB)
                </h3>
                <p className="text-xs text-slate-400">
                  Data directly synchronized with MongoDB Atlas cluster
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => refreshProjects()}
                className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                title="Refresh database records"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
                className="text-xs !py-2 !px-4"
              >
                <span className="text-base mr-1">+</span> New Project
              </Button>
            </div>
          </div>

          {/* Project List */}
          <ProjectList
            projects={projects}
            loading={loading}
            error={error}
            onEdit={(project) => setEditingProject(project)}
            onDelete={async (id) => {
              if (window.confirm('Are you sure you want to delete this project from MongoDB?')) {
                await removeProject(id);
              }
            }}
            onAddNew={() => setShowAddModal(true)}
          />
        </>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Contact Messages & Inquiries
              </h3>
              <p className="text-xs text-slate-400">
                User messages submitted through portfolio contact form
              </p>
            </div>
            <button
              onClick={fetchMessages}
              className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh Messages
            </button>
          </div>

          {loadingMessages ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              Loading inquiries from MongoDB...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-white/10 bg-slate-900/20 text-slate-400 font-mono text-xs">
              No messages received yet. Submit a message in the Contact page to see it here!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-cyan-300">{msg.name}</span>
                    <span className="text-slate-400">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-purple-300 font-mono">
                    Email: <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a> | Subject: {msg.subject}
                  </div>
                  <p className="text-xs text-slate-200 bg-slate-950/60 p-3 rounded-lg border border-white/5 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
