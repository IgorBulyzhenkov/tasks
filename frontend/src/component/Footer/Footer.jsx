import { memo } from "react";
import images from "../../images/ukr.jpg";
import s from "./Footer.module.css";

function Footer() {

    const years = new Date().getFullYear();
    return (
        <footer className={s.footer}>
            <div className={s.footerWrap}>
                <span className={s.text}>{years}</span>
                <span className={s.footerText}>All Rights Reserved</span>
                <span className={s.footerText}> Developed with</span>
                <img className={s.footer_logo} src={images} alt="ukraine" />
                <span className={s.span}>by </span>
                <a
                    href="https://www.linkedin.com/in/igor-bulyzhenkov-abb94a231/"
                    alt="Igor"
                    target="_blank"
                    rel="noreferrer"
                    className={s.link}
                >
                    Igor Bulyzhenkov
                </a>
            </div>
        </footer>
    );
}

export default memo(Footer);
