type Props = {

  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  variant?: string;
};

export default function ActionButton ({ icon: Icon, title, description, onClick, variant = 'default' }: Props) {
  return (
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
)};