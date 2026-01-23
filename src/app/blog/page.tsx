import {BlogSwiper} from "@/component/blog-swiper/blog-swiper";
import {Main} from "@/component/container/container";
import {Article, getAllArticles} from "@/content/article";
import {getUsersByArticleId} from "@/content/user";
import {formatDate} from "@/util/date";
import {Metadata} from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Blog",
    };
}

async function Slide({id, title, create_date, content}: Article) {
    const {items: users} = await getUsersByArticleId(id);

    return (
        <div className={styles.slide}>
            <Link href={`/blog/${id}`} title={title}>
                <h3>{title}</h3>
            </Link>
            <time dateTime={new Date(create_date).toISOString()}>
                {formatDate(create_date)}
            </time>
            <span>von {users.map(user => user.name).join(", ")}</span>
            <span className={styles.content}>{`${content.slice(0, 50)}...`}</span>
            <span className={`link ${styles.link}`}>Weiterlesen</span>
        </div>
    );
}

export default async function Page() {
    const {items} = await getAllArticles();

    return (
        <Main>
            <h1>Blog</h1>
            <h2>Informationen, Neuigkeiten und Ideen</h2>
            <p>
                Bavaria ipsum dolor sit amet Broadwurschtbudn bitt owe jo leck mi Woibbadinga baddscher, Sepp wos ded!
                Midanand gelbe Rüam hod des hoggd, Engelgwand a bravs gar nia need damischa. Liberalitas Bavariae
                nackata woaß, no a Maß Spuiratz Zwedschgndadschi. Da griasd eich midnand an mogsd a Bussal pfiad de.
                Ozapfa des is a gmahde Wiesn nimma Spezi a ganze! Auf’d Schellnsau is ma Wuascht pfundig wea nia
                ausgähd, kummt nia hoam, sei hea so Goaßmaß gscheid? Watschnbaam griaß God beinand no Vergeltsgott,
                gfreit mi i des muas ma hoid kenna fei Ledahosn Ohrwaschl o’ha: Kneedl Charivari hogg ma uns zamm so
                wui, des is schee a Maß und no a Maß nomoi jo mei Charivari is ma Wuascht! Trihöleridi dijidiholleri
                Schaung kost nix a bissal wos gehd ollaweil nackata Hetschapfah jo mei, Broadwurschtbudn hawadere
                midananda hea ham. Amoi is ma Wuascht Sauakraud, d’.
            </p>
            {items.length ? (
                <BlogSwiper>
                    {items.map(item => <Slide key={item.id} {...item}/>)}
                </BlogSwiper>
            ) : <p>Keine Einträge</p>}
        </Main>
    );
}

export const dynamic = "force-dynamic";
