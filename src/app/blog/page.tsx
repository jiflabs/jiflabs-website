import BlogSwiper from "@/component/blog-swiper/blog-swiper";
import {Main} from "@/component/container/container";
import {DefaultStrings} from "@/lang/lang";
import {queryResource} from "@/util/api";
import {BlogItem} from "@/util/type";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: DefaultStrings.page.blog.title,
    description: DefaultStrings.page.blog.description,
};

export default async function Page() {
    const items = await queryResource<BlogItem>("blog");

    return (
        <Main>
            <h1>{DefaultStrings.page.blog.title}</h1>
            <h2>{DefaultStrings.page.blog.subtitle}</h2>
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
            <BlogSwiper items={items}/>
        </Main>
    );
}

export const dynamic = "force-dynamic";
