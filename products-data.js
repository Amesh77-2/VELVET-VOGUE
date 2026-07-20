/* ══════════════════════════════════
   VÈLO — products-data.js
   Shared product store (localStorage)
══════════════════════════════════ */

const VELO_KEY = 'velo_products_v1';

const VELO_DEFAULT_PRODUCTS = [
  {
    id: 'p1', name: 'Silk Wrap Dress', category: 'Dresses', material: 'Mulberry Silk',
    price: 890, oldPrice: null, badgeType: 'new', badgeLabel: 'New', isNew: true,
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    colors: ['#C9A89A', '#1C1C1C', '#F7F3EE'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p2', name: 'Tailored Wool Coat', category: 'Outerwear', material: 'Virgin Wool',
    price: 1480, oldPrice: null, badgeType: 'limited', badgeLabel: 'Limited', isNew: false,
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
    colors: ['#1C1C1C', '#C4A882'], sizes: ['XS', 'S', 'M']
  },
  {
    id: 'p3', name: 'Ribbed Cashmere Top', category: 'Tops', material: '100% Cashmere',
    price: 420, oldPrice: 560, badgeType: 'sale', badgeLabel: '−25%', isNew: false,
    img: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    colors: ['#C4A882', '#1C1C1C', '#F7F3EE', '#9AAABF'], sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p4', name: 'Wide Linen Trouser', category: 'Trousers', material: 'Belgian Linen',
    price: 338, oldPrice: 450, badgeType: 'none', badgeLabel: '', isNew: false,
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    colors: ['#8A9E88', '#D9B8A8'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p5', name: 'Satin Midi Skirt', category: 'Skirts', material: 'Duchess Satin',
    price: 580, oldPrice: null, badgeType: 'new', badgeLabel: 'New', isNew: true,
    img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80',
    colors: ['#A0432A', '#1C1C1C'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p6', name: 'Leather Tote Bag', category: 'Accessories', material: 'Full-Grain Leather',
    price: 1150, oldPrice: null, badgeType: 'limited', badgeLabel: 'Exclusive', isNew: false,
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    colors: ['#4E3A2E', '#C4A882', '#1C1C1C'], sizes: ['One Size']
  },
  {
    id: 'p7', name: 'Oversized Linen Blazer', category: 'Outerwear', material: 'Washed Linen',
    price: 760, oldPrice: 950, badgeType: 'none', badgeLabel: '', isNew: false,
    img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    colors: ['#8A9E88', '#D9B8A8', '#1C1C1C'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p8', name: 'Draped Jersey Maxi', category: 'Dresses', material: 'Viscose Jersey',
    price: 650, oldPrice: null, badgeType: 'new', badgeLabel: 'New', isNew: true,
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    colors: ['#1C1C1C', '#A0432A'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p9', name: 'Silk Camisole', category: 'Tops', material: 'Pure Silk',
    price: 280, oldPrice: 400, badgeType: 'sale', badgeLabel: '−30%', isNew: false,
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80',
    imgAlt: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80',
    colors: ['#F7F3EE', '#C9A89A', '#1C1C1C'], sizes: ['XS', 'S', 'M', 'L']
  }
];

function veloGetProducts() {
  const raw = localStorage.getItem(VELO_KEY);
  if (!raw) {
    veloSaveProducts(VELO_DEFAULT_PRODUCTS);
    return VELO_DEFAULT_PRODUCTS.slice();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : VELO_DEFAULT_PRODUCTS.slice();
  } catch (e) {
    return VELO_DEFAULT_PRODUCTS.slice();
  }
}

function veloSaveProducts(products) {
  localStorage.setItem(VELO_KEY, JSON.stringify(products));
}

function veloAddProduct(product) {
  const products = veloGetProducts();
  product.id = 'p' + Date.now();
  products.push(product);
  veloSaveProducts(products);
  return product;
}

function veloUpdateProduct(id, updates) {
  const products = veloGetProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = Object.assign({}, products[idx], updates);
  veloSaveProducts(products);
  return products[idx];
}

function veloDeleteProduct(id) {
  const products = veloGetProducts().filter(p => p.id !== id);
  veloSaveProducts(products);
}

function veloResetProducts() {
  veloSaveProducts(VELO_DEFAULT_PRODUCTS);
}

function veloFormatPrice(n) {
  return '$' + Number(n).toLocaleString();
}

function veloBadgeClass(type) {
  if (type === 'new') return 'badge-new';
  if (type === 'sale') return 'badge-sale';
  if (type === 'limited') return 'badge-ltd';
  return '';
}
