# Tripleten - Around The U.S. (Backend API)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

O Around The U.S. é uma API REST desenvolvida com Express.js e Node.js.

Simula o backend de uma aplicação social, permitindo gerenciar usuários e uma galeria de fotos.

O projeto tem como foco prática de rotas, manipulação de dados e estruturação de uma API simples.

## Funcionalidades

- **Gerenciamento de usuários e cards**
  - Listar usuários ou cards
  - Buscar usuário por ID

- **Tratamento de rotas**
  - Middleware para rotas não encontradas (404)
  - Middleware de erro global (500)

## Tecnologias

- **Node.js** – ambiente de execução JavaScript no backend
- **Express.js** – framework para criação de API REST

## Como executar o projeto

```bash
npm install
npm run start
```

O servidor ficará disponível em: http://localhost:3000.

## Exemplos de requisições

Abaixo estão exemplos de como consumir a API usando **curl**:

### Listar todos os usuários

```bash
curl http://localhost:3000/users
```

Resposta esperada:

```json
[
  {
    "name": "Ada Lovelace",
    "about": "Mathematician, writer",
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
    "_id": "dbfe53c3c4d568240378b0c6"
  },
  ...
]
```

A lista pode conter múltiplos usuários.

### Buscar usuário por ID

```bash
curl http://localhost:3000/users/d285e3dceed844f902650f40
```

Resposta (200):

```json
{
  "name": "Tim Berners-Lee",
  "about": "Inventor, scientist",
  "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
  "_id": "d285e3dceed844f902650f40"
}
```

Caso o ID não seja encontrado, a resposta será (404):

```json
{
  "message": "ID do usuário não encontrado"
}
```

### Listar todos os cards

```bash
curl http://localhost:3000/cards
```

Resposta esperada:

```json
[
  {
    "likes": [
      {
        "name": "Tim Berners-Lee",
        "about": "Inventor, scientist",
        "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
        "_id": "d285e3dceed844f902650f40"
      }
    ],
    "_id": "5d208fb50fdbbf001ffdf72a",
    "name": "White Sulphur Springs, WV",
    "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/2008-0831-TheGreenbrier-North.jpg/1024px-2008-0831-TheGreenbrier-North.jpg",
    "owner": {
      "name": "Katherine Johnson",
      "about": "Mathematician",
      "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
      "_id": "8340d0ec33270a25f2413b69"
    },
    "createdAt": "2019-07-06T12:10:29.149Z"
  },
  ...
]
```

A lista pode conter múltiplos usuários.

## Autora

Desenvolvido por [Lorena Mendes](https://github.com/lorimendes).  
Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/lorenamendes0/).
