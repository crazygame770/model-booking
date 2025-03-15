export interface Villa {
  name: string;
  location: string;
  isWaterfront: boolean;
  price: number;
  tax: number;
  exitCleaningFee: number;
  securityDeposit: number;
  minStayWeeks: number;
  images: string[];
}

export const villas: Villa[] = [
  {
    name: 'Villa Sabal',
    location: 'Venetian Island',
    isWaterfront: true,
    price: 10500,
    tax: 14,
    exitCleaningFee: 500,
    securityDeposit: 20000,
    minStayWeeks: 1,
    images: [
      '/images/villas/Sabal1.jpg',
      '/images/villas/Sabal2.jpg',
      '/images/villas/Sabal3.jpg',
      '/images/villas/Sabal4.jpg',
      '/images/villas/Sabal5.jpg',
      '/images/villas/Sabal6.jpg',
      '/images/villas/Sabal7.jpg',
      '/images/villas/Sabal8.jpg',
      '/images/villas/Sabal9.jpg',
      '/images/villas/Sabal10.jpg',
    ]
  },
  {
    name: 'Villa Divina',
    location: 'Venetian Islands',
    isWaterfront: true,
    price: 12500,
    tax: 14,
    exitCleaningFee: 500,
    securityDeposit: 20000,
    minStayWeeks: 1,
    images: [
      '/images/villas/Divina1.jpg',
      '/images/villas/Divina2.jpeg',
    ]
  }
  // Add more villas here as needed
];
