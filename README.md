This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#superativo

O propósito principal do app é aumentar o engajamento dos alunos com as aulas, incorporando a gamificação como uma forma de incentivá-los a serem mais competitivos nas atividades de educação física, tanto nos esportes individuais quanto nos coletivos. Para isso, usaremos rankings das equipes formadas em aula e, a depender do número de vitórias, os alunos que mais estiveram em times vitoriosos, irão aparecer em rankings individuais da própria turma e também do colégio.

First, run the development server:



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🔗 APIs Utilizadas

- [ViaCEP](https://viacep.com.br) – Para buscar endereços a partir do CEP digitado  

---

## 🛠️ Tecnologias

Tecnologias utilizadas / Technologies Used
Next.js – framework React com renderização do lado servidor e geração de páginas estáticas
React – biblioteca de componentes para a interface
JavaScript (ES6+) – linguagem principal do projeto
Node.js – ambiente de execução do servidor
API Routes do Next.js – para rotas de backend dentro do projeto
Prisma – ORM para conexão com banco de dados
PostgreSQL (aparentemente, pelo Prisma) – banco de dados relacional
bcrypt – para hash de senhas
jsonwebtoken (JWT) – autenticação baseada em tokens
CSS / globals.css – estilização básica do projeto
.env – variáveis de ambiente para segredos e conexões
GitHub – versionamento de código
Vercel – plataforma de deploy
---

## 📂 Estrutura do Projeto

bash
superativo/             # raiz do projeto
├─ .next/               # build do Next.js
├─ lib/
│  └─ database.js       # funções para manipulação do banco de dados
├─ node_modules/        # dependências do projeto
├─ prisma/
│  └─ schema.prisma     # schema do banco de dados (Prisma ORM)
├─ public/              # arquivos públicos (imagens, favicon, etc.)
├─ src/
│  └─ app/
│     ├─ api/
│     │  └─ auth/
│     │     ├─ cadastro/
│     │     │  └─ route.js   # rota de cadastro (API)
│     │     └─ login/
│     │        └─ route.js   # rota de login (API)
│     ├─ homescreen/
│     │  └─ page.js           # tela inicial
│     ├─ perfil/
│     │  └─ page.js           # perfil do usuário
│     ├─ rankingGeral/
│     │  └─ historico&progresso/
│     │     └─ page.js        # histórico e progresso no ranking
│     │  └─ page.js           # ranking geral
│     └─ turma/
│        └─ page.js           # página da turma
├─ .env                  # variáveis de ambiente
├─ globals.css           # estilos globais
├─ layout.js             # layout principal
├─ favicon.ico
└─ package.json

🚀 Como rodar o projeto

# 1. Clone o repositório
```bash
git clone https://github.com/D4nilo-Rocha/superativo.git
```
# 2. Acesse a pasta do projeto
```bash
cd superativo
```
# 3. Instale as dependências
```bash
npm install
```
# ou
```bash
yarn install
```
# 4. Inicie o servidor de desenvolvimento
```bash
yarn dev
```
# 5. Link do projeto na Vercel
```bash
https://vercel.com/danilo-rochas-projects-722f0f9f/superativo
```

