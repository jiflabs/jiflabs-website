import {faWarning} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styles from "./wip-banner.module.scss";

export function WipBanner() {
    return (
        <div className={styles.banner}>
            <FontAwesomeIcon icon={faWarning} size="2xl"/>
            <span>Warnung: diese Webseite ist noch in Entwicklung, sprich wichtige Information wie die Datenschutzerklärung und das Impressum können unter Umständen noch fehlerhaft oder unvollständig sein.</span>
        </div>
    );
}
