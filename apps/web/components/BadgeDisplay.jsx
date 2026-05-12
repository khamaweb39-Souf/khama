'use client';

const BADGE_STYLES = {
  VERIFIED: 'bg-blue-100 text-blue-700 border-blue-200 shadow-blue-100',
  ON_TIME: 'bg-green-100 text-green-700 border-green-200 shadow-green-100',
  ZERO_DISPUTES: 'bg-gray-100 text-gray-700 border-gray-200',
  MADE_IN_ALGERIA: 'bg-green-100 text-green-700 border-green-200 shadow-green-100',
  GOLD_CUSTOMER: 'bg-gold/10 text-gold-dark border-gold/20 shadow-gold/5',
};

export function BadgeDisplay({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((ub) => {
        const badge = ub.badge;
        const styleClass = BADGE_STYLES[badge.code] || 'bg-gray-50 text-gray-500 border-gray-100';
        
        return (
          <div
            key={badge.code}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border shadow-sm transition-transform hover:scale-105 cursor-default ${styleClass}`}
            title={badge.description}
          >
            <span className="text-sm">{badge.icon}</span>
            <span>{badge.name.ar}</span>
          </div>
        );
      })}
    </div>
  );
}
