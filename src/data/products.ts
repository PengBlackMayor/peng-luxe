export type Category =
  | "watches"
  | "bags"
  | "jewelry"
  | "sneakers"
  | "fragrance"
  | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
  colors?: string[];
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "watch-001",
    slug: "ocean-chronograph",
    name: "Ocean Chronograph",
    category: "watches",
    price: 2450,
    shortDescription: "A precision chronograph built for modern movement.",
    description:
      "A refined stainless-steel chronograph with a deep ocean dial, luminous markers and a contemporary silhouette.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true,
    new: true,
    colors: ["Steel", "Black"]
  },
  {
    id: "watch-002",
    slug: "monument-automatic",
    name: "Monument Automatic",
    category: "watches",
    price: 3100,
    shortDescription: "Architectural proportions with automatic movement.",
    description:
      "Designed around restraint and precision, Monument combines a polished case with a sophisticated automatic movement.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true
  },
  {
    id: "watch-003",
    slug: "midnight-classic",
    name: "Midnight Classic",
    category: "watches",
    price: 1980,
    shortDescription: "A restrained timepiece with a midnight finish.",
    description:
      "A versatile luxury watch defined by a dark dial, clean markers and an understated polished case.",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=90"
    ]
  },
  {
    id: "bag-001",
    slug: "atelier-mini-bag",
    name: "Atelier Mini Bag",
    category: "bags",
    price: 890,
    shortDescription: "Compact structure with understated character.",
    description:
      "A sculptural everyday bag designed with clean geometry and a refined finish.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true,
    new: true,
    colors: ["Red", "Black", "Cream"]
  },
  {
    id: "bag-002",
    slug: "maison-structured-tote",
    name: "Maison Structured Tote",
    category: "bags",
    price: 1250,
    shortDescription: "A generous silhouette for considered essentials.",
    description:
      "A structured tote balancing functionality, spaciousness and contemporary luxury.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=90"
    ]
  },
  {
    id: "bag-003",
    slug: "noir-carryall",
    name: "Noir Carryall",
    category: "bags",
    price: 1480,
    shortDescription: "A spacious silhouette with a sharp modern profile.",
    description:
      "Designed for movement, the Noir Carryall pairs generous capacity with a refined architectural shape.",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1556306535-38febf6782e7?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true
  },
  {
    id: "jewelry-001",
    slug: "pearl-line-necklace",
    name: "Pearl Line Necklace",
    category: "jewelry",
    price: 620,
    shortDescription: "Quiet detail for everyday expression.",
    description:
      "A delicate pearl composition designed to sit naturally against the neckline.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true
  },
  {
    id: "jewelry-002",
    slug: "sculpted-gold-ring",
    name: "Sculpted Gold Ring",
    category: "jewelry",
    price: 480,
    shortDescription: "A minimal form with a strong presence.",
    description:
      "A sculptural ring designed around smooth curves and timeless proportions.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=90"
    ]
  },
  {
    id: "jewelry-003",
    slug: "arc-statement-earrings",
    name: "Arc Statement Earrings",
    category: "jewelry",
    price: 540,
    shortDescription: "Sculptural shine with a confident silhouette.",
    description:
      "A polished pair designed to bring graphic form and understated luxury to any look.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=90"
    ],
    new: true
  },
  {
    id: "sneaker-001",
    slug: "future-runner",
    name: "Future Runner",
    category: "sneakers",
    price: 390,
    shortDescription: "Contemporary performance with street character.",
    description:
      "A modern sneaker combining expressive proportions with an everyday wearable construction.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=90"
    ],
    new: true,
    featured: true,
    sizes: ["39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: "sneaker-002",
    slug: "studio-low",
    name: "Studio Low",
    category: "sneakers",
    price: 340,
    shortDescription: "A clean low-profile everyday sneaker.",
    description:
      "Minimal lines and a versatile silhouette make Studio Low an effortless daily essential.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=90"
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: "fragrance-001",
    slug: "no-05-eau-de-parfum",
    name: "No. 05 Eau de Parfum",
    category: "fragrance",
    price: 180,
    shortDescription: "A signature scent with quiet confidence.",
    description:
      "A sophisticated fragrance built around warm woods, soft florals and subtle spice.",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=90"
    ],
    featured: true
  },
  {
    id: "fragrance-002",
    slug: "maison-noir",
    name: "Maison Noir",
    category: "fragrance",
    price: 210,
    shortDescription: "Deep, warm and unmistakably modern.",
    description:
      "An evening fragrance with a rich character and an elegant dry-down.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1400&q=90"
    ]
  },
  {
    id: "accessory-001",
    slug: "signature-shades",
    name: "Signature Shades",
    category: "accessories",
    price: 260,
    shortDescription: "Sharp lines. Quiet confidence.",
    description:
      "Contemporary sunglasses designed around a distinctive frame and balanced proportions.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=90"
    ]
  },
  {
    id: "accessory-002",
    slug: "silk-signature-scarf",
    name: "Silk Signature Scarf",
    category: "accessories",
    price: 190,
    shortDescription: "A refined finishing touch.",
    description:
      "A lightweight statement accessory designed to bring texture and personality to everyday dressing.",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1400&q=90"
    ],
    new: true
  }
];

export const categories = [
  {
    slug: "watches",
    name: "Watches",
    subtitle: "Icons of time",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=90"
  },
  {
    slug: "bags",
    name: "Bags",
    subtitle: "Carry elegance",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=90"
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    subtitle: "Quiet brilliance",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90"
  },
  {
    slug: "sneakers",
    name: "Sneakers",
    subtitle: "Move differently",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90"
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    subtitle: "Leave a trace",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=90"
  },
  {
    slug: "accessories",
    name: "Accessories",
    subtitle: "The final detail",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=90"
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
