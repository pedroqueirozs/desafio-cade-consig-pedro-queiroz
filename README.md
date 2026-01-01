# Solução — Desafio CadeConsig

Este repositório contém a implementação da minha solução para o **Desafio CadeConsig**.

A documentação oficial do desafio foi mantida separadamente para evitar poluição deste README e manter o foco em **como executar o projeto** e **o que foi implementado**.

📌 **Repositório do desafio original:**  
 https://github.com/cadeconsig/desafio-cadeconsig?tab=readme-ov-file

---

## Visão Geral

A solução foi desenvolvida como uma aplicação **full stack**, contemplando autenticação, upload de arquivos CSV, listagem de contratos com filtros e paginação, além de uma interface simples e funcional.

O projeto está dividido em **backend** e **frontend**, seguindo boas práticas de organização e separação de responsabilidades.

---

### Telas implementadas

## Login

<p align="center">
<img alt="Pagina de login" src="./upload-contratos/frontend/public/login.png" width="70%">
</p>

## Lista e Contratos

<p align="center">
 <img alt="Pagina de listagem de contratos" src="./upload-contratos/frontend/public/contracts.png" width="70%">
</p>

## Tela para upload de contratos

<p align="center">
 <img alt="Pagina de uploads" src="./upload-contratos//frontend/public/upload.png" width="70%">
</p>

---

## Estrutura do repositório solicitada no desafio.

```bash
.
├── backend
├── upload-contratos / frontend
├── Curriculo-Pedro-Queiroz.pdf
└── README.md
```

## Como Executar o Projeto Localmente

```bash
cd backend
npm install
```

## Crie um arquivo .env na raiz do backend com o seguinte conteúdo:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cadeconsig"
JWT_SECRET="supersecret"

```

## Suba o banco de dados com Docker:

```bash
docker-compose up -d
```

## Execute as migrations e o seed do banco:

```bash
npx prisma migrate dev
npx prisma db seed

```

## Inicie o servidor:

```bash
npm run start:dev

O backend ficará disponível em: http://localhost:3000
```

## Usuário padrão para login:

```bash
Usuário: admin
Senha: admin123
```

## Frontend

```bash
cd upload-contratos
npm install
npm run dev
```

## O frontend ficará disponível em:

```bash
http://localhost:3001
```

## Ao acessar a aplicação, o usuário será direcionado para a tela de login.
