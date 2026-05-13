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
}

export interface FabricCardProps {
  id: string;
  name: string;
  reference: string;
  image: string;
  collection: CollectionType;
  certifications: Certification[];
  sustainabilityScore: number; // 1-5
  createdAt: string; // ISO date
  supplier: SupplierInfo;
  origin: {
    country: string;
    flag: string;
  };
  composition: FiberComposition[];
  technicalSpecs: {
    gsm: number;
    width: number;
    weave: string;
    colorsAvailable: string[]; // hex codes
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
