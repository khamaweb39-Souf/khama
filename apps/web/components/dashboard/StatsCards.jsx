import { TrendingUp, Package, Eye, Wallet } from 'lucide-react';

export default function StatsCards({ stats = { todaySales: 0, newOrders: 0, visitors: 0, balance: 0, salesTrend: 0 } }) {
  const cards = [
    {
      title: 'مبيعات اليوم',
      value: `${stats.todaySales.toLocaleString()} دج`,
      icon: TrendingUp,
      trend: stats.salesTrend,
      color: 'bg-green-500'
    },
    {
      title: 'الطلبات الجديدة',
      value: stats.newOrders,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'الزوار',
      value: stats.visitors,
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      title: 'الرصيد المتاح',
      value: `${stats.balance.toLocaleString()} دج`,
      icon: Wallet,
      color: 'bg-gold'
    }
  ];
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center shadow-lg shadow-${card.color.split('-')[1]}-200`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            {card.trend && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {card.trend > 0 ? '↑' : '↓'} {Math.abs(card.trend)}%
              </span>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-black text-gray-900">{card.value}</h4>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
