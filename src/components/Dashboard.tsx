import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, LogOut, Plus, Edit, List, Phone, Info, Mail, Trophy } from 'lucide-react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { subjects, attempts } = useQuizStore((state) => ({
    subjects: state.subjects,
    attempts: state.attempts
  }));
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    subject: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const isAdmin = user?.role === 'admin';
  const displayName = isAdmin ? 'Admin' : 'Student';

  if (!user) {
    navigate('/');
    return null;
  }

  const portfolioMembers = ['Ashish', 'Kushagra', 'Arpit', 'Ayush', 'Hitesh'];

  const handleAddQuestion = () => {
    // Add question logic here
    console.log('Adding question:', newQuestion);
    setShowQuestionForm(false);
  };

  const resetView = () => {
    setShowContact(false);
    setShowAboutUs(false);
    setShowPortfolio(false);
    setShowResults(false);
    setShowQuestionForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-teal-800 text-white p-5">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <span className="text-lg">Welcome : {displayName}</span>
        </div>
        
        <nav className="space-y-4">
          <a href="#" onClick={resetView} className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded">
            <GraduationCap /> Dashboard
          </a>
          <a href="#" 
            onClick={() => {
              resetView();
              setShowAboutUs(true);
            }} 
            className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded"
          >
            <Info /> About Us
          </a>
          <a href="#" 
            onClick={() => {
              resetView();
              setShowPortfolio(true);
            }}
            className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded"
          >
            <List /> Portfolio
          </a>
          <a href="#" 
            onClick={() => {
              resetView();
              setShowContact(true);
            }}
            className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded"
          >
            <Phone /> Contact
          </a>
          {isAdmin && (
            <a href="#"
              onClick={() => {
                resetView();
                setShowResults(true);
              }}
              className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded"
            >
              <Trophy /> Student Results
            </a>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 p-2 hover:bg-teal-700 rounded w-full text-left"
          >
            <LogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {showContact && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <p className="text-lg">7275019070</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <p className="text-lg">chaurasiyaveer9@gmail.com</p>
              </div>
            </div>
          </div>
        )}

        {showAboutUs && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-lg">We are PSITians, IT Engineers</p>
          </div>
        )}

        {showPortfolio && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <div className="grid grid-cols-2 gap-4">
              {portfolioMembers.map((member, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-medium">{member}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showResults && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Student Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left">Student</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Score</th>
                    <th className="px-6 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="border-t">
                      <td className="px-6 py-4">{attempt.userId}</td>
                      <td className="px-6 py-4">{attempt.subjectId}</td>
                      <td className="px-6 py-4">{attempt.score}/10</td>
                      <td className="px-6 py-4">
                        {new Date(attempt.completedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showQuestionForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddQuestion(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Subject</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={newQuestion.subject}
                    onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
                  >
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Question</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  />
                </div>
                {newQuestion.options.map((option, index) => (
                  <div key={index}>
                    <label className="block mb-1">Option {index + 1}</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOptions});
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1">Correct Answer</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: parseInt(e.target.value)})}
                  >
                    {newQuestion.options.map((_, index) => (
                      <option key={index} value={index}>Option {index + 1}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        )}

        {isAdmin && !showContact && !showAboutUs && !showPortfolio && !showResults && !showQuestionForm && (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 text-center bg-teal-500 text-white py-2">Students</h3>
                <div className="text-4xl font-bold text-center text-gray-700 border-2 border-red-300 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                  2
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 text-center bg-teal-500 text-white py-2">Guide</h3>
                <div className="text-4xl font-bold text-center text-gray-700 border-2 border-red-300 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                  5
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 text-center bg-teal-500 text-white py-2">Subject</h3>
                <div className="text-4xl font-bold text-center text-gray-700 border-2 border-red-300 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                  5
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 bg-teal-500 text-white py-2 px-4">Create Subject</h3>
                <div className="p-4 bg-blue-50 cursor-pointer hover:bg-blue-100">
                  <span className="text-blue-600">Create Subject</span>
                </div>
              </div>
              <div 
                className="bg-white p-6 rounded-lg shadow cursor-pointer"
                onClick={() => setShowQuestionForm(true)}
              >
                <h3 className="text-xl mb-4 bg-teal-500 text-white py-2 px-4">Create Subject Related Questions</h3>
                <div className="p-4 bg-blue-50 hover:bg-blue-100">
                  <span className="text-blue-600">Create Question</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 bg-teal-500 text-white py-2 px-4">Show Subject</h3>
                <div className="p-4 bg-blue-50 cursor-pointer hover:bg-blue-100">
                  <span className="text-blue-600">Update And Delete All Subject</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4 bg-teal-500 text-white py-2 px-4">Update & Delete Subject Related Questions</h3>
                <div className="p-4 bg-blue-50 cursor-pointer hover:bg-blue-100">
                  <span className="text-blue-600">Update & Delete Question</span>
                </div>
              </div>
            </div>
          </>
        )}

        {!isAdmin && !showContact && !showAboutUs && !showPortfolio && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-teal-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">{subject.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">10 Questions</p>
                  <button
                    onClick={() => navigate(`/quiz/${subject.id}`)}
                    className="w-full py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}