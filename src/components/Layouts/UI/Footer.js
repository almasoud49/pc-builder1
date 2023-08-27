import { Typography } from "@material-tailwind/react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-6 gap-x-12 bg-white text-center">
        <div className="flex flex-col items-center md:items-start gap-y-2">
          <p className="text-xl font-[calibri] font-extrabold text-black-600">PC BUILDER</p>
          <p className="text-sm text-blue-gray-600">Shewrapara, Mirpur, Dhaka-1216</p>
          <p className="text-sm text-blue-gray-600">Bangladesh</p>
        </div>
        <ul className="flex flex-col items-start gap-y-2 gap-x-8">
          <li>
            <Link
              as="a"
              href="/products"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              as="a"
              href="/builder"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              PC Builder
            </Link>
          </li>
        </ul>
      </div>
     
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {new Date().getFullYear()} PC BUILDER. All rights reserved.
      </Typography>
    </footer>
  );
}

