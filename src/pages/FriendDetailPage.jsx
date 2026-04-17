import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTimeline } from '../context/TimelineContext';
import { useFriends } from '../context/FriendsContext';
import {
  BellSnoozeIcon,
  ArchiveBoxIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

function StatusBadge({ status }) {
  if (status === 'overdue') return <span className="status-overdue">Overdue</span>;
  if (status === 'almost due') return <span className="status-almost-due">Almost Due</span>;
  return <span className="status-on-track">On-Track</span>;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function FriendDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();

  const { friends, loading } = useFriends();
  const [friend, setFriend] = useState(null);
  const [goal, setGoal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  useEffect(() => {
    if (!loading) {
      const found = friends.find(f => String(f.id) === String(id));
      if (!found) { navigate('/404'); return; }
      setFriend(found);
      setGoal(found.goal);
      setGoalInput(found.goal);
    }
  }, [id, friends, loading]);

  const handleCheckin = (type) => {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} logged to timeline!`, {
      icon: type === 'Call' ? '📞' : type === 'Text' ? '💬' : '🎥',
      style: { borderRadius: '10px', background: '#1e4d3b', color: '#fff' },
    });
  };

  const handleGoalSave = () => {
    setGoal(parseInt(goalInput) || goal);
    setEditingGoal(false);
    toast.success('Goal updated!', {
      style: { borderRadius: '10px', background: '#1e4d3b', color: '#fff' },
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#1e4d3b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!friend) return null;

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          ← Back to Friends
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Friend Info */}
            <div className="flex flex-col items-center p-6 gap-3 border-b border-gray-100">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="text-center">
                <h2 className="font-bold text-lg text-gray-900">{friend.name}</h2>
                <div className="flex justify-center mt-1.5">
                  <StatusBadge status={friend.status} />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {friend.tags.map(tag => (
                  <span key={tag} className="tag-pill uppercase">{tag}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic text-center leading-relaxed">
                "{friend.bio}"
              </p>
              <p className="text-xs text-gray-400">
                Preferred: <span className="font-medium text-gray-600">{friend.email}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div>
              <button className="btn-action">
                <BellSnoozeIcon className="w-4 h-4 text-gray-500" />
                Snooze 2 Weeks
              </button>
              <button className="btn-action">
                <ArchiveBoxIcon className="w-4 h-4 text-gray-500" />
                Archive
              </button>
              <button className="btn-action !text-red-500 hover:!bg-red-50">
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-detail-card">
                <p className="text-3xl font-bold text-gray-900">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-500 mt-1">Days Since Contact</p>
              </div>
              <div className="stat-detail-card">
                <p className="text-3xl font-bold text-gray-900">{goal}</p>
                <p className="text-xs text-gray-500 mt-1">Goal (Days)</p>
              </div>
              <div className="stat-detail-card">
                <p className="text-lg font-bold text-gray-900">{formatDate(friend.next_due_date)}</p>
                <p className="text-xs text-gray-500 mt-1">Next Due</p>
              </div>
            </div>

            {/* Relationship Goal Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Relationship Goal</h3>
                <button
                  onClick={() => setEditingGoal(!editingGoal)}
                  className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <PencilSquareIcon className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
              {editingGoal ? (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">Connect every</span>
                  <input
                    type="number"
                    value={goalInput}
                    onChange={e => setGoalInput(e.target.value)}
                    className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1e4d3b]"
                    min="1"
                  />
                  <span className="text-sm text-gray-600">days</span>
                  <button
                    onClick={handleGoalSave}
                    className="bg-[#1e4d3b] text-white text-xs px-4 py-1.5 rounded-md hover:bg-[#163828] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingGoal(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Connect every <span className="font-bold text-gray-900">{goal} days</span>
                </p>
              )}
            </div>

            {/* Quick Check-In Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Check-In</h3>
              <div className="flex gap-3">
                <button className="checkin-btn" onClick={() => handleCheckin('Call')}>
                  <img src={callIcon} alt="Call" className="w-6 h-6 object-contain" />
                  Call
                </button>
                <button className="checkin-btn" onClick={() => handleCheckin('Text')}>
                  <img src={textIcon} alt="Text" className="w-6 h-6 object-contain" />
                  Text
                </button>
                <button className="checkin-btn" onClick={() => handleCheckin('Video')}>
                  <img src={videoIcon} alt="Video" className="w-6 h-6 object-contain" />
                  Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
