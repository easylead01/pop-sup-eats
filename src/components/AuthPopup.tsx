import { useState } from 'react';
import { X, Phone, ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useSwipeClose } from '@/hooks/useSwipeClose';

type SocialProvider = 'yandex' | 'vk' | 'google';

const SOCIAL: { id: SocialProvider; label: string; name: string; className: string; icon: JSX.Element }[] = [
  {
    id: 'yandex',
    label: 'Войти с Яндекс ID',
    name: 'Яндекс ID',
    className: 'bg-black text-white hover:bg-black/85',
    icon: (
      <span className="w-6 h-6 rounded-full bg-[#FC3F1D] flex items-center justify-center text-white text-[15px] font-bold leading-none" aria-hidden>
        Я
      </span>
    ),
  },
  {
    id: 'vk',
    label: 'Войти с VK ID',
    name: 'VK ID',
    className: 'bg-[#0077FF] text-white hover:bg-[#0069e0]',
    icon: (
      <span className="w-6 h-6 rounded-md bg-white text-[#0077FF] flex items-center justify-center text-[10px] font-extrabold leading-none tracking-tight" aria-hidden>
        VK
      </span>
    ),
  },
  {
    id: 'google',
    label: 'Войти через Google',
    name: 'Google',
    className: 'bg-white text-foreground border border-border hover:bg-muted',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
      </svg>
    ),
  },
];

const AuthPopup = () => {
  const { isAuthOpen, setAuthOpen, authStep, setAuthStep, setIsLoggedIn, phoneNumber, setPhoneNumber, setCheckoutOpen } = useUIStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
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

  // Заглушка входа через соцсети: имитируем успешную авторизацию
  const handleSocialLogin = async (provider: (typeof SOCIAL)[number]) => {
    if (socialLoading) return;
    setSocialLoading(provider.id);
    await new Promise(resolve => setTimeout(resolve, 900));
    setSocialLoading(null);
    setIsLoggedIn(true);
    setAuthOpen(false);
    toast({
      title: 'Добро пожаловать!',
      description: `Вы вошли через ${provider.name} (демо)`,
    });
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

            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">или войти через</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2.5">
              {SOCIAL.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSocialLogin(p)}
                  disabled={!!socialLoading}
                  className={`w-full h-12 rounded-full flex items-center justify-center gap-3 font-semibold text-[15px] transition-all active:scale-[0.99] disabled:opacity-60 ${p.className}`}
                >
                  {p.icon}
                  {socialLoading === p.id ? 'Входим…' : p.label}
                </button>
              ))}
            </div>
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
