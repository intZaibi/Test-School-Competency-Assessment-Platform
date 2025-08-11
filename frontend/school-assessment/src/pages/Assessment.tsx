import { Clock, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAssessmentQuestions, submitAssessment } from '../features/api/assessmentAPI';

export default function Assessment () {
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [step: number]: { [questionId: number]: number } }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLevel, setCurrentLevel] = useState('A1');
  const [timeRemaining, setTimeRemaining] = useState(22 * 60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  
  const assessmentStructure = [
    { step: 1, level: 'A1', title: "A1 Level Questions (Basic)" },
    { step: 1, level: 'A2', title: "A2 Level Questions (Basic)" },
    { step: 2, level: 'B1', title: "B1 Level Questions (Independent)" },
    { step: 2, level: 'B2', title: "B2 Level Questions (Independent)" },
    { step: 3, level: 'C1', title: "C1 Level Questions (Proficient)" },
    { step: 3, level: 'C2', title: "C2 Level Questions (Proficient)" }
  ];

  const currentStepData = assessmentStructure.find(s => s.step === currentStep && s.level === currentLevel);
  const currentQuestions = assessmentData?.[`step${currentStep}`]?.[currentLevel] || [];

  useEffect(() => {
    const fetchAssessmentStructure = async () => {
      setLoading(true);
      try {
        const res = await getAllAssessmentQuestions();
        console.log('assessmentQuestions:', res);
        if (res.error) {
          setError(res.error);
        } else if (res && res.length > 0) {
          setAssessmentData(res[0]); // Get the first assessment document
        } else {
          setError('No assessment questions found. Please seed the database first.');
        }
      } catch (error) {
        console.log('error:', error);
        setError('Failed to fetch assessment questions. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessmentStructure();
  }, []);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    const stepAnswers = selectedAnswers[currentStep] || {};
    return Object.keys(stepAnswers).length;
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStep]: {
        ...(prev[currentStep] || {}),
        [questionIndex]: optionIndex
      }
    }));
  };

  const calculateScore = () => {
    const stepAnswers = selectedAnswers[currentStep] || {};
    let correctAnswers = 0;
    let totalAnswered = 0;

    currentQuestions.forEach((question: any, questionIndex: number) => {
      const selectedOption = stepAnswers[questionIndex];
      if (selectedOption !== undefined) {
        totalAnswered++;
        if (question.options[selectedOption]?.isCorrect) {
          correctAnswers++;
        }
      }
    });

    return totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
  };

  const handleSubmitStep = async () => {
    if (getAnsweredCount() === 0) return;

    const score = calculateScore();
    
    try {
      console.log('currentStep:', currentStep, 'currentLevel:', currentLevel, 'score:', score);
      await submitAssessment(`step${currentStep}`, currentLevel, score);
      
      // Move to next level or step
      const currentIndex = assessmentStructure.findIndex(s => s.step === currentStep && s.level === currentLevel);
      const nextItem = assessmentStructure[currentIndex + 1];
      
      if (nextItem) {
        setCurrentStep(nextItem.step);
        setCurrentLevel(nextItem.level);
        setSelectedAnswers(prev => ({ ...prev, [nextItem.step]: {} }));
      } else {
        // Assessment completed
        navigate('/results');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setError('Failed to submit assessment');
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = assessmentStructure.findIndex(s => s.step === currentStep && s.level === currentLevel);
    const prevItem = assessmentStructure[currentIndex - 1];
    
    if (prevItem) {
      setCurrentStep(prevItem.step);
      setCurrentLevel(prevItem.level);
    }
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

  const getCurrentStepIndex = () => {
    return assessmentStructure.findIndex(s => s.step === currentStep && s.level === currentLevel) + 1;
  };
  
  return (
  <div className="space-y-8 ">

    {/* Start Assessment */}
    {error && <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">{error}</p>
    </div>}
    {!assessmentStarted && <div className="bg-white flex flex-col gap-4 rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Start Assessment</h3>
        <span className="text-sm text-gray-600">Step 1 of {assessmentStructure.length}</span>
      </div>
      <button
        onClick={() => setAssessmentStarted(true)}
        disabled={loading || !!error}
        className="px-6 py-2 bg-blue-600 text-white cursor-pointer self-center rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Assessment
      </button>
    </div>}

    {assessmentStarted && !loading && !error && (
      <>
    {/* Progress Bar */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Overall Progress</h3>
        <span className="text-sm text-gray-600">Step {getCurrentStepIndex()} of {assessmentStructure.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(getCurrentStepIndex() / assessmentStructure.length) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Assessment Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step {currentStep} Assessment</h1>
          <p className="text-gray-600">{currentStepData?.title}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-red-600 bg-red-100 py-2 px-4 rounded-lg">
            <Clock size={18} />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
          <span className="text-sm text-gray-600">
            {getAnsweredCount()} of {currentQuestions.length} answered
          </span>
        </div>
      </div>
    </div>

      {/* Question */}
    <div className="flex flex-col gap-4">
      {currentQuestions.map((question: any, questionIndex: number) => (
        <div key={questionIndex} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                {questionIndex + 1}
              </div>
              <span className="text-red-500 text-sm">●</span>
              <h2 className="text-lg font-medium text-gray-900">
                Question {questionIndex + 1}: {question.statement}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {question.options.map((option: any, optionIndex: number) => (
              <label
                key={optionIndex}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  (selectedAnswers[currentStep]?.[questionIndex] === optionIndex)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex.toString()}
                  checked={selectedAnswers[currentStep]?.[questionIndex] === optionIndex}
                  onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg">📝</span>
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
          onClick={handlePreviousStep}
          disabled={getCurrentStepIndex() === 1}
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
          {getCurrentStepIndex() === assessmentStructure.length ? 'Finish Assessment' : 'Submit Step'}
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