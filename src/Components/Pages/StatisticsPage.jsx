// Em StatisticsPage.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Ajuste o caminho conforme necessário

const StatisticsPage = () => {
  const { cardsReadCount } = useContext(UserContext);

  return (
    <div>
      <h1>Estatísticas</h1>
      <p>Quantidade de cartas lidas: {cardsReadCount}</p>
    </div>
  );
};

export default StatisticsPage;