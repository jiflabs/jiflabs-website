"use client";

import React, {ReactNode} from "react";
import {A11y, Keyboard, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import styles from "./blog-swiper.module.scss";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
    children: ReactNode[],
}

export function BlogSwiper({children}: Readonly<Props>) {
    return (
        <Swiper className={styles.wrapper}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    2000: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[
                    A11y,
                    Keyboard,
                    Navigation,
                    Pagination,
                ]}
                a11y={{enabled: true}}
                keyboard
                navigation
                pagination={{dynamicBullets: true}}>
            {children.map((child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
