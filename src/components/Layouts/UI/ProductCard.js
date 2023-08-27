import { addProduct } from "@/redux/build/buildSlice";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function ProductCard({ product, forBuild,featured }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleAdd = (category, product) => {
        const status = product.status;
        if (status === 'Out of Stock') {
            window.alert('This product is out of stock !')
            return
        }
        dispatch(addProduct({ category, product }));
        router.push('/builder')
    };

    return (
        <div className="">
            <Card className="">
                <CardHeader shadow={false} floated={false} className="h-[300px]">
                    <img
                        src={product?.img}
                        alt="card-image"
                        className="h-full w-full fill"
                    />
                </CardHeader>
                <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-extrabold text-xs">
                            {product?.category}
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-0.5 h-5 w-5 text-yellow-700"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {product?.average_rating}
                        </Typography>
                    </div>
                    <Typography color="blue-gray" className="font-bold">
                        {product?.product_name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        {product?.price} ৳
                    </Typography>
                    <Typography color="blue-gray" className="font-medium text-sm">
                        {product?.status}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    {forBuild ? <Button
                        onClick={() => handleAdd(product?.category, product)}
                        ripple={false}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        ADD TO BUILD
                    </Button>
                        :
                        <Link href={`/products/single_product/${product?._id}`}>
                            <Button
                                ripple={false}
                                fullWidth={true}
                                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                                view details
                            </Button>
                        </Link>}
                </CardFooter>
            </Card>
        </div>
    )
}