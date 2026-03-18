// /types/index.ts
export type Category = 'Illustrator' | 'Photoshop' | 'InDesign' | 'Audio' | 'Keyboards' | 'Music';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  previewUrl: string;
  fileUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Stat {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
}