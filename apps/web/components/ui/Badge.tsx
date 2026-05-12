import React from 'react';
import { CheckCircle2, ShieldCheck, Leaf, Globe, Star } from 'lucide-react';

export type BadgeType = 'GOTS' | 'OEKO-TEX' | 'ISO' | 'BCI' | 'FAIR-TRADE' | 'ORGANIC' | 'PREMIUM' | 'VERIFIED';

interface BadgeProps {
  type: BadgeType;
  label?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ type, label, className = '' }) => {
  const configs = {
    GOTS: { color: 'bg-sage/10 text-sage border-sage/20', icon: Leaf, text: 'GOTS Organic' },
    'OEKO-TEX': { color: 'bg-burgundy/10 text-burgundy border-burgundy/20', icon: ShieldCheck, text: 'OEKO-TEX®' },
    ISO: { color: 'bg-gray-100 text-charcoal border-gray-200', icon: Globe, text: 'ISO Certified' },
    BCI: { color: 'bg-blue-50 text-blue-700 border-blue-100', icon: CheckCircle2, text: 'BCI Cotton' },
    'FAIR-TRADE': { color: 'bg-sienna/10 text-sienna border-sienna/20', icon: Star, text: 'Fair Trade' },
    ORGANIC: { color: 'bg-green-50 text-green-700 border-green-100', icon: Leaf, text: 'Organic' },
    PREMIUM: { color: 'bg-gold/10 text-gold-dark border-gold/20', icon: Star, text: 'Premium' },
    VERIFIED: { color: 'bg-blue-600 text-white border-transparent', icon: CheckCircle2, text: 'Verified' },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${config.color} ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{label || config.text}</span>
    </div>
  );
};

export default Badge;
