'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo_eTax.png';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  // Redirection automatique dès que l'authentification est confirmée par Redux
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation locale simple
    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLocalError(null);
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
      <div className="w-full max-w-md rounded-2xl bg-secondary/10 px-6 py-10 md:px-10 md:py-12 border border-white/20 backdrop-blur-md shadow-2xl">
        {/* Header de la carte */}
        <div className="flex flex-col justify-center items-center text-center space-y-4 mb-8">
          <Image
            src={logo}
            alt="Logo eTax"
            width={70}
            height={70}
            priority
            style={{ height: 'auto' }} // Correction du ratio
          />
          <div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">
              eTax <span className="font-light">Facturation</span>
            </h1>
            <p className="text-slate-500 font-medium">
              République Démocratique du Congo
            </p>
          </div>
          <p className="text-secondary-foreground/70 text-sm">
            Connectez-vous pour gérer vos taxes et factures
          </p>
        </div>

        {/* Affichage des erreurs (Redux ou Locales) */}
        {(error || localError) && (
          <div className="bg-red-500/10 text-red-600 p-3 rounded-lg text-center text-xs mb-6 border border-red-200 animate-in fade-in duration-300">
            {error || localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Champ Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1">
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="votre.nom@entreprise.cd"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1 relative">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Bouton de soumission avec Loader */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Vérification en cours...</span>
              </>
            ) : (
              'Se connecter au portail'
            )}
          </button>
        </form>

        {/* Footer de la carte */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 italic">
            Conforme aux normes fiscales de la DGI
          </p>
        </div>
      </div>
    </div>
  );
}
