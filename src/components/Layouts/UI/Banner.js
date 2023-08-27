/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Button, Carousel } from "@material-tailwind/react";

import img1 from '@/assets/banner/img-1.png';
import img2 from '@/assets/banner/img-2.png';
import img3 from '@/assets/banner/img-3.png';
import img4 from '@/assets/banner/img-4.png';


import Image from "next/image";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";


 
export default function Banner() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="2xl:flex my-2">
            <Carousel
                autoplay={true}
                loop={true}
                className="h-[490px]"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <Image
                    src={img1}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <Image
                    src={img2}
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <Image
                    src={img3}
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
                <Image
                    src={img4}
                    alt="image 4"
                    className="h-full w-full object-cover"
                />
            </Carousel>

        </div>
    );
}