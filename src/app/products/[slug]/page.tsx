import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";
import { getProduct } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
