import { Trophy, Eye, CheckCircle, TrendingUp, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import Certificate from '../components/Certificate';
import { useNavigate } from 'react-router-dom';
import { getUserData, generateCertificate } from '../features/api/assessmentAPI';

export default function Results () {
  const navigate = useNavigate();
  const [viewCertificate, setViewCertificate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [certificateData, setCertificateData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response.error) {
          setError(response.error);
        } else {
          setUserData(response);
          // If user has certificate data, set it
          if (response.certificate) {
            setCertificateData(response.certificate);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch assessment results');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const calculateTotalScore = () => {
    if (!userData?.assessmentResults) return 0;
    
    const results = userData.assessmentResults;
    let totalScore = 0;
    let completedLevels = 0;

    // Calculate scores for each step and level
    Object.keys(results).forEach(step => {
      if (step !== 'isStarted' && step !== 'level') {
        const stepData = results[step];
        Object.keys(stepData).forEach(level => {
          const levelData = stepData[level];
          if (levelData.isCompleted) {
            totalScore += levelData.score;
            completedLevels++;
          }
        });
      }
    });

    return completedLevels > 0 ? Math.round(totalScore / completedLevels) : 0;
  };

  const getStepScores = () => {
    if (!userData?.assessmentResults) return {};

    const results = userData.assessmentResults;
    const stepScores: any = {};

    Object.keys(results).forEach(step => {
      if (step !== 'isStarted' && step !== 'level') {
        const stepData = results[step];
        let stepTotal = 0;
        let stepCompleted = 0;

        Object.keys(stepData).forEach(level => {
          const levelData = stepData[level];
          if (levelData.isCompleted) {
            stepTotal += levelData.score;
            stepCompleted++;
          }
        });

        if (stepCompleted > 0) {
          stepScores[step] = {
            score: Math.round(stepTotal / stepCompleted),
            title: step === 'step1' ? 'A1/A2' : step === 'step2' ? 'B1/B2' : 'C1/C2',
            description: step === 'step1' ? 'Basic user level assessment' : 
                        step === 'step2' ? 'Independent user level assessment' : 
                        'Proficient user level assessment'
          };
        }
      }
    });

    return stepScores;
  };

  const getAchievementLevel = (totalScore: number) => {
    if (totalScore >= 90) return 'Expert';
    if (totalScore >= 80) return 'Advanced';
    if (totalScore >= 70) return 'Intermediate';
    if (totalScore >= 60) return 'Basic';
    return 'Beginner';
  };

  const handleGenerateCertificate = async () => {
    const totalScore = calculateTotalScore();
    const level = getAchievementLevel(totalScore);
    
    try {
      const response = await generateCertificate(totalScore, level);
      if (response.error) {
        setError(response.error);
      } else {
        setCertificateData(response.certificate);
        setViewCertificate(true);
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      setError('Failed to generate certificate');
    }
  };

  const handleViewCertificate = () => {
    if (certificateData) {
      setViewCertificate(true);
    } else {
      handleGenerateCertificate();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!userData?.assessmentResults?.isStarted) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-gray-600 mb-4">No assessment results found</div>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const totalScore = calculateTotalScore();
  const stepScores = getStepScores();
  const achievementLevel = getAchievementLevel(totalScore);

  const assessmentData = {
    status: 'Completed',
    totalScore: totalScore,
    maxScore: 100,
    level: achievementLevel,
    userName: userData.name || 'User'
  };

  return (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessment Results</h1>
        <p className="text-gray-600">Your competency assessment results</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
        <Trophy size={16} />
        {achievementLevel} Level
      </div>
    </div>

    {/* Score Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalScore}%</div>
        <p className="text-sm text-gray-600">Total Score</p>
      </div>
      
      {Object.entries(stepScores).map(([step, data]: [string, any]) => (
        <div key={step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">{data.score}%</div>
          <p className="text-sm text-gray-600">Step {step.slice(-1)} ({data.title})</p>
        </div>
      ))}
    </div>

    {/* Detailed Results */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Results</h2>
      
      <div className="space-y-6">
        {Object.entries(stepScores).map(([step, data]: [string, any]) => (
          <div key={step} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
            <div>
              <h3 className="font-medium text-gray-900">Step {step.slice(-1)}: {data.title} Level</h3>
              <p className="text-sm text-gray-600">{data.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{data.score}%</div>
              <p className="text-sm text-gray-600">Passed</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Certificate Section */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Certificate</h2>
      <p className="text-gray-600 mb-4">
        {certificateData 
          ? "Congratulations! You've earned your competency certificate." 
          : "Generate your competency certificate to commemorate your achievement."
        }
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={handleViewCertificate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          {certificateData ? 'View Certificate' : 'Generate Certificate'}
        </button>
         {certificateData && (
           <button
             onClick={() => {
               // For now, just trigger the certificate view which has download functionality
               setViewCertificate(true);
             }}
             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
           >
             <Download size={16} />
             Download Certificate
           </button>
         )}
      </div>
    </div>

    {/* Next Steps */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Next Steps</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} className="text-green-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Assessment Completed</h3>
            <p className="text-sm text-gray-600">You have successfully completed all assessment levels</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <TrendingUp size={20} className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Track Progress</h3>
            <p className="text-sm text-gray-600">Monitor your competency development over time</p>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4">
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Back to Dashboard
      </button>
      <button
        onClick={handleViewCertificate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {certificateData ? 'View Certificate' : 'Generate Certificate'}
      </button>
    </div>

    {viewCertificate && certificateData && (
      <Certificate assessmentData={assessmentData} certificateData={certificateData} />
    )}
  </div>
)};