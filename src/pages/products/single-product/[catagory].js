import RootLayout from '@/components/Layouts/RootLayout';
import ProductCard from '@/components/UI/ProductCard';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProductByCategory(props) {
  const {products} = props;
  const router = useRouter();
  const forBuild = router?.query?.forbuild;
  if(!products?.length){
    return (
      <div className='p-[20px]'>
        <p>No products found in this category !</p>
      </div>
    )
  }
  const {category} = products[0];
  
  return (
    <div className='text-center p-[20px]'>
       <p className='text-xl font-bold'>{category}</p>
            <p className='pt-[20px] pb-[50px] font-thin '>Check & Get Your Desired {category}!</p>
            <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-start'>
                {products?.map(product => <div key={product._id}>
                    <ProductCard product={product} forBuild={forBuild}/>
                </div>)}
            </div>
    </div>
  );
}

ProductByCategory.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  try {
    const productResponse = await fetch(`${process.env.URL}/api/products`);
    if (!productResponse.ok) {
      throw new Error('Failed to fetch products');
    }
    const productData = await productResponse.json();
    const products = productData?.data || [];

    const paths = products.map((product) => ({
      params: { category: product.category}
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps = async ({ params }) => {
  const { category } = params;
  try {
    const productResponse = await fetch(`${process.env.URL}/api/products?category=${category}`);
    if (!productResponse.ok) {
      throw new Error('Failed to fetch product');
    }
    const productData = await productResponse.json();
    const products = productData?.data || [];

    return {
      props: {
        products,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        products: [],
      },
      revalidate: 10,
    };
  }
};