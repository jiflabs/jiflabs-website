import {Main} from "@/component/container/container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Datenschutzerklärung",
    description: "Die Datenschutzerklärung",
};

export default async function Page() {
    return (
        <Main slim>
            <h1>Datenschutzerklärung</h1>

            <h2>1. Einleitung</h2>
            <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
            </p>

            <h2>2. Verantwortliche Stelle</h2>
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website sind:</p>

            <p>
                Jonas Nicklas<br/>
                Adresse<br/>
                E-Mail
            </p>

            <p>
                Ilian Odenbach<br/>
                Adresse<br/>
                E-Mail
            </p>

            <p>
                Felix Schreiber<br/>
                Adresse<br/>
                E-Mail
            </p>

            <h2>3. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
            <ul>
                <li>
                    <h3>Beim Besuch der Website:</h3>
                    <p>
                        Beim Aufrufen dieser Website werden durch den Hosting-Provider automatisch Informationen in
                        sogenannten Server-Log-Dateien gespeichert. Diese Daten umfassen:
                    </p>
                    <ul>
                        <li>IP-Adresse</li>
                        <li>Datum und Uhrzeit der Anfrage</li>
                        <li>Name und URL der abgerufenen Datei</li>
                        <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                        <li>Verwendeter Browser und ggf. das Betriebssystem</li>
                    </ul>
                </li>
            </ul>

            <p>
                Diese Daten sind nicht bestimmten Personen zuordenbar und werden zur Gewährleistung eines
                reibungslosen Verbindungsaufbaus sowie zur Systemsicherheit genutzt.
            </p>

            <h3>Kontaktaufnahme:</h3>
            <ul>
                <li>
                    Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den
                    Fall von Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </li>
            </ul>

            <h2>4. Cookies</h2>
            <p>Diese Website verwendet keine Cookies zur Nachverfolgung von Nutzerdaten.</p>

            <h2>5. Ihre Rechte</h2>
            <h3>Sie haben das Recht:</h3>
            <ul>
                <li>gemäß Art. 15 DSGVO Auskunft über Ihre gespeicherten Daten zu erhalten.</li>
                <li>gemäß Art. 16 DSGVO die Berichtigung unrichtiger oder Vervollständigung Ihrer Daten zu verlangen.
                </li>
                <li>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten Daten zu verlangen.</li>
                <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</li>
                <li>gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren.</li>
            </ul>

            <h2>6. Widerspruchsrecht</h2>
            <p>
                Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen verarbeitet werden, haben
                Sie das Recht, Widerspruch gegen diese Verarbeitung einzulegen.
            </p>

            <h2>7. Datensicherheit</h2>
            <p>
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen
                Manipulation, Verlust oder unbefugten Zugriff zu schützen.
            </p>

            <h2>8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den
                Stand <time dateTime="2025-03-01">März 2025</time>. Wir behalten uns vor,
                diese Erklärung bei Bedarf zu aktualisieren.
            </p>
        </Main>
    );
}
