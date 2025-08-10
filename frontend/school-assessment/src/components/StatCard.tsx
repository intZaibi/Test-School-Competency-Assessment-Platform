type Props = {  
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  textColor?: string;
  iconBg?: string;
};

export default function StatCard ({ icon: Icon, title, value, subtitle, textColor, iconBg }: Props) {
  return (
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
)};

