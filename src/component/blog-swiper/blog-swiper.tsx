"use client";

import {formatDate} from "@/util/date";
import {BlogItem, QueryArray} from "@/util/type";
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

function Slide({id, title, author, date, category, content}: BlogItem) {
    return (
        <div className={styles.slide}>
            <div>
                <h3>{title}</h3>
                <h4>{author}</h4>
                <h5>{category}</h5>
                <time dateTime={date}><h6>{formatDate(date)}</h6></time>
                <div>{content.slice(0, 50) + "..."}</div>
            </div>
            <div className={styles.link}>
                <Link href={`/blog/${id}`} title={`'${title}', ${author}`}>
                    Weiterlesen
                </Link>
            </div>
        </div>
    );
}

export function BlogSwiper({items: {items}}: { items: QueryArray<BlogItem> }) {
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
