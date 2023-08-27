import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import avatar from '../../assets/navbar/avatar.png';
import Image from "next/image";

export default function ProductDetailsCard({ product }) {
  const { data: session } = useSession();
  const [userReview, setUserReview] = useState({
    individual_rating: 0,
    review_description: "",
  });

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value)
    if(value>5){
      return window.alert('Rating can not be greater than 5 !')
    }
    setUserReview((prevReview) => ({
      ...prevReview,
      individual_rating: value,
    }));
  };

  const handleReviewChange = (event) => {
    setUserReview((prevReview) => ({
      ...prevReview,
      review_description: event.target.value,
    }));
  };

  const handleSubmitReview = async () => {
    const reviewData = {
      ...userReview,
      reviewer_image: session?.user?.image || '',
      reviewer_name: session?.user?.name || '',
    };
  
    try {
      const response = await fetch(`https://pc-builder-server-ashen.vercel.app/update-product?id=${product?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        console.log("Failed to update product.");
      }
  
      const data = await response.json();
    
  
      setUserReview({
        individual_rating: 0,
        review_description: "",
      });

      window.alert('Review Submitted !')
    } catch (error) {
      console.error("Error updating product:", {error});
    }
  };
  

  if (!product) {
    return <div>No product details available.</div>;
  }

  return (
    <div className="flex justify-center w-full p-[20px]">
      <div className="flex flex-col gap-2">
        <Card className="w-full max-w-[48rem] flex-col md:flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 md:w-2/5 shrink-0 md:rounded-r-none"
          >
            <img
              src={product.img}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="blue" className="mb-4 uppercase">
              {product.category}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {product.product_name}
            </Typography>
            <Typography color="gray" className="mb-4 font-normal">
              {product.description}
            </Typography>
            <div>
              <Typography color="gray" className="font-normal flex items-center gap-2">
                <Typography variant="subtitle" color="blue" className="mb-1">
                  Rating:
                </Typography>{" "}
                {product.average_rating} / 5
              </Typography>
              <Typography color="gray" className="font-normal flex items-center gap-2">
                <Typography variant="subtitle" color="blue" className="mb-1">
                  Price:
                </Typography>{" "}
                {product.price} ৳
              </Typography>
            </div>
            <div className="mb-4">
              <Typography color="gray" className="font-normal flex items-center gap-2">
                <Typography variant="subtitle" color="blue" className="mb-1">
                  Status:
                </Typography>{" "}
                {product.status}
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-4 p-[20px]">
          <Typography variant="subtitle1" color="blue" className="mb-1">
            Key Features:
          </Typography>
          {product.key_features ? (
            <ul className="list-disc pl-6">
              {Object.entries(product.key_features).map(([title, description], idx) => (
                <li key={idx}>
                  <strong>{title}: </strong>
                  {description}
                </li>
              ))}
            </ul>
          ) : (
            <Typography color="gray">No key features available.</Typography>
          )}
        </Card>
        <Card className="my-8 p-[20px]">
          <Typography variant="subtitle" color="blue" className="mb-1">
            Reviews:
          </Typography>
          {product.reviews?.length ? (
            product.reviews.map((review, idx) => (
              <Card
                key={idx}
                color="transparent"
                shadow={false}
                className="w-full max-w-full mb-4"
              >
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="mx-0 flex items-center gap-4 pt-0 pb-8"
                >
                  <Image  
                  src={review?.reviewer_image || avatar}  
                  alt={review?.reviewer_name}
                  height={50}
                  width={50}
                  className="rounded-full"
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        {review?.reviewer_name}
                      </Typography>
                      <div className="flex items-center gap-2">
                      <p>{review?.individual_rating || 0}</p>
                      <p>{StarIcon()}</p>
                      </div>
                    </div>
                    <Typography color="blue-gray">{review?.review_description}</Typography>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Typography color="gray">No reviews available.</Typography>
          )}
        </Card>
        {session && session?.user ? (
          <Card className="my-8 p-[20px]">
            <Typography variant="subtitle" color="blue" className="mb-1">
              Add a review:
            </Typography>
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="5"
                  label='Rating'
                  value={userReview.individual_rating}
                  onChange={handleRatingChange}
                  className="border"
                />
              </div>
              <Textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                label='Review'
                value={userReview.review_description}
                onChange={handleReviewChange}
              />
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </div>
          </Card>
        ) : (
          <Typography color="gray">Log in to write a review?.</Typography>
        )}
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700 mb-1"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}