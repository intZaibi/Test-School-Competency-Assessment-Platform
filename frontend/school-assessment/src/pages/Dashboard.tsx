import React, { useState, useEffect } from 'react';
import { Home, FileText, BarChart3, User, LogOut, CheckCircle, TrendingUp, Trophy, Download, Eye, Clock, ChevronLeft } from 'lucide-react';

const QuizDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(879); // 14:39 in seconds
  const [assessmentStarted, setAssessmentStarted] = useState(false);


  // const handleDownloadCertificate = async () => {
  //   try {
  //     // Create a temporary certificate element for download
  //     const tempDiv = document.createElement('div');
  //     tempDiv.style.position = 'fixed';
  //     tempDiv.style.top = '-9999px';
  //     tempDiv.style.left = '-9999px';
  //     tempDiv.style.width = '800px';
  //     tempDiv.style.height = '600px';
  //     tempDiv.style.background = 'white';
  //     tempDiv.style.padding = '40px';
  //     tempDiv.style.fontFamily = 'Arial, sans-serif';
  //     tempDiv.style.border = '4px solid #e5e7eb';
  //     tempDiv.style.boxSizing = 'border-box';
      
  //     const currentDate = new Date().toLocaleDateString();
  //     const certificateId = 'TSA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
  //     tempDiv.innerHTML = `
  //       <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #3b82f6; padding: 30px; position: relative;">
  //         <div>
  //           <div style="font-size: 32px; margin-bottom: 10px;">🏆</div>
  //           <h1 style="font-size: 32px; font-weight: bold; color: #1f2937; margin: 20px 0 10px 0;">Certificate of Completion</h1>
  //           <div style="width: 200px; height: 4px; background: #3b82f6; margin: 0 auto 30px auto;"></div>
            
  //           <p style="color: #6b7280; font-size: 18px; margin: 20px 0;">This is to certify that</p>
            
  //           <h2 style="font-size: 36px; font-weight: bold; color: #3b82f6; margin: 20px 0;">${assessmentData.userName}</h2>
            
  //           <p style="color: #6b7280; font-size: 18px; margin: 20px 0;">has successfully completed the</p>
            
  //           <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 20px 0;">Competency Assessment Test</h3>
            
  //           <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 30px auto; max-width: 300px;">
  //             <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">Achievement Level</p>
  //             <p style="color: #7c3aed; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">${assessmentData.level}</p>
  //             <p style="color: #6b7280; font-size: 14px; margin: 0;">Score: ${assessmentData.totalScore}/100</p>
  //           </div>
  //         </div>
          
  //         <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
  //           <div style="text-align: left;">
  //             <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0;">Date Issued</p>
  //             <p style="color: #1f2937; font-size: 14px; font-weight: bold; margin: 0;">${currentDate}</p>
  //           </div>
  //           <div style="text-align: right;">
  //             <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0;">Certificate ID</p>
  //             <p style="color: #1f2937; font-size: 14px; font-weight: bold; margin: 0;">${certificateId}</p>
  //           </div>
  //         </div>
  //       </div>
  //     `;
      
  //     document.body.appendChild(tempDiv);
      
  //     // Use html2canvas-like approach with foreign object in SVG
  //     const data = `
  //       <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  //         <foreignObject width="100%" height="100%">
  //           <div xmlns="http://www.w3.org/1999/xhtml" style="${tempDiv.style.cssText.replace('position: fixed; top: -9999px; left: -9999px;', '')}">${tempDiv.innerHTML}</div>
  //         </foreignObject>
  //       </svg>
  //     `;
      
  //     // Create blob and download
  //     const blob = new Blob([data], { type: 'image/svg+xml' });
  //     const url = URL.createObjectURL(blob);
      
  //     // Create an image to convert SVG to PNG
  //     const img = new Image();
  //     img.onload = () => {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = 800;
  //       canvas.height = 600;
  //       const ctx = canvas.getContext('2d');
  //       ctx?.drawImage(img, 0, 0);
        
  //       canvas.toBlob((pngBlob) => {
  //         const link = document.createElement('a');
  //         link.href = URL.createObjectURL(pngBlob as Blob);
  //         link.download = `${assessmentData.userName}_Certificate.png`;
  //         link.click();
  //         URL.revokeObjectURL(link.href);
  //         URL.revokeObjectURL(url);
  //         document.body.removeChild(tempDiv);
  //       }, 'image/png');
  //     };
      
  //     img.onerror = () => {
  //       // Fallback to canvas-based generation
  //       generateCertificateCanvas();
  //       document.body.removeChild(tempDiv);
  //       URL.revokeObjectURL(url);
  //     };
      
  //     img.src = url;
      
  //   } catch (error) {
  //     console.error('Error generating certificate:', error);
  //     // Fallback to canvas method
  //     generateCertificateCanvas();
  //   }
  // };

  const handleDownloadCertificateCanvas = async () => {
    // Generate a PNG certificate using a canvas and trigger download
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Trophy icon (emoji)
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', canvas.width / 2, 90);

    // Title
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 150);

    // Blue line
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(canvas.width / 2 - 100, 170, 200, 6);

    // Subtitle
    ctx.font = '20px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('This is to certify that', canvas.width / 2, 220);

    // Name
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(assessmentData.userName, canvas.width / 2, 270);

    // Subtitle 2
    ctx.font = '20px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('has successfully completed the', canvas.width / 2, 310);

    // Test name
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Competency Assessment Test', canvas.width / 2, 350);

    // Achievement box
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(canvas.width / 2 - 150, 370, 300, 80);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width / 2 - 150, 370, 300, 80);

    // Achievement level text
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Achievement Level', canvas.width / 2, 390);

    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(assessmentData.level, canvas.width / 2, 415);

    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.fillText(`Score: ${assessmentData.totalScore}/100`, canvas.width / 2, 435);

    // Footer line
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 480);
    ctx.lineTo(canvas.width - 60, 480);
    ctx.stroke();

    // Footer info
    const currentDate = new Date().toLocaleDateString();
    const certificateId = 'TSA-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Date issued
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Date Issued', 100, 515);
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(currentDate, 100, 535);

    // Certificate ID
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Certificate ID', canvas.width - 100, 515);
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(certificateId, canvas.width - 100, 535);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${assessmentData.userName}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 100);
    }, 'image/png');
  }


  // const generateCertificateCanvas = () => {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
    
  //   // Set canvas size
  //   canvas.width = 800;
  //   canvas.height = 600;
  //   if (ctx) {
  //   // Fill background with white
  //   ctx.fillStyle = '#ffffff';
  //   ctx?.fillRect(0, 0, canvas.width, canvas.height);
    
  //   // Add outer border
  //   ctx.strokeStyle = '#e5e7eb';
  //   ctx.lineWidth = 4;
  //   ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
  //   // Add inner border
  //   ctx.strokeStyle = '#3b82f6';
  //   ctx.lineWidth = 2;
  //   ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
  //   // Set font styles
  //   ctx.textAlign = 'center';
    
  //   // Trophy icon
  //   ctx.font = '32px Arial';
  //   ctx.fillStyle = '#3b82f6';
  //   ctx.fillText('🏆', canvas.width / 2, 100);
    
  //   // Title
  //   ctx.font = 'bold 32px Arial';
  //   ctx.fillStyle = '#1f2937';
  //   ctx.fillText('Certificate of Completion', canvas.width / 2, 140);
    
  //   // Blue underline
  //   ctx.fillStyle = '#3b82f6';
  //   ctx.fillRect(canvas.width / 2 - 100, 155, 200, 4);
    
  //   // Description text
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '18px Arial';
  //   ctx.fillText('This is to certify that', canvas.width / 2, 200);
    
  //   // User name
  //   ctx.fillStyle = '#3b82f6';
  //   ctx.font = 'bold 36px Arial';
  //   ctx.fillText(assessmentData.userName, canvas.width / 2, 250);
    
  //   // Achievement text
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '18px Arial';
  //   ctx.fillText('has successfully completed the', canvas.width / 2, 290);
    
  //   // Course name
  //   ctx.fillStyle = '#1f2937';
  //   ctx.font = 'bold 24px Arial';
  //   ctx.fillText('Competency Assessment Test', canvas.width / 2, 340);
    
  //   // Achievement box background
  //   ctx.fillStyle = '#f9fafb';
  //   ctx.fillRect(canvas.width / 2 - 150, 370, 300, 80);
  //   ctx.strokeStyle = '#e5e7eb';
  //   ctx.lineWidth = 1;
  //   ctx.strokeRect(canvas.width / 2 - 150, 370, 300, 80);
    
  //   // Achievement level text
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '14px Arial';
  //   ctx.fillText('Achievement Level', canvas.width / 2, 390);
    
  //   ctx.fillStyle = '#7c3aed';
  //   ctx.font = 'bold 24px Arial';
  //   ctx.fillText(assessmentData.level, canvas.width / 2, 415);
    
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '14px Arial';
  //   ctx.fillText(`Score: ${assessmentData.totalScore}/100`, canvas.width / 2, 435);
    
  //   // Footer line
  //   ctx.strokeStyle = '#e5e7eb';
  //   ctx.lineWidth = 1;
  //   ctx.beginPath();
  //   ctx.moveTo(60, 480);
  //   ctx.lineTo(canvas.width - 60, 480);
  //   ctx.stroke();
    
  //   // Footer information
  //   const currentDate = new Date().toLocaleDateString();
  //   const certificateId = 'TSA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
  //   // Date issued
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '12px Arial';
  //   ctx.textAlign = 'left';
  //   ctx.fillText('Date Issued', 100, 515);
  //   ctx.fillStyle = '#1f2937';
  //   ctx.font = 'bold 14px Arial';
  //   ctx.fillText(currentDate, 100, 535);
    
  //   // Certificate ID
  //   ctx.fillStyle = '#6b7280';
  //   ctx.font = '12px Arial';
  //   ctx.textAlign = 'right';
  //   ctx.fillText('Certificate ID', canvas.width - 100, 515);
  //   ctx.fillStyle = '#1f2937';
  //   ctx.font = 'bold 14px Arial';
  //   ctx.fillText(certificateId, canvas.width - 100, 535);
  //   }
  //   // Convert canvas to blob and download
  //   canvas.toBlob((blob) => {
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob as Blob);
  //     link.download = `${assessmentData.userName}_Certificate.png`;
  //     link.click();
  //     URL.revokeObjectURL(link.href);
  //   }, 'image/png');
  // };

  const assessmentData = {
    status: 'Completed',
    totalScore: 265,
    maxScore: 100,
    level: 'Expert',
    userName: 'Shahzaib Ali'
  };

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
    ]
  };

  const resultData = {
    totalScore: 265,
    stepScores: {
      1: { score: 85, title: 'A1/A2', description: 'Basic user level assessment' },
      2: { score: 92, title: 'B1/B2', description: 'Independent user level assessment' },
      3: { score: 88, title: 'C1/C2', description: 'Proficient user level assessment' }
    }
  };

  // Timer effect
  useEffect(() => {
    if (assessmentStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [assessmentStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleViewResults = () => {
    setActiveTab('results');
  };

  const handleViewCertificate = () => {
    setShowCertificate(true);
  };


  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setActiveTab('assessment');
  };

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${currentStep}-${questionId}`]: optionId
    }));
  };

  const handleNextQuestion = () => {
    const totalQuestions = questions[currentStep as keyof typeof questions]?.length || 0;
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitStep = () => {
    // Logic to submit current step and move to next
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setCurrentQuestion(1);
    } else {
      // Assessment completed
      setActiveTab('results');
    }
  };

  const getAnsweredCount = () => {
    const totalQuestions = questions[currentStep as keyof typeof questions]?.length || 0;
    const answered = Object.keys(selectedAnswers).filter(key => 
      key.startsWith(`${currentStep}-`)
    ).length;
    return answered;
  };

  const NavItem = ({ icon: Icon, label, tabKey, isActive }: { icon: React.ElementType, label: string, tabKey: string, isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, textColor, iconBg }: { icon: React.ElementType, title: string, value: string, subtitle?: string, textColor?: string, iconBg?: string }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon size={24} className={textColor} />
        </div>
      </div>
    </div>
  );

  const ActionButton = ({ icon: Icon, title, description, onClick, variant = 'default' }: { icon: React.ElementType, title: string, description: string, onClick: () => void, variant?: string }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${
        variant === 'primary' 
          ? 'bg-green-50 border-green-200 hover:bg-green-100' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className={`p-2 rounded-lg ${
        variant === 'primary' ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        <Icon size={20} className={variant === 'primary' ? 'text-green-700' : 'text-gray-700'} />
      </div>
      <div className="text-left">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );

  const renderDashboard = () => (
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
            onClick={handleStartAssessment}
            variant="primary"
          />
        </div>
      </div>

      {/* Assessment Information */}
      <div>
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
                  <div className="flex-grow">
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
                <div key={index} className="flex items-center gap-3">
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

  // Assessment Tab Component
  const renderAssessment = () => (
    <div className="space-y-8">
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
            <p className="text-gray-600">{assessmentStructure[currentStep - 1]?.title} ({assessmentStructure[currentStep - 1]?.duration.replace(' minutes', '')})</p>
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
      {questions[currentStep as keyof typeof questions] && questions[currentStep as keyof typeof questions][currentQuestion - 1] && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                {currentQuestion}
              </div>
              <span className="text-red-500 text-sm">●</span>
              <h2 className="text-lg font-medium text-gray-900">
                A{currentStep}/A{currentStep + 1} (Basic) Question {currentQuestion}: {questions[currentStep as keyof typeof questions][currentQuestion - 1].question}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {questions[currentStep as keyof typeof questions][currentQuestion - 1].options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAnswers[`${currentStep}-${questions[currentStep as keyof typeof questions][currentQuestion - 1].id}`] === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentStep}-${questions[currentStep as keyof typeof questions][currentQuestion - 1].id}`}
                  value={option.id}
                  checked={selectedAnswers[`${currentStep}-${questions[currentStep as keyof typeof questions][currentQuestion - 1].id}`] === option.id}
                  onChange={() => handleAnswerSelect(questions[currentStep as keyof typeof questions][currentQuestion - 1].id, option.id)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{option.emoji}</span>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            Previous Step
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Progress</p>
            <p className="font-medium text-blue-600">
              {getAnsweredCount()} / {questions[currentStep as keyof typeof questions]?.length || 0}
            </p>
          </div>

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
    </div>
  );

  const renderResults = () => (
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
          <button
            onClick={handleDownloadCertificateCanvas}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download PDF
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
          onClick={() => setActiveTab('dashboard')}
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
    </div>
  );

  const renderCertificate = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Preview</h1>
        <p className="text-gray-600">Your official competency certificate</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Trophy size={32} className="text-blue-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Certificate of Completion</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div>
          </div>
          
          <p className="text-gray-600">This is to certify that</p>
          
          <h3 className="text-3xl font-bold text-blue-600">{assessmentData.userName}</h3>
          
          <p className="text-gray-600">has successfully completed the</p>
          
          <h4 className="text-xl font-semibold text-gray-900">Competency Assessment Test</h4>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Achievement Level</p>
            <p className="text-2xl font-bold text-purple-600">{assessmentData.level}</p>
            <p className="text-sm text-gray-600 mt-1">Score: {assessmentData.totalScore}/100</p>
          </div>
          
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Date Issued</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Certificate ID</p>
              <p className="font-medium">TSA-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleDownloadCertificateCanvas}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Download size={18} />
          Download Certificate
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">Test School Assessment</h1>
              <nav className="hidden md:flex items-center gap-1">
                <NavItem icon={Home} label="Dashboard" tabKey="dashboard" isActive={activeTab === 'dashboard'} />
                <NavItem icon={FileText} label="Assessment" tabKey="assessment" isActive={activeTab === 'assessment'} />
                <NavItem icon={BarChart3} label="Results" tabKey="results" isActive={activeTab === 'results'} />
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{assessmentData.userName}</span>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'assessment' && renderAssessment()}
        {activeTab === 'results' && renderResults()}
        {showCertificate && renderCertificate()}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <NavItem icon={Home} label="Dashboard" tabKey="dashboard" isActive={activeTab === 'dashboard'} />
          <NavItem icon={FileText} label="Assessment" tabKey="assessment" isActive={activeTab === 'assessment'} />
          <NavItem icon={BarChart3} label="Results" tabKey="results" isActive={activeTab === 'results'} />
        </div>
      </nav>
    </div>
  );
};

export default QuizDashboard;