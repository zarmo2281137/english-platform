import React from 'react';

export const MistakesPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
      <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-red-400">My Mistakes Practice</h2>
          <p className="text-xs text-slate-400">Review questions you previously answered incorrectly</p>
        </div>
        <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-800 text-xs font-bold rounded-full">
          12 Active Mistakes
        </span>
      </header>

      <div className="space-y-4">
        <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
          <span className="text-xs font-bold text-amber-400">Topic: Conditionals (B2)</span>
          <p className="text-sm font-medium">Had I known about the event, I ___ attended.</p>
          <div className="text-xs text-slate-400 space-y-1">
            <p>Your previous answer: <span className="text-red-400 line-through">would attend</span></p>
            <p>Correct answer: <span className="text-green-400 font-bold">would have</span></p>
          </div>
          <button className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg">
            Re-test This Question
          </button>
        </div>
      </div>
    </div>
  );
};