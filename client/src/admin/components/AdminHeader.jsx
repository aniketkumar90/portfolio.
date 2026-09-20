import React from 'react';

export function AdminHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export default AdminHeader;
