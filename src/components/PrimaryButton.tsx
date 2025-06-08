interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        text-white 
        font-semibold 
        rounded-lg 
        transition 
        cursor-pointer
        ${disabled ? 'bg-gray-400' : 'bg-[#322A7D] hover:bg-[#42389D]'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
} 