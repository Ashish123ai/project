export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  name: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Subject {
  id: string;
  name: string;
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  subjectId: string;
  score: number;
  completedAt: Date;
  timeSpent: number;
}