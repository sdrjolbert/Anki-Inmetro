import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Inmetro from "../Assets/inmetro.svg?react";
import { UserContext } from "../UserContext";

const Header = () => {
    const { data } = React.useContext(UserContext);

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} hcontainer`}>
                <Link className="styles.logo" to="/" aria-label="AnkiJr - Home">
                Home
                </Link>
                
                <img src={Inmetro} alt="INMETRO" width={120} height={40}></img>

                {data ? (
                <Link className={styles.login} to="/conta">
                    {data.nome}
                    <button onClick={userLogout}>Sair</button>
                </Link>
                ) : (
                <Link className={styles.login} to="/login">
                    Login / Criar
                </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;