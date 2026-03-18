// /lib/mock-data.ts
import { Product, Stat } from './index';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Modern Brochure Template',
    description: 'Minimalist InDesign layout for corporate use.',
    price: 29.00,
    category: 'InDesign',
    previewUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c',
    fileUrl: '#'
  },
  {
    id: '2',
    title: '808 Bass Hits',
    description: 'High-quality drum samples for trap and hip-hop.',
    price: 15.00,
    category: 'Audio',
    previewUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
    fileUrl: '#'
  }
];

export const ADMIN_STATS: Stat[] = [
  { label: 'Total Sales', value: '$12,840', trend: '+12%', isPositive: true },
  { label: 'Active Users', value: '1,205', trend: '+5%', isPositive: true },
  { label: 'Downloads', value: '450', trend: '-2%', isPositive: false },
];