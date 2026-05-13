import React from 'react';
import FabricCard from './FabricCard';
import { FabricCardProps } from '../types/fabric';

const MOCK_FABRICS: FabricCardProps[] = [
  {
    id: '1',
    name: 'Sergé de Soie Lyonnaise',
    reference: 'SL-2026-001',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
    collection: 'SS26',
    certifications: ['GOTS', 'OEKO-TEX'],
    sustainabilityScore: 5,
    createdAt: new Date().toISOString(),
    supplier: {
      id: 's1',
      name: 'Tissage de Lyon',
      avatar: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=100&auto=format&fit=crop',
      isVerified: true
    },
    origin: { country: 'France', flag: '🇫🇷' },
    composition: [
      { fiber: 'Soie', percentage: 95, color: '#C9A84C' },
      { fiber: 'Élasthanne', percentage: 5, color: '#2D3561' }
    ],
    technicalSpecs: {
      gsm: 85,
      width: 140,
      weave: 'Sergé 2/1',
      colorsAvailable: ['#FFFFFF', '#F5F0E8', '#C9A84C'],
      totalColors: 12
    },
    commercial: {
      price: 24.50,
      currency: '€',
      unit: 'm',
      moq: 50,
      stockStatus: 'IN_STOCK'
    }
  },
  {
    id: '2',
    name: 'Lin Normand Lavé',
    reference: 'LN-2026-042',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    collection: 'PERMANENT',
    certifications: ['OEKO-TEX', 'REACH'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: {
      id: 's2',
      name: 'Normandie Textiles',
      avatar: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=100&auto=format&fit=crop',
      isVerified: true
    },
    origin: { country: 'France', flag: '🇫🇷' },
    composition: [
      { fiber: 'Lin', percentage: 100, color: '#9E8E7E' }
    ],
    technicalSpecs: {
      gsm: 210,
      width: 150,
      weave: 'Toile',
      colorsAvailable: ['#F5F0E8', '#9E8E7E', '#4A7C59'],
      totalColors: 24
    },
    commercial: {
      price: 18.20,
      currency: '€',
      unit: 'm',
      moq: 100,
      stockStatus: 'ON_ORDER',
      leadTimeWeeks: 4
    }
  },
  {
    id: '3',
    name: 'Coton Bio Certifié GOTS',
    reference: 'CB-2026-015',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    collection: 'ECO-FRIENDLY',
    certifications: ['GOTS', 'OEKO-TEX'],
    sustainabilityScore: 5,
    createdAt: new Date().toISOString(),
    supplier: {
      id: 's3',
      name: 'BioTex Algeria',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop',
      isVerified: true
    },
    origin: { country: 'Algeria', flag: '🇩🇿' },
    composition: [
      { fiber: 'Coton Bio', percentage: 100, color: '#FFFFFF' }
    ],
    technicalSpecs: {
      gsm: 160,
      width: 160,
      weave: 'Jersey',
      colorsAvailable: ['#FFFFFF', '#E8E8E8'],
      totalColors: 8
    },
    commercial: {
      price: 12.50,
      currency: '€',
      unit: 'm',
      moq: 200,
      stockStatus: 'IN_STOCK'
    }
  },
  {
    id: '4',
    name: 'Velours Côtelé Premium',
    reference: 'VC-2026-088',
    image: 'https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=800&auto=format&fit=crop',
    collection: 'SS26',
    certifications: ['OEKO-TEX'],
    sustainabilityScore: 3,
    createdAt: new Date().toISOString(),
    supplier: {
      id: 's4',
      name: 'Tissage d\'Oran',
      avatar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop',
      isVerified: true
    },
    origin: { country: 'Algeria', flag: '🇩🇿' },
    composition: [
      { fiber: 'Coton', percentage: 98, color: '#4A3728' },
      { fiber: 'Élasthanne', percentage: 2, color: '#000000' }
    ],
    technicalSpecs: {
      gsm: 320,
      width: 145,
      weave: 'Velours',
      colorsAvailable: ['#4A3728', '#2D3561', '#5C1D1D'],
      totalColors: 15
    },
    commercial: {
      price: 15.80,
      currency: '€',
      unit: 'm',
      moq: 30,
      stockStatus: 'IN_STOCK'
    }
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <span className="text-label text-gold">المجموعة المختارة</span>
          <h2 className="text-headline mb-0">أحدث الخامات التقنية</h2>
        </div>
        <button className="text-label text-burgundy hover:text-gold border-b border-burgundy hover:border-gold pb-1 transition-all">
          عرض الكتالوج الكامل
        </button>
      </div>

      <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-8 no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
        {MOCK_FABRICS.map((fabric) => (
          <div key={fabric.id} className="min-w-[320px] lg:min-w-0">
            <FabricCard {...fabric} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
