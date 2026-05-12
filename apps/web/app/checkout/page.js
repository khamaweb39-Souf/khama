'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../stores/cartStore';
import { CreditCard, Truck, MapPin, Phone, User as UserIcon } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    wilaya: '',
    commune: '',
    address: '',
    paymentMethod: 'COD'
  });

  // توجيه المستخدم إذا كانت السلة فارغة
  useEffect(() => {
    if (items.length === 0 && !loading) {
      router.push('/');
    }
  }, [items, loading, router]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token'); // سنفترض وجود نظام Token
      const res = await fetch('http://localhost:3005/api/v1/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity
          })),
          ...form
        })
      });
      
      if (res.ok) {
        clearCart();
        router.push('/orders/success');
      } else {
        const err = await res.json();
        alert(err.error || 'فشل إرسال الطلب');
      }
    } catch (err) {
      alert('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };
  
  const total = getTotal();
  const shipping = 400; // شحن افتراضي
  
  return (
    <div className="max-w-2xl mx-auto p-4 pb-32">
      <h1 className="text-2xl font-bold mb-8 text-burgundy">إتمام الطلب</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* معلومات التوصيل */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-gold" />
            معلومات الشحن
          </h2>
          
          <div className="relative">
            <UserIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.customerName}
              onChange={e => setForm({...form, customerName: e.target.value})}
              className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-gold"
              required
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.customerPhone}
              onChange={e => setForm({...form, customerPhone: e.target.value})}
              className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-gold"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.wilaya}
              onChange={e => setForm({...form, wilaya: e.target.value})}
              className="p-3 border rounded-xl outline-none focus:border-gold"
              required
            >
              <option value="">اختر الولاية</option>
              <option value="16">الجزائر (16)</option>
              <option value="31">وهران (31)</option>
              <option value="06">بجاية (06)</option>
            </select>
            
            <input
              type="text"
              placeholder="البلدية"
              value={form.commune}
              onChange={e => setForm({...form, commune: e.target.value})}
              className="p-3 border rounded-xl outline-none focus:border-gold"
              required
            />
          </div>
          
          <div className="relative">
             <MapPin className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
             <textarea
              placeholder="العنوان بالتفصيل (نهج، رقم الدار...)"
              value={form.address}
              onChange={e => setForm({...form, address: e.target.value})}
              className="w-full p-3 pr-10 border rounded-xl outline-none focus:border-gold h-24"
              required
            />
          </div>
        </section>
        
        {/* طريقة الدفع */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-gold" />
            طريقة الدفع
          </h2>
          
          <div className="space-y-3">
            {[
              { id: 'COD', label: 'الدفع عند الاستلام', icon: '💵' },
              { id: 'BARIDIMOB', label: 'بريدي موب (تحويل)', icon: '📱' },
            ].map(method => (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all
                  ${form.paymentMethod === method.id ? 'border-burgundy bg-burgundy/5' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={form.paymentMethod === method.id}
                  onChange={e => setForm({...form, paymentMethod: e.target.value})}
                  className="w-5 h-5 accent-burgundy"
                />
                <span className="text-2xl">{method.icon}</span>
                <span className="font-bold text-gray-700">{method.label}</span>
              </label>
            ))}
          </div>
        </section>
        
        {/* الملخص النهائي */}
        <section className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg">
          <div className="space-y-3">
            <div className="flex justify-between text-white/70">
              <span>المجموع الفرعي</span>
              <span>{total.toLocaleString()} دج</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>مصاريف التوصيل</span>
              <span>{shipping.toLocaleString()} دج</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 border-t border-white/10">
              <span>الإجمالي النهائي</span>
              <span className="text-gold">{(total + shipping).toLocaleString()} دج</span>
            </div>
          </div>
        </section>
        
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="w-full py-5 bg-burgundy text-white text-lg font-black rounded-2xl shadow-xl
                     hover:bg-burgundy-dark transition-all disabled:opacity-50 transform active:scale-95"
        >
          {loading ? 'جاري معالجة الطلب...' : 'تأكيد الطلب وشراء الآن'}
        </button>
      </form>
    </div>
  );
}
