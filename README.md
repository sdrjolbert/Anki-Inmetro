# Projeto AnkiJr

[![Github License][License-image]][License-url]
[![Frontend][Frontend-image]][Frontend-url]
[![Backend][Backend-image]][Backend-url]
[![Deploy][deploy-image]][Deploy-url]
[![Database][Database-image]][Database-url]
[![Database Blob][Database-blob-image]][Database-blob-url]

> Trazendo a usabilidade do estudo com flashcards e da repetição espaçada para dentro do Inmetro.

Nesse projeto traremos a usabilidade do [Anki](https://apps.ankiweb.net/) para dentro do Inmetro através da nossa própria versão do app, mas em uma versão web, assim como o [AnkiWeb](https://ankiweb.net/about).

Ao contrário do Anki, toda a versão definitiva do nosso app será realizada através da web e terá compatibilidade com o próprio Anki.

## Colaboradores

### [*Inmetro*](https://www.gov.br/inmetro/pt-br)

### *Igor Monteiro*

### *Jolbert Sodré*

### *Victor Daniel*

## Tecnologias

O nosso projeto tem a possibilidade de:

- Importação e exportação de arquivos .apkg
- Criação de decks
- Criação de cards
- Visualização de revisões
- Compatibilidade com o Anki

## Como acessar

### Para acessar de forma online

Para acessar de forma online é muito simples, basta entrar no site do [**AnkiJr**](https://https://anki-inmetro.vercel.app), criar sua conta e começar a desfrutar de todas as funcionalidades!

### Para acessar de forma local

Para acessar de forma local será necessário primeiro que seja feito um clone ou o download do repositório do [**AnkiJr**](https://github.com/Victor07july/Anki-Inmetro) e também da [**API do AnkiJr**](https://github.com/sdrjolbert/API-Anki-Inmetro) (acesse o repositório da API para ter acesso as informações de como inciá-la).

Assim que o clone ou o download do repositório tenha sido feito será necessário seguir alguns passos (necessário conhecimento prévio mínimo sobre programação e sobre as tecnologias utilizadas durante a aplicação), esses passos são:

- Abrir um terminal na raiz da pasta clonada do repositório e inserir o seguinte comando: ```npm i``` para que seja instalada todas as dependências da aplicação;
- No mesmo terminal, após as instalações, inserir o comando ```npm run dev```, dessa forma a aplicação deverá iniciar um servidor local para que possa ser acessada;
- Agora basta acessar ```http://localhost:5173``` e desfrutar da aplicação de forma local.

> **Observações**:
>
> - Para que a aplicação funcione é necessário que a API também esteja no ar, logo é necessário realizar os passos básicos da [**API**](https://github.com/sdrjolbert/API-Anki-Inmetro).
> - Caso esteja tudo de acordo e mesmo assim sua aplicação não esteja acessando, tente verificar a porta da aplicação. A porta ```5173``` é a padrão do [**Vite**](https://vitejs.dev/), mas pode ser alterada, certifique-se que esteja na porta certa!

<!-- Links -->

[License-image]: https://img.shields.io/badge/Mit-license-750014?style=for-the-badge&logo=github&logoColor=750014&labelColor=f5f5f5&link=https%3A%2F%2Fgithub.com%2FVictor07july%2FAnki-Inmetro%2Fblob%2Fmain%2FLICENSE
[License-url]: https://img.shields.io/badge/Mit-license-750014?style=for-the-badge&logo=github&logoColor=750014&labelColor=f5f5f5&link=https%3A%2F%2Fgithub.com%2FVictor07july%2FAnki-Inmetro%2Fblob%2Fmain%2FLICENSE

[Frontend-image]: https://img.shields.io/badge/React-frontend-58c4dc?style=for-the-badge&logo=react&labelColor=23272f&link=https%3A%2F%2Freact.dev%2F
[Frontend-url]: https://img.shields.io/badge/React-frontend-58c4dc?style=for-the-badge&logo=react&labelColor=23272f&link=https%3A%2F%2Freact.dev%2F

[Backend-image]: https://img.shields.io/badge/nextjs-backend-285a95?style=for-the-badge&logo=next.js&labelColor=000000&link=https%3A%2F%2Fnextjs.org%2F
[Backend-url]: https://img.shields.io/badge/nextjs-backend-285a95?style=for-the-badge&logo=next.js&labelColor=000000&link=https%3A%2F%2Fnextjs.org%2F

[Deploy-image]: https://img.shields.io/badge/vercel-deploy-285a95?style=for-the-badge&logo=vercel&labelColor=000000&link=https%3A%2F%2Fvercel.com%2Fhome
[Deploy-url]: https://img.shields.io/badge/vercel-deploy-285a95?style=for-the-badge&logo=vercel&labelColor=000000&link=https%3A%2F%2Fvercel.com%2Fhome

[Database-image]: https://img.shields.io/badge/vercel_postgresql-database-336791?style=for-the-badge&logo=postgresql&labelColor=212121&link=https%3A%2F%2Fvercel.com%2Fdocs%2Fstorage%2Fvercel-postgres&link=https%3A%2F%2Fwww.postgresql.org%2F
[Database-url]: https://img.shields.io/badge/vercel_postgresql-database-336791?style=for-the-badge&logo=postgresql&labelColor=212121&link=https%3A%2F%2Fvercel.com%2Fdocs%2Fstorage%2Fvercel-postgres&link=https%3A%2F%2Fwww.postgresql.org%2F

[Database-blob-image]: https://img.shields.io/badge/vercel_blob-database_blob-d69907?style=for-the-badge&logo=vercel&labelColor=000000&link=https%3A%2F%2Fvercel.com%2Fdocs%2Fstorage%2Fvercel-blob
[Database-blob-url]: https://img.shields.io/badge/vercel_blob-database_blob-d69907?style=for-the-badge&logo=vercel&labelColor=000000&link=https%3A%2F%2Fvercel.com%2Fdocs%2Fstorage%2Fvercel-blob
