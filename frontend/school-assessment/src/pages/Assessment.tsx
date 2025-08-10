import { Clock, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Assessment () {
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [step: number]: { [questionId: number]: string } }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(22 * 60);

  const assessmentStructure = [
    "A1 Level Questions (Basic)",
    "A2 Level Questions (Basic)",
    "B1 Level Questions (Independent)",
    "B2 Level Questions (Independent)",
    "C1 Level Questions (Proficient)",
    "C2 Level Questions (Proficient)"
  ];
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    const stepAnswers = selectedAnswers[currentStep] || {};
    return Object.keys(stepAnswers).length;
  };

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStep]: {
        ...(prev[currentStep] || {}),
        [questionId]: optionId
      }
    }));
  };

  const handleSubmitStep = () => {
    // Logic to submit current step and move to next
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setCurrentQuestion(1);
    } else {
      // Assessment completed
      navigate('/results');
    }
  };

  const questions = {
    1: [
      {
        id: 1,
        question: "What is the best approach to problem-solving?",
        options: [
          { id: 'a', text: "Break it down into smaller parts", emoji: "⭐" },
          { id: 'b', text: "Jump straight to the solution", emoji: "🚀" },
          { id: 'c', text: "Ask others to solve it for you", emoji: "😊" },
          { id: 'd', text: "Wait and hope it solves itself", emoji: "🌊" }
        ]
      },
      {
        id: 2,
        question: "Which of the following is the most effective learning method?",
        options: [
          { id: 'a', text: "Reading textbooks only", emoji: "📚" },
          { id: 'b', text: "Practice with real examples", emoji: "💪" },
          { id: 'c', text: "Watching videos passively", emoji: "📺" },
          { id: 'd', text: "Memorizing without understanding", emoji: "🧠" }
        ]
      }
    ],
    2: [
      {
        id: 1,
        question: "What is the best approach to problem-solving?",
        options: [
          { id: 'a', text: "Break it down into smaller parts", emoji: "⭐" },
          { id: 'b', text: "Jump straight to the solution", emoji: "🚀" },
          { id: 'c', text: "Ask others to solve it for you", emoji: "😊" },
          { id: 'd', text: "Wait and hope it solves itself", emoji: "🌊" }
        ]
      }
    ],
    3: [
      {
        id: 1,
        question: "What is the best approach to problem-solving?",
        options: [
          { id: 'a', text: "Break it down into smaller parts", emoji: "⭐" },
          { id: 'b', text: "Jump straight to the solution", emoji: "🚀" },
          { id: 'c', text: "Ask others to solve it for you", emoji: "😊" },
          { id: 'd', text: "Wait and hope it solves itself", emoji: "🌊" }
        ]
      }
    ]
  };

  const [assessmentStarted, setAssessmentStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (assessmentStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [assessmentStarted, timeRemaining]);

  
  return (
  <div className="space-y-8 ">

    {/* Start Assessment */}
    {!assessmentStarted && <div className="bg-white flex flex-col gap-4 rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Start Assessment</h3>
        <span className="text-sm text-gray-600">Step 1 of 3</span>
      </div>
      <button
        onClick={() => setAssessmentStarted(true)}
        className="px-6 py-2 bg-blue-600 text-white cursor-pointer self-center rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Assessment
      </button>
    </div>}

    {assessmentStarted && (
      <>
    {/* Progress Bar */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Overall Progress</h3>
        <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Assessment Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step {currentStep} Assessment</h1>
          <p className="text-gray-600">{assessmentStructure[currentStep - 1]}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-red-600">
            <Clock size={18} />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
          <span className="text-sm text-gray-600">
            {getAnsweredCount()} of {questions[currentStep as keyof typeof questions]?.length || 0} answered
          </span>
        </div>
      </div>
    </div>


      {/* Question */}
    <div className="flex flex-col gap-4">
      {questions[currentStep as keyof typeof questions]?.map((question: any) => (
        <div key={question.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                {question.id}
              </div>
              <span className="text-red-500 text-sm">●</span>
              <h2 className="text-lg font-medium text-gray-900">
                Question {question.id}: {question.question}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {question.options.map((option: any) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  (selectedAnswers[currentStep]?.[question.id] === option.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedAnswers[currentStep]?.[question.id] === option.id}
                  onChange={() => handleAnswerSelect(question.id, option.id)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{option.emoji}</span>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>


    {/* Navigation */}
    <div className=" bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <button
          // onClick={handlePreviousQuestion}
          disabled={currentQuestion === 1}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Previous Step
        </button>
        
        <button
          onClick={handleSubmitStep}
          disabled={getAnsweredCount() === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Step
        </button>
      </div>

      {getAnsweredCount() === 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">Please answer at least one question before proceeding.</p>
        </div>
      )}
    </div>
    </>
    )}
  </div>
)};