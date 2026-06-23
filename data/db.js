export const database = {
  categories: [
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
    { id: 'bakery', name: 'Bakery', icon: '🥐' },
    { id: 'beverages', name: 'Beverages', icon: '🧃' },
    { id: 'snacks', name: 'Snacks & Sweets', icon: '🍫' },
    { id: 'pantry', name: 'Pantry', icon: '🥫' },
    { id: 'frozen', name: 'Frozen Foods', icon: '🧊' }
  ],
  products: [
    { id: 'p1', categoryId: 'c1', name: 'Organic Bananas', price: 2.99, unit: 'bunch', stock: 150, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&q=80', description: 'Fresh, organic bananas from Ecuador. Perfect for smoothies or a quick snack.', tags: ['Organic', 'Fresh', 'Fruit'], isNew: false, isSale: true, originalPrice: 3.49 },
    { id: 'p2', categoryId: 'c2', name: 'Premium Angus Beef Ribeye', price: 24.99, unit: 'lb', stock: 45, rating: 4.9, reviews: 856, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80', description: 'USDA Prime Angus Beef Ribeye Steak. Exceptional marbling for maximum flavor and tenderness.', tags: ['Meat', 'Premium', 'Steak'], isNew: true, isSale: false },
    { id: 'p3', categoryId: 'c1', name: 'Hass Avocados', price: 4.50, unit: '3-pack', stock: 200, rating: 4.7, reviews: 3200, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80', description: 'Perfectly ripe Hass avocados. Rich, creamy, and ready to eat.', tags: ['Fresh', 'Vegetable', 'Superfood'], isNew: false, isSale: false },
    { id: 'p4', categoryId: 'c3', name: 'Free Range Eggs', price: 5.99, unit: 'dozen', stock: 80, rating: 4.9, reviews: 1500, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80', description: 'Farm-fresh, free-range large brown eggs.', tags: ['Dairy', 'Organic', 'Local'], isNew: false, isSale: false },
    { id: 'p5', categoryId: 'c4', name: 'Extra Virgin Olive Oil', price: 14.99, unit: '750ml', stock: 120, rating: 4.8, reviews: 920, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80', description: 'Cold-pressed extra virgin olive oil from Italy. Perfect for salads and cooking.', tags: ['Pantry', 'Imported', 'Organic'], isNew: false, isSale: false },
    { id: 'p6', categoryId: 'c1', name: 'Fresh Strawberries', price: 4.99, unit: '16 oz', stock: 60, rating: 4.6, reviews: 840, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80', description: 'Sweet and juicy fresh strawberries from local farms.', tags: ['Fresh', 'Fruit', 'Local'], isNew: false, isSale: true, originalPrice: 6.99 },
    { id: 'p7', categoryId: 'c6', name: 'Artisan Sourdough Bread', price: 6.50, unit: 'loaf', stock: 25, rating: 4.9, reviews: 450, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fa08?w=500&q=80', description: 'Freshly baked artisan sourdough bread with a crispy crust and soft interior.', tags: ['Bakery', 'Fresh', 'Artisan'], isNew: true, isSale: false },
    { id: 'p8', categoryId: 'c2', name: 'Wild Caught Salmon Fillet', price: 18.99, unit: 'lb', stock: 30, rating: 4.8, reviews: 670, image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500&q=80', description: 'Fresh wild-caught Alaskan salmon fillet. Rich in Omega-3.', tags: ['Seafood', 'Fresh', 'Premium'], isNew: false, isSale: false },
    { id: 'p9', categoryId: 'c5', name: 'Cold Brew Coffee', price: 4.50, unit: '16 oz', stock: 100, rating: 4.7, reviews: 1120, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80', description: 'Smooth, bold cold brew coffee, steeped for 18 hours.', tags: ['Beverage', 'Coffee'], isNew: false, isSale: false },
    { id: 'p10', categoryId: 'c4', name: 'Organic Honey', price: 9.99, unit: '12 oz', stock: 85, rating: 4.9, reviews: 2100, image: 'https://images.unsplash.com/photo-1587049352847-4d4b127a6905?w=500&q=80', description: '100% raw organic honey from local beekeepers.', tags: ['Pantry', 'Organic', 'Local'], isNew: false, isSale: false },
    { id: 'p11', categoryId: 'c1', name: 'Heirloom Tomatoes', price: 5.99, unit: 'lb', stock: 40, rating: 4.8, reviews: 560, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', description: 'Colorful, sweet, and juicy heirloom tomatoes.', tags: ['Fresh', 'Vegetable', 'Organic'], isNew: false, isSale: false },
    { id: 'p12', categoryId: 'c3', name: 'Aged Cheddar Cheese', price: 8.50, unit: '8 oz', stock: 65, rating: 4.7, reviews: 890, image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&q=80', description: 'Sharp cheddar cheese aged for 24 months.', tags: ['Dairy', 'Premium'], isNew: false, isSale: true, originalPrice: 10.50 }
  ],
  promotions: [
    { id: 'promo1', title: 'Summer Fresh Sale', discount: 'Up to 30% Off', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80', link: '#category/c1' },
    { id: 'promo2', title: 'Premium Cuts', discount: 'Buy 1 Get 1 50% Off', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80', link: '#category/c2' },
    { id: 'promo3', title: 'Organic Essentials', discount: 'Free Shipping', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80', link: '#category/c8' }
  ],
  user: {
    id: 'u1',
    name: 'Valued Customer',
    address: '123 Tech Boulevard, Innovation City, 94043',
    loyaltyPoints: 2450,
    tier: 'Gold',
    cart: [],
    favorites: ['p2', 'p5', 'p8']
  }
};
