"use client";

import {Article} from "@/content/article";
import {formatDate} from "@/util/date";
import Link from "next/link";
import React from "react";
import {A11y, Keyboard, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import styles from "./blog-swiper.module.scss";

import "swiper/scss";
import "swiper/scss/a11y";
import "swiper/scss/keyboard";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

function Slide({id, title, create_date, content}: Article) {
    return (
        <Link href={`/blog/${id}`} title={title} className={styles.slide}>
            <h3>{title}</h3>
            <time dateTime={new Date(create_date).toISOString()}>
                {formatDate(create_date)}
            </time>
            <div>{`${content.slice(0, 50)}...`}</div>
            <span className={`link ${styles.link}`}>Weiterlesen</span>
        </Link>
    );
}

type Props = {
    items: Article[],
}

export function BlogSwiper({items}: Readonly<Props>) {
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
            {items.map(item => (
                <SwiperSlide key={item.id}>
                    <Slide {...item}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
