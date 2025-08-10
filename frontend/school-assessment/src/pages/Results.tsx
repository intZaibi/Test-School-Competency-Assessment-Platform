import { Trophy, Eye, CheckCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import Certificate from '../components/Certificate';
import { useNavigate } from 'react-router-dom';

export default function Results () {
  const navigate = useNavigate();
  const [viewCertificate, setViewCertificate] = useState(false);

  const handleViewCertificate = () => {
    setViewCertificate(true);
  };

  const assessmentData = {
    status: 'Completed',
    totalScore: 265,
    maxScore: 100,
    level: 'Expert',
    userName: 'Shahzaib Ali'
  };


  const resultData = {
    totalScore: 265,
    stepScores: {
      1: { score: 85, title: 'A1/A2', description: 'Basic user level assessment' },
      2: { score: 92, title: 'B1/B2', description: 'Independent user level assessment' },
      3: { score: 88, title: 'C1/C2', description: 'Proficient user level assessment' }
    }
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
        Expert Level
      </div>
    </div>

    {/* Score Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="text-3xl font-bold text-gray-900 mb-1">{resultData.totalScore}%</div>
        <p className="text-sm text-gray-600">Total Score</p>
      </div>
      
      {Object.entries(resultData.stepScores).map(([step, data]) => (
        <div key={step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">{data.score}%</div>
          <p className="text-sm text-gray-600">Step {step} ({data.title})</p>
        </div>
      ))}
    </div>

    {/* Detailed Results */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Results</h2>
      
      <div className="space-y-6">
        {Object.entries(resultData.stepScores).map(([step, data]) => (
          <div key={step} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
            <div>
              <h3 className="font-medium text-gray-900">Step {step}: {data.title} Level</h3>
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
      <p className="text-gray-600 mb-4">Congratulations! You've earned your competency certificate.</p>
      
      <div className="flex gap-4">
        <button
          onClick={handleViewCertificate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          View Certificate
        </button>
      </div>
    </div>

    {/* Next Steps */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Next Steps</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} className="text-green-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Certificate Delivered</h3>
            <p className="text-sm text-gray-600">Your certificate has been sent to your email address</p>
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
        View Certificate
      </button>
    </div>

    {viewCertificate && <Certificate assessmentData={assessmentData} />}
  </div>
)};