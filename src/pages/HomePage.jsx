import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useFriends } from '../context/FriendsContext';
import AddFriendModal from '../components/AddFriendModal';

function StatusBadge({ status }) {
  if (status === 'overdue') return <span className="status-overdue">Overdue</span>;
  if (status === 'almost due') return <span className="status-almost-due">Almost Due</span>;
  return <span className="status-on-track">On-Track</span>;
}

function FriendCard({ friend }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white border border-gray-100/80 shadow-sm rounded-xl p-8 flex flex-col items-center cursor-pointer hover:shadow-md transition-all duration-300"
    >
      <img
        src={friend.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1e4d3b&color=fff&size=80`}
        alt={friend.name}
        className="w-[72px] h-[72px] rounded-full object-cover mb-4 shadow-sm"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1e4d3b&color=fff&size=80`;
        }}
      />
      <h3 className="font-bold text-gray-900 text-[15px] mb-1">{friend.name}</h3>
      <p className="text-[11px] font-medium text-gray-400 mb-4">
        {friend.days_since_contact === 0 ? 'Just added' : `${friend.days_since_contact}d ago`}
      </p>

      {friend.tags && friend.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {friend.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag-pill uppercase">{tag}</span>
          ))}
        </div>
      )}

      <StatusBadge status={friend.status} />
    </div>
  );
}

export default function HomePage() {
  const { friends, loading, addFriend } = useFriends();
  const [modalOpen, setModalOpen] = useState(false);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status !== 'on-track').length;
  const interactionsThisMonth = 12;

  return (
    <div className="flex-1">
      {/* Add Friend Modal */}
      <AddFriendModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addFriend}
      />

      {/* Banner */}
      <section className="bg-white border-b border-gray-100 py-14 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button
          id="add-friend-btn"
          onClick={() => setModalOpen(true)}
          className="mt-6 inline-flex items-center gap-2 bg-[#1e4d3b] hover:bg-[#163828] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <PlusIcon className="w-4 h-4" />
          Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Total Friends', value: totalFriends },
            { label: 'On Track', value: onTrack },
            { label: 'Need Attention', value: needAttention },
            { label: 'Interactions This Month', value: interactionsThisMonth },
          ].map(card => (
            <div key={card.label} className="bg-white border border-gray-200 rounded-xl py-5 px-4 shadow-sm">
              <p className="text-3xl font-bold text-gray-900">{loading ? '–' : card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Your Friends
            {!loading && <span className="ml-2 text-sm font-normal text-gray-400">({totalFriends})</span>}
          </h2>

        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#1e4d3b] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading your connections...</p>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-gray-500 font-medium">No friends yet!</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add a Friend" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
