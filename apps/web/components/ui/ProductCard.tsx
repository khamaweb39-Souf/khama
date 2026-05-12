import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import Badge, { BadgeType } from './Badge';
import FiberTag from './FiberTag';
import Button from './Button';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  badges?: BadgeType[];
  composition?: { name: string; percentage: number }[];
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  unit,
  image,
  badges = [],
  composition = [],
  isNew = false,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container with Overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ecru">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">جديد</span>
          )}
          {badges.map((badge, idx) => (
            <Badge key={idx} type={badge} />
          ))}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-burgundy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-gold hover:text-white transition-colors shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-burgundy hover:bg-gold hover:text-white transition-colors shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-label text-muted mb-1">{category}</span>
          <Link href={`/product/${id}`} className="text-subheading !text-lg text-charcoal hover:text-gold transition-colors line-clamp-1">
            {name}
          </Link>
        </div>

        {/* Technical Info (Fiber Composition) */}
        {composition.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <FiberTag compositions={composition} />
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-ecru">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted uppercase font-bold">السعر المقدر</span>
            <div className="flex items-baseline gap-1">
              <span className="text-title !text-xl text-burgundy">{price}</span>
              <span className="text-xs text-muted">/{unit}</span>
            </div>
          </div>
          
          <button className="w-12 h-12 bg-ecru hover:bg-gold text-charcoal hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
