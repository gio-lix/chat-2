import React from 'react';
import s from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer className={s.footer}>
            <article className="d-flex f-column a-i-center">
                <h3>Welcome to chat</h3>
                <small>Copyright &copy;</small>
            </article>
        </footer>
    );
};

export default Footer;