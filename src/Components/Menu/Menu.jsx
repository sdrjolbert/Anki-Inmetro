import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/createdeck">Criar Baralho</Link>
        </li>
        <li>
          <Link to="/addcard">Adicionar Card</Link>
        </li>
        <li>
          <Link to="/readdeck">Ler Baralho</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;