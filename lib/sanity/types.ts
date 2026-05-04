import type { SanityImageSource } from '@sanity/image-url';

export interface SanityMake {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: SanityImageSource;
}

export interface SanityFeature {
  _id: string;
  name: string;
  category?: string;
}

export interface SanityLocation {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  isDefault?: boolean;
}

export interface SanityVehicleImage {
  _key: string;
  asset: SanityImageSource;
  alt?: string;
}

export interface SanityVehicle {
  _id: string;
  _createdAt: string;
  slug: { current: string };
  make: SanityMake;
  model: string;
  trim?: string;
  year: number;
  vin?: string;
  bodyType: string;
  category?: string;
  condition: string;
  titleStatus?: string;
  mileage: number;
  mileageUnit: string;
  previousOwners?: number;
  engineDescription?: string;
  engineLayout?: string;
  horsepower?: number;
  transmission?: string;
  transmissionDetails?: string;
  drivetrain?: string;
  fuel: string;
  zeroToSixty?: number;
  topSpeed?: number;
  mpg?: number;
  seats?: number;
  doors?: number;
  exteriorColor?: string;
  exteriorColorFamily?: string;
  interiorColor?: string;
  interiorColorFamily?: string;
  shortIntro?: string;
  description?: string;
  highlights?: string[];
  features?: SanityFeature[];
  equipmentNotes?: string;
  images: SanityVehicleImage[];
  inspectionReportAvailable?: boolean;
  price?: number;
  currency?: string;
  customsStatus?: string;
  registrationStatus?: string;
  acceptsTradeIn?: boolean;
  serviceHistoryAvailable?: boolean;
  availability: string;
  featured?: boolean;
  location: SanityLocation;
}

export type VehicleCard = Pick<
  SanityVehicle,
  | '_id'
  | '_createdAt'
  | 'slug'
  | 'make'
  | 'model'
  | 'trim'
  | 'year'
  | 'bodyType'
  | 'condition'
  | 'mileage'
  | 'mileageUnit'
  | 'price'
  | 'currency'
  | 'featured'
  | 'availability'
  | 'shortIntro'
> & {
  image?: SanityImageSource;
  images?: { _key: string; asset: SanityImageSource }[];
  imageCount?: number;
};
