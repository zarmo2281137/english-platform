import React from 'react';

interface Props {
  onNavigate: (view: 'dashboard' | 'speaking' | 'placement' | 'mistakes') => void;
}

export const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Ready to Practice Speaking?</h1>
            <p className="text-slate-400 text-sm">Current Level: B2 Upper-Intermediate</p>
          </div>
          <button
            onClick={() => onNavigate('speaking')}
            className="bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg"
          >
            🎤 START SPEAKING
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">Speaking Score</p>
            <p className="text-2xl font-bold text-green-400 mt-1">78%</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">Streak</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">7 Days 🔥</p>
          </div>
          <div
            onClick={() => onNavigate('mistakes')}
            className="bg-slate-900 p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition"
          >
            <p className="text-xs text-slate-400">Unresolved Mistakes</p>
            <p className="text-2xl font-bold text-red-400 mt-1">12 Questions</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="font-bold">Not sure about your level?</h3>
            <p className="text-xs text-slate-400">Take our CEFR Placement Test to get a personalized plan.</p>
          </div>
          <button
            onClick={() => onNavigate('placement')}
            className="bg-slate-800 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 border border-slate-700 transition"
          >
            Take Placement Test
          </button>
        </div>
      </div>
    </div>
  );
};