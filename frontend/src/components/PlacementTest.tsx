import React, { useState } from 'react';

interface Question {
  id: number;
  level: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  { id: 1, level: 'A1', question: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correctAnswer: 1 },
  { id: 2, level: 'A2', question: "Yesterday, I ___ a great movie.", options: ["see", "saw", "have seen", "seeing"], correctAnswer: 1 },
  { id: 3, level: 'B1', question: "If I ___ more time, I would learn Spanish.", options: ["have", "had", "would have", "will have"], correctAnswer: 1 },
  { id: 4, level: 'B2', question: "Had I known about the weather, I ___ an umbrella.", options: ["would bring", "will bring", "would have brought", "brought"], correctAnswer: 2 },
  { id: 5, level: 'C1', question: "Seldom ___ such a breathtaking performance.", options: ["I have seen", "have I seen", "I saw", "saw I"], correctAnswer: 1 }
];

export const PlacementTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto mt-12 bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-indigo-400">Placement Test Complete!</h2>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Estimated CEFR Level</p>
          <p className="text-5xl font-black text-green-400 mt-2">B2</p>
          <p className="text-xs text-slate-400 mt-2">Upper-Intermediate</p>
        </div>
        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl transition">
          Start Personalized Learning Path
        </button>
      </div>
    );
  }

  const currentQ = mockQuestions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span>Question {currentIndex + 1} of {mockQuestions.length}</span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-indigo-400">{currentQ.level}</span>
      </div>

      <h3 className="text-lg font-bold text-white">{currentQ.question}</h3>

      <div className="space-y-3">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(idx)}
            className={`w-full p-4 rounded-xl text-left text-sm font-semibold border transition ${
              selectedAnswers[currentIndex] === idx
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswers[currentIndex] === undefined}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 font-bold rounded-xl transition"
      >
        {currentIndex === mockQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
      </button>
    </div>
  );
};