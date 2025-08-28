import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { EmotionType } from '../types';

const emotions: EmotionType[] = [
  { id: '1', emoji: '😊', label: 'Great', value: 5 },
  { id: '2', emoji: '🙂', label: 'Good', value: 4 },
  { id: '3', emoji: '😐', label: 'Okay', value: 3 },
  { id: '4', emoji: '😟', label: 'Not Great', value: 2 },
  { id: '5', emoji: '😰', label: 'Worried', value: 1 }
];

const EmotionSelector = () => {
  const { setShowEmotionSelector, setSelectedEmotion, user } = useAppContext();

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    setTimeout(() => {
      setShowEmotionSelector(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hello, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-lg text-gray-600 mb-8">How are you feeling today?</p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion)}
              className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 hover:scale-110 group"
            >
              <span className="text-4xl mb-2 group-hover:animate-bounce">{emotion.emoji}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {emotion.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          This helps us personalize your experience
        </p>
      </div>
    </div>
  );
};

export default EmotionSelector;