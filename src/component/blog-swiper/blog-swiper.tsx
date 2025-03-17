'use client';

import {BlogItem, QueryArray} from '@/util/type';
import Link from 'next/link';
import React from 'react';
import {Keyboard, Mousewheel, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './blog-swiper.module.scss';

import 'swiper/scss';
import 'swiper/scss/keyboard';
import 'swiper/scss/mousewheel';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

function Slide({id, title, author, date, category, content}: BlogItem) {
    return (
        <div className={styles.slide}>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <h5>{category}</h5>
            <time dateTime={date}><h6>{new Date(date).toLocaleDateString()}</h6></time>
            <div>{content.slice(0, 50) + '...'}</div>
            <div className={styles.link}>
                <Link href={`/blog/${id}`} title={`'${title}', ${author}`}>
                    Read more
                </Link>
            </div>
        </div>
    );
}

export default function BlogSwiper({items: {items}}: {
    items: QueryArray<BlogItem>
}) {
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
                }}
                modules={[
                    Keyboard,
                    Mousewheel,
                    Navigation,
                    Pagination,
                ]}
                keyboard
                mousewheel
                navigation
                pagination={{clickable: true, dynamicBullets: true}}>
            {items.map(item => (<SwiperSlide key={item.id}><Slide {...item}/></SwiperSlide>))}
        </Swiper>
    );
}
