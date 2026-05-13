export type CollectionType = 'SS26' | 'FW26' | 'PERMANENT' | 'ECO-FRIENDLY';
export type StockStatus = 'IN_STOCK' | 'ON_ORDER' | 'PRE_ORDER';
export type Certification = 'GOTS' | 'OEKO-TEX' | 'ISO' | 'REACH' | 'BCI' | 'BLUESIGN';

export interface FiberComposition {
  fiber: string;
  percentage: number;
  color: string;
}

export interface SupplierInfo {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  totalProducts: number;
  location: string;
  country: string;
  flag: string;
  logo: string;
}

export interface PricingTier {
  minQuantity: number;
  price: number;
}

export interface FabricDetail {
  id: string;
  nameAr: string;
  nameFr: string;
  reference: string;
  description: string;
  longDescription: string;
  images: string[];
  collection: CollectionType;
  certifications: {
    type: Certification;
    name: string;
    description: string;
    image: string;
  }[];
  sustainabilityScore: number;
  createdAt: string;
  supplier: SupplierInfo;
  composition: FiberComposition[];
  technicalSpecs: {
    gsm: number;
    width: number;
    weave: string;
    weaveImage: string;
    density: string;
    shrinkage: string;
    martindale: number;
    colorFastness: string;
    colorsAvailable: { hex: string; name: string }[];
  };
  commercial: {
    price: number;
    currency: string;
    unit: string;
    moq: number;
    stockStatus: StockStatus;
    leadTimeWeeks: number;
    pricingTiers: PricingTier[];
  };
}

export interface FabricCardProps {
  id: string;
  name: string;
  reference: string;
  image: string;
  collection: CollectionType;
  certifications: Certification[];
  sustainabilityScore: number;
  createdAt: string;
  supplier: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  origin: {
    country: string;
    flag: string;
  };
  composition: FiberComposition[];
  technicalSpecs: {
    gsm: number;
    width: number;
    weave: string;
    colorsAvailable: string[];
    totalColors: number;
  };
  commercial: {
    price: number | 'QUOTE_ONLY';
    currency: string;
    unit: string;
    moq: number;
    stockStatus: StockStatus;
    leadTimeWeeks?: number;
  };
  viewVariant?: 'grid' | 'list' | 'compact';
}
