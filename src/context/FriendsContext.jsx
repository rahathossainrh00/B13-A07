import { createContext, useContext, useState, useEffect } from 'react';

const FriendsContext = createContext();

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setFriends(data);
          setLoading(false);
        }, 800);
      })
      .catch(() => setLoading(false));
  }, []);

  const addFriend = (newFriend) => {
    const id = Date.now();
    const friend = {
      ...newFriend,
      id,
      days_since_contact: 0,
      status: 'on-track',
      next_due_date: (() => {
        const d = new Date();
        d.setDate(d.getDate() + parseInt(newFriend.goal || 14));
        return d.toISOString().split('T')[0];
      })(),
    };
    setFriends(prev => [friend, ...prev]);
    return friend;
  };

  return (
    <FriendsContext.Provider value={{ friends, loading, addFriend }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  return useContext(FriendsContext);
}
