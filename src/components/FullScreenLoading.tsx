import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  message?: string;
}

export default function FullScreenLoading({ isOpen, message = 'Cargando...' }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para asegurar que la animación se vea suave
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#322A7D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#322A7D] font-medium">{message}</p>
      </div>
    </div>
  );
} 