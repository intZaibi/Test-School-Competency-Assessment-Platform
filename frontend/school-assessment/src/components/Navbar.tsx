import { FileText, BarChart3, Home, User, LogOut } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  const assessmentData = {
    status: 'Completed',
    totalScore: 265,
    maxScore: 100,
    level: 'Expert',
    userName: 'Shahzaib Ali'
  };

  const activeTab = useLocation().pathname.split('/')[1] || 'dashboard';


  return (
    <>
      <header className=" bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">
                Test School Assessment
              </h1>
              <nav className="hidden md:flex items-center gap-1">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  tabKey="dashboard"
                  isActive={activeTab === "dashboard"}
                  navigate={navigate}
                />
                <NavItem
                  icon={FileText}
                  label="Assessment"
                  tabKey="assessment"
                  isActive={activeTab === "assessment"}
                  navigate={navigate}
                />
                <NavItem
                  icon={BarChart3}
                  label="Results"
                  tabKey="results"
                  isActive={activeTab === "results"}
                  navigate={navigate}
                />
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {assessmentData.userName}
                </span>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


const NavItem = ({ icon: Icon, label, tabKey, isActive, navigate }: { icon: React.ElementType, label: string, tabKey: string, isActive: boolean, navigate: (path: string) => void }) => (
  <button
    onClick={() => navigate(`/${tabKey}`)}
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