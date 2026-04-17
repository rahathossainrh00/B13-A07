import { useState } from 'react';
import { useTimeline } from '../context/TimelineContext';
import { FunnelIcon } from '@heroicons/react/24/outline';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const TYPE_META = {
  Call: {
    icon: <img src={callIcon} alt="Call" className="w-5 h-5 object-contain" />,
    color: 'text-green-700 bg-green-50',
    dot: 'bg-green-500',
  },
  Text: {
    icon: <img src={textIcon} alt="Text" className="w-5 h-5 object-contain" />,
    color: 'text-blue-700 bg-blue-50',
    dot: 'bg-blue-500',
  },
  Video: {
    icon: <img src={videoIcon} alt="Video" className="w-5 h-5 object-contain" />,
    color: 'text-purple-700 bg-purple-50',
    dot: 'bg-purple-500',
  },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function TimelinePage() {
  const { timeline } = useTimeline();
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const filterOptions = ['All', 'Call', 'Text', 'Video'];

  const filtered = timeline
    .filter(entry => filter === 'All' || entry.type === filter)
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sortOrder === 'newest' ? db - da : da - db;
    });

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          {/* Type Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="appearance-none w-full sm:w-auto bg-white border border-gray-200 rounded-lg text-sm pl-3 pr-8 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] cursor-pointer"
            >
              <option value="All">Filter timeline</option>
              {filterOptions.slice(1).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <FunnelIcon className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="appearance-none w-full sm:w-auto bg-white border border-gray-200 rounded-lg text-sm px-3 pr-8 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Active type filter pills */}
          {filter !== 'All' && (
            <button
              onClick={() => setFilter('All')}
              className="inline-flex items-center gap-1 text-xs bg-[#1e4d3b] text-white px-3 py-1.5 rounded-full hover:bg-[#163828] transition-colors"
            >
              {filter} ✕
            </button>
          )}
        </div>

        {/* Timeline List */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm py-16 text-center text-gray-400 text-sm">
            No entries found for "{filter}". Try a different filter.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100">
            {filtered.map((entry) => {
              const meta = TYPE_META[entry.type] || TYPE_META.Text;
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Icon bubble */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                    {meta.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">{entry.type}</span>
                      <span className="text-gray-500"> with {entry.friendName}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                  </div>

                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
                </div>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Showing {filtered.length} interaction{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
