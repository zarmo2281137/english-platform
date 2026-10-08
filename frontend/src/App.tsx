import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { SpeakingRoom } from './components/SpeakingRoom';
import { PlacementTest } from './components/PlacementTest';
import { MistakesPractice } from './components/MistakesPractice';

export const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'speaking' | 'placement' | 'mistakes'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="bg-slate-900 p-4 border-b border-slate-800 flex gap-6 text-sm font-semibold">
        <button onClick={() => setView('dashboard')} className={`hover:text-indigo-400 ${view === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
          Dashboard
        </button>
        <button onClick={() => setView('speaking')} className={`hover:text-indigo-400 ${view === 'speaking' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
          AI Speaking Tutor
        </button>
        <button onClick={() => setView('placement')} className={`hover:text-indigo-400 ${view === 'placement' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
          Placement Test
        </button>
        <button onClick={() => setView('mistakes')} className={`hover:text-indigo-400 ${view === 'mistakes' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
          My Mistakes
        </button>
      </nav>

      {view === 'dashboard' && <Dashboard onNavigate={setView} />}
      {view === 'speaking' && <SpeakingRoom />}
      {view === 'placement' && <PlacementTest />}
      {view === 'mistakes' && <MistakesPractice />}
    </div>
  );
};

export default App;