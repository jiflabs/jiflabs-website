import {Main} from "@/component/container/container";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Impressum",
    };
}

export default async function Page() {
    return (
        <Main slim>
            <h1>Impressum</h1>

            <h2>Rechtliche Hinweise</h2>
            <p>
                Willkommen auf unserer Website! Der Schutz Ihrer Daten und die rechtlichen Grundlagen unserer
                Online-Präsenz sind uns wichtig. Daher finden Sie hier alle notwendigen Informationen gemäß den
                gesetzlichen Vorgaben.
            </p>

            <h3>Verantwortlichkeit und Kontakt</h3>
            <p>
                Im Folgenden finden Sie die Angaben gemäß § 5 TMG sowie die verantwortlichen Ansprechpartner für die
                Inhalte dieser Website.
            </p>

            <h4>Angaben gemäß § 5 TMG:</h4>
            <h5>Jonas Nicklas</h5>
            <p>
                Adresse<br/>
                Telefon<br/>
                E-Mail
            </p>
            <h5>Ilian Odenbach</h5>
            <p>
                Adresse<br/>
                Telefon<br/>
                E-Mail
            </p>
            <h5>Felix Schreiber</h5>
            <p>
                Adresse<br/>
                Telefon<br/>
                E-Mail
            </p>

            <h4>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h4>
            <p>
                Felix Schreiber<br/>
                Adresse
            </p>

            <h4>Haftungsausschluss:</h4>
            <p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>

            <h4>Urheberrecht:</h4>
            <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht.
            </p>
        </Main>
    );
}
