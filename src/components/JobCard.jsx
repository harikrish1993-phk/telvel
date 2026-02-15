import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TYPE_LABELS = { 'full-time': 'Full-Time', contract: 'Contract', 'part-time': 'Part-Time' };
const TYPE_COLORS = { 'full-time': 'bg-accent-100 text-accent-700', contract: 'bg-amber-100 text-amber-700', 'part-time': 'bg-purple-100 text-purple-700' };

export default function JobCard({ job, index = 0, showApply = false, onApply }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white border border-navy-100 rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all group"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h3 className="text-lg font-display font-bold text-navy-900 group-hover:text-accent transition-colors">
          {job.title}
        </h3>
        <span className={`badge ${TYPE_COLORS[job.type] || 'bg-gray-100 text-gray-600'}`}>
          {TYPE_LABELS[job.type] || job.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-navy-500 mb-4">
        <span className="flex items-center gap-1">📍 {job.location}</span>
        {job.experience && <span className="flex items-center gap-1">💼 {job.experience}</span>}
      </div>

      <p className="text-navy-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {job.skills.slice(0, 5).map((s) => (
            <span key={s} className="badge bg-navy-50 text-navy-600">{s}</span>
          ))}
          {job.skills.length > 5 && (
            <span className="badge bg-navy-50 text-navy-400">+{job.skills.length - 5}</span>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {showApply && (
          <button onClick={() => onApply?.(job)} className="btn btn-primary text-sm py-2">
            Apply Now
          </button>
        )}
        <Link to="/contact" className="btn btn-ghost text-sm py-2">
          Inquire
        </Link>
      </div>
    </motion.div>
  );
}
