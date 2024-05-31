import React from "react";
import { Link } from 'react-router-dom';

// import styles from "./Footer.module.css";

const HomePage = () => {
    return (
        <section>
            <h1>Bem vindo ao Anki-Inmetro!</h1>


            <Link to="/login">
            <input type="button" defaultValue={"Login"} />
            </Link>

            <Link to="/createdeck">
                <input type="button" value="Criar Deck" />
            </Link>

            <Link to="/addcard">
            <input type="button" value="Criar cards" />
            </Link>

            <Link to="/readdeck">
            <input type="button" value="Ler Deck" />
            </Link>
        </section>
    )

};

export default HomePage;