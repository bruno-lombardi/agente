# Agente baseado em AdonisJS

Agente baseado na estrutura MVC, em NodeJS com AdonisJS. Features:

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Primeiro instale as dependências com `npm install`, depois configure o banco de dados (por padrão utiliza SQlite), no arquivo `.env` (exemplo no .`env.example`).
Execute os migrations para criar o banco de dados com `adonis migration:run`. Inicie o servidor de desenvolvimento com:

```bash
adonis serve --dev
```
