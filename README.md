# 👥 KeenKeeper — Keep Your Friendships Alive

**KeenKeeper** is a specialized Personal Relationship Management (PRM) application designed to prevent "friendship fade." It helps users maintain meaningful connections through goal-setting, automated status tracking, and interaction logging.

## 🛠️ Technical Stack
- **Framework:** React.js / Vite
- **Styling:** Tailwind CSS & DaisyUI
- **Navigation:** React Router DOM
- **Charts:** Recharts (Data Visualization)
- **Notifications:** React Hot Toast
- **Data Persistence:** LocalStorage & JSON

## ✨ Key Features

### 1. Smart Dashboard & Navigation
- **Responsive Layout:** Includes a responsive navigation bar, active state highlighting, and smooth transitions.
- **Dynamic Friend Grid:** A beautifully styled grid layout viewing all friend cards with real-time status indicators (**Overdue**, **Almost Due**, **On-Track**).
- **KPI Analytics Banner:** A centered hero metrics section providing quick summary insights into your relationships.

### 2. Interaction Management
- **Detailed Profiles:** A structured layout featuring friend bios, relationship tags, and contact frequency stats.
- **Quick Check-In Actions:** Functional "Call", "Text", and "Video Check-In" buttons that automatically:
  - Add fresh entries to your global timeline.
  - Trigger instant Toast notifications for immediate feedback.

### 3. Friendship History (Timeline)
- A chronological tracking feed of all past interactions.
- Each entry displays the specific date, interaction type, category-specific icons, and the friend's name.

### 4. Advanced Statistics & UX
- **Analytics Dashboard:** A dedicated Stats page featuring **Recharts** visualizing your communication distributions.
- **Timeline Filtering:** Sort and view your interaction history by specific activity types.
- **Graceful Fallbacks:** Custom 404 pages and proper loading states for fetching data.

## 💻 Getting Started

To run KeenKeeper locally on your machine, follow these steps:

1. Open your terminal in the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure
```text
├── public/
│   └── friends.json      # Base mock data profiles
├── src/
│   ├── components/       # Reusable UI (Navbar, Footer, FriendCard, StatsCard)
│   ├── pages/            # Core Views (Home, Detail, Timeline, Stats, NotFound)
│   ├── context/          # Global State Management
│   ├── App.jsx           # Routing logic & structure
│   └── index.css         # Tailwind & custom CSS
└── README.md
```

