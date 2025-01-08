import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import { Timer, AlertCircle, Download } from 'lucide-react';
import clsx from 'clsx';

export default function Quiz() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const subjects = useQuizStore((state) => state.subjects);
  const addAttempt = useQuizStore((state) => state.addAttempt);

  const subject = subjects.find((s) => s.id === subjectId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(10).fill(-1));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!user || !subject) {
      navigate('/dashboard');
    }
  }, [user, subject, navigate]);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  if (!subject || !user) return null;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const finalScore = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === subject.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    setScore(finalScore);

    addAttempt({
      id: Date.now().toString(),
      userId: user.id,
      subjectId: subject.id,
      score: finalScore,
      completedAt: new Date(),
      timeSpent: 600 - timeLeft
    });

    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const downloadCertificate = () => {
    // Create certificate content
    const certificateContent = `
      Certificate of Completion
      
      This is to certify that
      ${user.name}
      has successfully completed the ${subject.name} quiz
      with a score of ${score} out of 10
      
      Date: ${new Date().toLocaleDateString()}
    `;

    // Create blob and download
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject.name.toLowerCase()}-certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{subject.name} Quiz</h1>
            <div className="flex items-center text-gray-600">
              <Timer className="w-5 h-5 mr-2" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">
                    Question {currentQuestion + 1} of 10
                  </h2>
                  <div className="flex gap-2">
                    {Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className={clsx(
                            'w-8 h-8 rounded-full flex items-center justify-center cursor-pointer',
                            {
                              'bg-blue-600 text-white':
                                currentQuestion === index,
                              'bg-gray-200 text-gray-600':
                                currentQuestion !== index,
                              'ring-2 ring-blue-400':
                                selectedAnswers[index] !== -1
                            }
                          )}
                          onClick={() => setCurrentQuestion(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-lg">
                    {subject.questions[currentQuestion].text}
                  </p>
                </div>

                <div className="space-y-3">
                  {subject.questions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className={clsx(
                          'w-full text-left p-3 rounded-lg border transition-colors',
                          {
                            'bg-blue-50 border-blue-500':
                              selectedAnswers[currentQuestion] === index,
                            'border-gray-200 hover:bg-gray-50':
                              selectedAnswers[currentQuestion] !== index
                          }
                        )}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    onClick={() =>
                      setCurrentQuestion((prev) =>
                        prev > 0 ? prev - 1 : prev
                      )
                    }
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  {currentQuestion < 9 ? (
                    <button
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      onClick={() =>
                        setCurrentQuestion((prev) =>
                          prev < 9 ? prev + 1 : prev
                        )
                      }
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleSubmit}
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-lg mb-2">
                  Your score: <span className="font-bold">{score} out of 10</span>
                </p>
                <p className="text-gray-600">
                  Time taken: {formatTime(600 - timeLeft)}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  onClick={downloadCertificate}
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>
                <button
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}