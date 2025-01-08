import { create } from 'zustand';
import { Subject, QuizAttempt } from '../types';

interface QuizState {
  subjects: Subject[];
  attempts: QuizAttempt[];
  addAttempt: (attempt: QuizAttempt) => void;
}

const mockSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    questions: [
      {
        id: 'math-1',
        text: 'What is the value of π (pi) to two decimal places?',
        options: ['3.14', '3.16', '3.12', '3.18'],
        correctAnswer: 0
      },
      {
        id: 'math-2',
        text: 'Solve for x: 2x + 5 = 13',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 3'],
        correctAnswer: 0
      },
      {
        id: 'math-3',
        text: 'What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        correctAnswer: 1
      },
      {
        id: 'math-4',
        text: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        correctAnswer: 1
      },
      {
        id: 'math-5',
        text: 'What is the area of a rectangle with length 8 units and width 5 units?',
        options: ['35 sq units', '40 sq units', '45 sq units', '50 sq units'],
        correctAnswer: 1
      },
      {
        id: 'math-6',
        text: 'What is the next number in the sequence: 2, 4, 8, 16, ...',
        options: ['24', '32', '30', '28'],
        correctAnswer: 1
      },
      {
        id: 'math-7',
        text: 'If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?',
        options: ['Right', 'Scalene', 'Equilateral', 'Isosceles'],
        correctAnswer: 2
      },
      {
        id: 'math-8',
        text: 'What is the sum of angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 1
      },
      {
        id: 'math-9',
        text: 'Simplify: (3 × 4) + (2 × 5)',
        options: ['22', '24', '26', '28'],
        correctAnswer: 0
      },
      {
        id: 'math-10',
        text: 'Convert 0.75 to a fraction in its simplest form.',
        options: ['3/4', '7/5', '2/3', '4/5'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    questions: [
      {
        id: 'science-1',
        text: 'What is the chemical symbol for gold?',
        options: ['Go', 'Ag', 'Au', 'Ge'],
        correctAnswer: 2
      },
      {
        id: 'science-2',
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1
      },
      {
        id: 'science-3',
        text: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 3
      },
      {
        id: 'science-4',
        text: 'What is the process by which plants make their own food?',
        options: ['Photosynthesis', 'Respiration', 'Digestion', 'Absorption'],
        correctAnswer: 0
      },
      {
        id: 'science-5',
        text: 'What is the atomic number of oxygen?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2
      },
      {
        id: 'science-6',
        text: 'Which of these is not a state of matter?',
        options: ['Solid', 'Liquid', 'Energy', 'Gas'],
        correctAnswer: 2
      },
      {
        id: 'science-7',
        text: 'What is the speed of light in vacuum?',
        options: ['299,792 km/s', '299,792 m/s', '299,792,458 m/s', '299,792,458 km/s'],
        correctAnswer: 2
      },
      {
        id: 'science-8',
        text: 'Which blood type is known as the universal donor?',
        options: ['A+', 'B+', 'AB+', 'O-'],
        correctAnswer: 3
      },
      {
        id: 'science-9',
        text: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        correctAnswer: 2
      },
      {
        id: 'science-10',
        text: 'What is the closest star to Earth?',
        options: ['Proxima Centauri', 'Alpha Centauri', 'The Sun', 'Sirius'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'history',
    name: 'History',
    questions: [
      {
        id: 'history-1',
        text: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2
      },
      {
        id: 'history-2',
        text: 'Who was the first President of the United States?',
        options: ['John Adams', 'Thomas Jefferson', 'Benjamin Franklin', 'George Washington'],
        correctAnswer: 3
      },
      {
        id: 'history-3',
        text: 'Which empire was ruled by Julius Caesar?',
        options: ['Greek', 'Roman', 'Persian', 'Ottoman'],
        correctAnswer: 1
      },
      {
        id: 'history-4',
        text: 'When did the Industrial Revolution begin?',
        options: ['Late 1700s', 'Early 1800s', 'Mid 1800s', 'Late 1800s'],
        correctAnswer: 0
      },
      {
        id: 'history-5',
        text: 'Who painted the Mona Lisa?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        correctAnswer: 1
      },
      {
        id: 'history-6',
        text: 'Which civilization built the pyramids of Giza?',
        options: ['Mayans', 'Romans', 'Greeks', 'Egyptians'],
        correctAnswer: 3
      },
      {
        id: 'history-7',
        text: 'When did the Berlin Wall fall?',
        options: ['1987', '1988', '1989', '1990'],
        correctAnswer: 2
      },
      {
        id: 'history-8',
        text: 'Who was the first woman to win a Nobel Prize?',
        options: ['Mother Teresa', 'Marie Curie', 'Jane Addams', 'Pearl Buck'],
        correctAnswer: 1
      },
      {
        id: 'history-9',
        text: 'Which country was the first to reach the South Pole?',
        options: ['United States', 'Russia', 'Norway', 'United Kingdom'],
        correctAnswer: 2
      },
      {
        id: 'history-10',
        text: 'In which year did the Titanic sink?',
        options: ['1910', '1911', '1912', '1913'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    questions: [
      {
        id: 'english-1',
        text: 'Which of these is a synonym for "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        correctAnswer: 1
      },
      {
        id: 'english-2',
        text: 'What is the past tense of "write"?',
        options: ['Wrote', 'Written', 'Writed', 'Writing'],
        correctAnswer: 0
      },
      {
        id: 'english-3',
        text: 'Which word is an antonym of "brave"?',
        options: ['Bold', 'Fearless', 'Cowardly', 'Strong'],
        correctAnswer: 2
      },
      {
        id: 'english-4',
        text: 'What type of word is "quickly"?',
        options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
        correctAnswer: 3
      },
      {
        id: 'english-5',
        text: 'Which sentence is grammatically correct?',
        options: [
          'Their going to the store',
          "They're going to the store",
          'There going to the store',
          'Theyre going to the store'
        ],
        correctAnswer: 1
      },
      {
        id: 'english-6',
        text: 'What is the plural of "child"?',
        options: ['Childs', 'Childes', 'Children', 'Childred'],
        correctAnswer: 2
      },
      {
        id: 'english-7',
        text: 'Which word means "to make something better"?',
        options: ['Improve', 'Approve', 'Remove', 'Disprove'],
        correctAnswer: 0
      },
      {
        id: 'english-8',
        text: 'What is the main verb in "She is singing"?',
        options: ['She', 'Is', 'Singing', 'Is singing'],
        correctAnswer: 2
      },
      {
        id: 'english-9',
        text: 'Which punctuation mark ends an exclamatory sentence?',
        options: ['.', '?', '!', ','],
        correctAnswer: 2
      },
      {
        id: 'english-10',
        text: 'What is a group of words that makes complete sense called?',
        options: ['Phrase', 'Clause', 'Sentence', 'Word'],
        correctAnswer: 2
      }
    ]
  }
];

export const useQuizStore = create<QuizState>((set) => ({
  subjects: mockSubjects,
  attempts: [],
  addAttempt: (attempt) =>
    set((state) => ({ attempts: [...state.attempts, attempt] }))
}));