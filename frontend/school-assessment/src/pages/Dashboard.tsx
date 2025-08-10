import { FileText, CheckCircle, TrendingUp, Trophy, Eye } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButtonCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../utils/store';

const QuizDashboard = () => {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  // const { user } = authState;
  console.log('Dashboard - Full auth state:', authState);
  const assessmentStructure = [
    { step: 1, title: 'A1/A2 Level Questions', duration: '30 minutes', completed: true },
    { step: 2, title: 'B1/B2 Level Questions', duration: '45 minutes', completed: true },
    { step: 3, title: 'C1/C2 Level Questions', duration: '60 minutes', completed: true }
  ];

  const benefits = [
    'Detailed competency assessment',
    'Professional certificate',
    'Performance analytics'
  ];

  const assessmentData = {
    status: 'Completed',
    totalScore: 265,
    maxScore: 100,
    level: 'Expert',
    userName: 'Shahzaib Ali'
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {assessmentData.userName}!</h1>
        <p className="text-gray-600">Ready to test your competencies? Take the assessment to get your certificate.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={CheckCircle}
          title="Assessment Status"
          value="Completed"
          textColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          icon={TrendingUp}
          title="Total Score"
          value={`${assessmentData.totalScore}/100`}
          textColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          icon={Trophy}
          title="Level Achieved"
          value="Expert 🏆"
          textColor="text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            icon={Eye}
            title="View Results"
            description="Check your assessment results and download certificate"
            onClick={handleViewResults}
          />
          <ActionButton
            icon={FileText}
            title="Start Assessment"
            description="Begin your competency assessment test"
            onClick={() => navigate('/assessment')}
            variant="primary"
          />
        </div>
      </div>

      {/* Assessment Information */}
      <div className='bg-white rounded-lg border border-gray-200 p-4'>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Assessment Information</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assessment Structure */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Assessment Structure</h3>
            <div className="space-y-3">
              {assessmentStructure.map((item) => (
                <div key={item.step} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {item.step}
                  </div>
                  <div className="flex-grow flex items-center gap-3">
                    <p className="font-medium text-gray-900">{`Step ${item.step}: ${item.title}`}</p>
                    <p className="text-sm text-gray-600">({item.duration})</p>
                  </div>
                  {item.completed && (
                    <CheckCircle size={18} className="text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Get */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">What You'll Get</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;