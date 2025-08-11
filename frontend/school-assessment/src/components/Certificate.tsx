import { Trophy, Download } from 'lucide-react';

type Props = {
  assessmentData: any;
  certificateData?: any;
};

export default function Certificate ({ assessmentData, certificateData }: Props) {

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
    const currentDate = certificateData?.issueDate ? new Date(certificateData.issueDate).toLocaleDateString() : new Date().toLocaleDateString();
    const certificateId = certificateData?.id || 'TSA-' + Math.random().toString(36).substr(2, 9).toUpperCase();

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

  return (
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
            <p className="font-medium">{certificateData?.issueDate ? new Date(certificateData.issueDate).toLocaleDateString() : new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Certificate ID</p>
            <p className="font-medium">{certificateData?.id || 'TSA-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
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
)};