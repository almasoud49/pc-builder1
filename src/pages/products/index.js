import RootLayout from "@/components/Layouts/RootLayout";
import ProductCard from "@/components/UI/ProductCard";

export default function Products(props) {
    const {products} = props
    return (
        <div className="">
            <p className='text-xl font-bold text-center pt-10'>All Products</p>
            <p className='pt-[20px] pb-[50px] text-center font-thin font-[calibri]'>Check & Get Your Desired Product!</p>
            <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-blue-gray-50 p-2 sm:p-10 '>
                {products?.map(product => <div key={product._id}>
                    <ProductCard product={product}/>
                </div>)}
            </div>
        </div>
    )
}


Products.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
  };

export const getStaticProps = async () => {
  try {
    const productResponse = await fetch(`${process.env.URL}/api/products`);
    if (!productResponse.ok) {
      throw new Error("Failed to fetch products");
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
    console.error("Error fetching data:", error.message);
    return {
      props: {
        products: []
      },
      revalidate: 10,
    };
  }
};