import { FileText, CheckCircle, TrendingUp, Trophy, Eye, Info } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButtonCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../utils/store';
import { getUserData } from '../features/api/assessmentAPI';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  const { user } = authState;

  const [assessmentData, setAssessmentData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAssessmentStructure = async () => {
      setIsLoading(true);
      try {
        const response = await getUserData();
        setAssessmentData(response.assessmentResults);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssessmentStructure();
  }, [])

  if (isLoading) 
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Data
          </h2>
          <p className="text-gray-600">
            Please wait while we load your data...
          </p>
        </div>
      </div>
    );

  const totalScore = assessmentData?.step1?.A1?.score + assessmentData?.step1?.A2?.score + assessmentData?.step2?.B1?.score + assessmentData?.step2?.B2?.score + assessmentData?.step3?.C1?.score + assessmentData?.step3?.C2?.score;

  const assessmentStructure = [
    { step: 1, title: 'A1 Level Questions', duration: '22 minutes', completed: assessmentData?.step1?.A1?.isCompleted },
    { step: 2, title: 'A2 Level Questions', duration: '22 minutes', completed: assessmentData?.step1?.A2?.isCompleted },
    { step: 3, title: 'B1 Level Questions', duration: '22 minutes', completed: assessmentData?.step2?.B1?.isCompleted },
    { step: 4, title: 'B2 Level Questions', duration: '22 minutes', completed: assessmentData?.step2?.B2?.isCompleted },
    { step: 5, title: 'C1 Level Questions', duration: '22 minutes', completed: assessmentData?.step3?.C1?.isCompleted },
    { step: 6, title: 'C2 Level Questions', duration: '22 minutes', completed: assessmentData?.step3?.C2?.isCompleted }
  ];

  const benefits = [
    'Detailed competency assessment',
    'Professional certificate',
    'Performance analytics'
  ];

  const handleViewResults = () => {
    navigate('/results');
  };

  

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-gray-600">Ready to test your competencies? Take the assessment to get your certificate.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={assessmentData?.step3?.C2?.isCompleted ? CheckCircle : Info}
          title="Assessment Status"
          value={assessmentData?.isStarted ? assessmentData?.level === 'C2' ? 'Completed' : 'Incomplete' : 'Not Started'}
          textColor={assessmentData?.isStarted ? 'text-green-600' : 'text-yellow-600'}
          iconBg={assessmentData?.isStarted ? 'bg-green-100' : 'bg-yellow-100'}
        />
        <StatCard
          icon={TrendingUp}
          title="Total Score"
          value={`${totalScore}/132`}
          textColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          icon={Trophy}
          title="Level Achieved"
          value={assessmentData?.level || 'Not Started'}
          textColor={assessmentData?.level.includes("C") ? 'text-purple-600' : assessmentData?.level.includes("B") ? 'text-green-600' : assessmentData?.level.includes("A") ? 'text-yellow-600' : 'text-gray-600'}
          iconBg={assessmentData?.level.includes("C") ? 'bg-purple-100' : assessmentData?.level.includes("B") ? 'bg-green-100' : assessmentData?.level.includes("A") ? 'bg-yellow-100' : 'bg-gray-100'}
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

export default Dashboard;