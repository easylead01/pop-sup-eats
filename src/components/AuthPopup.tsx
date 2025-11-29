import { useState } from 'react';
import { X, Phone, ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const AuthPopup = () => {
  const { isAuthOpen, setAuthOpen, authStep, setAuthStep, setIsLoggedIn, phoneNumber, setPhoneNumber } = useUIStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setAuthStep('code');
    toast({
      title: 'Код отправлен',
      description: `На номер ${phoneNumber}`,
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setIsLoggedIn(true);
    setAuthOpen(false);
    toast({
      title: 'Добро пожаловать!',
      description: 'Вы успешно вошли в аккаунт',
    });
    setCode('');
  };

  const handleBack = () => {
    setAuthStep('phone');
    setCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 animate-fade-in"
        onClick={() => setAuthOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl w-full max-w-md p-6 md:p-8 animate-scale-in shadow-popup">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {authStep === 'code' ? (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-muted rounded-full transition-colors -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div />
          )}
          
          <button
            onClick={() => setAuthOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors -mr-2"
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
              : `Код отправлен на ${phoneNumber}`
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
                className="pl-12 h-14 text-lg rounded-2xl"
              />
            </div>
            
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
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
              className="h-14 text-lg text-center tracking-widest rounded-2xl"
              maxLength={6}
            />
            
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Проверка...' : 'Войти'}
            </button>

            <button
              onClick={handleSendCode}
              className="w-full text-sm text-primary hover:underline"
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
