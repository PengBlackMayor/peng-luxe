import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { products } from "../src/data/products";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing from .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

function cleanImageUrl(url: string): string {
  // If an image accidentally contains Markdown:
  // [https://example.com/image.jpg](https://example.com/image.jpg)
  // extract only the actual URL.
  const markdownMatch = url.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);

  if (markdownMatch) {
    return markdownMatch[2];
  }

  return url.trim();
}

function cleanImages(images: string[]): string[] {
  return images
    .map(cleanImageUrl)
    .filter((url) => url.startsWith("http://") || url.startsWith("https://"));
}

async function main() {
  console.log("🌱 Starting PENG-LUXE product seed...\n");

  let seeded = 0;

  for (const product of products) {
    const images = cleanImages(product.images);

    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },

      update: {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription ?? null,
        price: product.price,
        category: product.category,
        images,
        colors: product.colors ?? [],
        sizes: product.sizes ?? [],
        featured: product.featured ?? false,
        isNew: product.new ?? false,
        stock: 20,
        active: true,
      },

      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription ?? null,
        price: product.price,
        category: product.category,
        images,
        colors: product.colors ?? [],
        sizes: product.sizes ?? [],
        featured: product.featured ?? false,
        isNew: product.new ?? false,
        stock: 20,
        active: true,
      },
    });

    seeded++;

    console.log(`✓ ${product.name}`);
    console.log(`  Images: ${images.length}`);
  }

  console.log("\n────────────────────────────────");
  console.log(`✅ ${seeded} products seeded successfully!`);
  console.log("────────────────────────────────\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });