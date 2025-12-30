import { useState } from 'react';
import { X, Phone, ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useSwipeClose } from '@/hooks/useSwipeClose';

const AuthPopup = () => {
  const { isAuthOpen, setAuthOpen, authStep, setAuthStep, setIsLoggedIn, phoneNumber, setPhoneNumber, setCheckoutOpen } = useUIStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setAuthOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const swipeHandlers = useSwipeClose({
    direction: 'down',
    threshold: 80,
    onClose: handleClose,
  });

  if (!isAuthOpen) return null;

  const handleSendCode = async () => {
    if (phoneNumber.length < 10) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный номер телефона',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setAuthStep('code');
    toast({
      title: 'Код отправлен',
      description: `На номер +7${phoneNumber}`,
    });
  };

  const handleVerifyCode = async () => {
    if (code.length < 4) {
      toast({
        title: 'Ошибка',
        description: 'Введите код из SMS',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setIsLoggedIn(true);
    setAuthOpen(false);
    toast({
      title: 'Добро пожаловать!',
      description: 'Вы успешно вошли в аккаунт',
    });
    setCode('');
    
    // Open checkout after successful auth
    setTimeout(() => {
      setCheckoutOpen(true);
    }, 300);
  };

  const handleBack = () => {
    setAuthStep('phone');
    setCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-foreground/50 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'animate-fade-in'}`}
        onClick={handleClose}
        onMouseEnter={() => setIsBackdropHover(true)}
        onMouseLeave={() => { setIsBackdropHover(false); setCursorPos(null); }}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        <button
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-md transition-opacity duration-100 ${isBackdropHover ? 'opacity-100' : 'opacity-0'} hover:scale-105 active:scale-95 z-[60]`}
          style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
          title="Закрыть"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal */}
      <div 
        className={`relative bg-card w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-popup transition-all duration-200 overscroll-contain ${
          isClosing 
            ? 'translate-y-full md:translate-y-0 md:scale-95 md:opacity-0' 
            : 'animate-slide-in-up md:animate-scale-in'
        }`}
        {...swipeHandlers}
      >
        {/* Drag Handle (mobile) */}
        <div className="md:hidden flex justify-center -mt-3 mb-3">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {authStep === 'code' ? (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-muted rounded-full transition-all -ml-2 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div />
          )}
          
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-full transition-all -mr-2 hover:scale-105 active:scale-95 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {authStep === 'phone' ? 'Войти или зарегистрироваться' : 'Введите код'}
          </h2>
          
          <p className="text-muted-foreground">
            {authStep === 'phone'
              ? 'Введите номер телефона для входа'
              : `Код отправлен на +7${phoneNumber}`
            }
          </p>
        </div>

        {/* Form */}
        {authStep === 'phone' ? (
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                +7
              </span>
              <Input
                type="tel"
                placeholder="900 000 00 00"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="pl-12 h-14 text-lg"
              />
            </div>
            
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? 'Отправка...' : 'Получить код'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Код из SMS"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="h-14 text-lg text-center tracking-widest"
              maxLength={6}
            />
            
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? 'Проверка...' : 'Войти'}
            </button>

            <button
              onClick={handleSendCode}
              className="w-full text-sm text-primary hover:underline transition-colors"
            >
              Отправить код повторно
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="#" className="text-primary hover:underline">
            условиями использования
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPopup;
