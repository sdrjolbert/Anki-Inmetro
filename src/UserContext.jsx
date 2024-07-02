import React, { useState } from 'react';
import { REVOKE_TOKEN_POST, TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [cardsReadCount, setCardsReadCount] = useState(0);
  const [easyCardsCount, setEasyCardsCount] = useState(0);
  const [difficultCardsCount, setDifficultCardsCount] = useState(0);

  const navigate = useNavigate();

  const incrementCardsReadCount = () => {
    setCardsReadCount((prevCount) => prevCount + 1);
  };

  
  // Função para incrementar a contagem de cartas fáceis
  const incrementEasyCardsCount = () => {
    setEasyCardsCount(prevCount => prevCount + 1);
  };

  // Função para incrementar a contagem de cartas difíceis
  const incrementDifficultCardsCount = () => {
    setDifficultCardsCount(prevCount => prevCount + 1);
  };
  

  const userLogout = React.useCallback(
    async function (token) {
      const { url, options } = REVOKE_TOKEN_POST(token);
      await fetch(url, options);
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout(token);
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login, cardsReadCount, easyCardsCount, difficultCardsCount, incrementCardsReadCount, incrementEasyCardsCount, incrementDifficultCardsCount }}
    >
      {children}
    </UserContext.Provider>
  );
};
