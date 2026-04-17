import { useState, useEffect, useRef } from 'react';
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const DEFAULT_TAGS = ['college', 'work', 'family', 'close friend', 'hobby', 'travel', 'gym', 'childhood', 'mentor', 'neighbor'];

export default function AddFriendModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    picture: '',
    bio: '',
    goal: 14,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [previewError, setPreviewError] = useState(false);
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const toggleTag = (tag) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  const addCustomTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required!', { style: { borderRadius: '10px' } });
      return;
    }
    onAdd({ ...form, goal: parseInt(form.goal) || 14 });
    toast.success(`${form.name} added to your connections! 🎉`, {
      style: { borderRadius: '10px', background: '#1e4d3b', color: '#fff' },
    });
    // Reset
    setForm({ name: '', email: '', picture: '', bio: '', goal: 14, tags: [] });
    setPreviewError(false);
    onClose();
  };

  if (!isOpen) return null;

  const avatarSrc = form.picture && !previewError
    ? form.picture
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'Friend')}&background=1e4d3b&color=fff&size=80`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add a Friend</h2>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details to add a new connection</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Avatar Preview */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={avatarSrc}
                alt="Preview"
                onError={() => setPreviewError(true)}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#1e4d3b]/20"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#1e4d3b] rounded-full flex items-center justify-center">
                <CameraIcon className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-400">Paste a photo URL below for preview</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Chen"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. sarah@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent transition-all"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="url"
              name="picture"
              value={form.picture}
              onChange={(e) => { setPreviewError(false); handleChange(e); }}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="How did you meet? What do you love about them?"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Contact Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Goal (days)
            </label>
            <input
              type="number"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              min="1"
              max="365"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">How often do you want to stay in touch?</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {DEFAULT_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium capitalize ${
                    form.tags.includes(tag)
                      ? 'bg-[#1e4d3b] text-white border-[#1e4d3b]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#1e4d3b] hover:text-[#1e4d3b]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Custom tag input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }}
                placeholder="Add custom tag..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e4d3b] focus:border-transparent"
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors font-medium"
              >
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-[#1e4d3b]/10 text-[#1e4d3b] px-2.5 py-1 rounded-full font-medium">
                    {tag}
                    <button type="button" onClick={() => toggleTag(tag)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg bg-[#1e4d3b] hover:bg-[#163828] text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}
