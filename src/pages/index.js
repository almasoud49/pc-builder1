import RootLayout from '@/components/Layouts/RootLayout';
import Loading from '@/components/Layouts/UI/Loading';
import dynamic from 'next/dynamic';

import React from 'react';

const Banner = dynamic(() => import('@/components/Layouts/UI/Banner'), {
  loading: () => <Loading />,
});

const FeaturedCategory = dynamic(() => import('@/components/Layouts/UI/FeaturedCategory'), {
  loading: () => <Loading />,
});

const FeaturedProducts = dynamic(() => import('@/components/Layouts/UI/FeaturedProducts'), {
  loading: () => <Loading />,
});

export default function HomePage(props) {
  const { products, categories } = props;
  return (
    <div>
      <Banner />
      <FeaturedCategory categories={categories} />
      <FeaturedProducts products={products} />
    </div>
  );
}


HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};


export const getStaticProps = async () => {
  try {
    // Fetch products
    const productResponse = await fetch(`${process.env.URL}/api/products`);
    if (!productResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    const productData = await productResponse.json();
    const products = productData?.data || [];

    // Fetch categories
    const categorieResponse = await fetch(`${process.env.URL}/api/categories`);
    if (!categorieResponse.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categorieData = await categorieResponse.json();
    const categories = categorieData?.data || [];

    return {
      props: {
        products,
        categories,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        products: [],
        categories: [],
      },
      revalidate: 10,
    };
  }
};