# API de Processamento de Documentos

API desenvolvida em NestJS com TypeORM para processamento de documentos (PDF e páginas web), extração de dados e associação a clientes cadastrados.

## 🚀 Tecnologias

- **Backend**: NestJS (Node.js/TypeScript)
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Processamento de PDF**: pdf-parse
- **Web Scraping**: Python com BeautifulSoup
- **Validação**: class-validator
- **Containerização**: Docker

## 📋 Funcionalidades

### Clientes

- ✅ CRUD completo de clientes
- ✅ Campos: ID, Nome, Email, Data de Cadastro
- ✅ Listagem com contagem de documentos associados

### Processamento de Documentos

- ✅ Upload de arquivos PDF
- ✅ Processamento de URLs de páginas web
- ✅ Extração automática de título e conteúdo
- ✅ Armazenamento no banco de dados
- ✅ Associação de documentos a clientes (relação 1:N)

### Consultas

- ✅ Listar todos os clientes com contagem de documentos
- ✅ Listar todos os documentos de um cliente específico
- ✅ Buscar documentos por cliente retornando campos específicos
- ✅ Listar todos os documentos

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 20+
- PostgreSQL 15+ (ou usar Docker)
- Python 3.8+ (para web scraping)
- npm ou yarn

### Instalação Local

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd teste-tecnico-documentos-api
```

2. Instale as dependências:

```bash
npm install
```

3. Instale as dependências Python:

```bash
pip3 install -r requirements.txt
```

4. Configure o banco de dados PostgreSQL:
   - Crie um banco de dados chamado `testdb`
   - Configure as credenciais em `src/app.module.ts` ou use variáveis de ambiente

5. Execute a aplicação:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

### Execução com Docker

1. Execute com docker-compose:

```bash
docker-compose up -d
```

Isso irá:

- Criar e iniciar o container do PostgreSQL
- Criar e iniciar o container da API
- Configurar automaticamente a conexão entre os serviços

2. Para ver os logs:

```bash
docker-compose logs -f api
```

3. Para parar os containers:

```bash
docker-compose down
```

## 📚 Endpoints da API

### Clientes

#### Criar Cliente

```http
POST /clients
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

#### Listar Todos os Clientes

```http
GET /clients
```

Resposta inclui `documentsCount` (contagem de documentos).

#### Buscar Cliente por ID

```http
GET /clients/:id
```

#### Atualizar Cliente

```http
PATCH /clients/:id
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.santos@example.com"
}
```

#### Deletar Cliente

```http
DELETE /clients/:id
```

### Documentos

#### Upload de PDF

```http
POST /documents/upload-pdf/:clientId
Content-Type: multipart/form-data

file: [arquivo PDF]
```

**Exemplo com cURL:**

```bash
curl -X POST http://localhost:3000/documents/upload-pdf/1 \
  -F "file=@documento.pdf"
```

#### Processar URL de Página Web

```http
POST /documents/process-url
Content-Type: application/json

{
  "url": "https://example.com",
  "clientId": 1
}
```

#### Listar Todos os Documentos

```http
GET /documents
```

#### Buscar Documento por ID

```http
GET /documents/:id
```

#### Listar Documentos de um Cliente

```http
GET /documents/client/:clientId
```

#### Buscar Documentos por Cliente (campos específicos)

```http
GET /documents/search/:clientId
```

Retorna apenas: `id`, `title`, `content`, `source`, `processedAt`

## 🧪 Testes

### Executar Testes Unitários

```bash
npm run test
```

### Executar Testes com Cobertura

```bash
npm run test:cov
```

### Executar Testes E2E

```bash
npm run test:e2e
```

## 🐳 Docker

### Build da Imagem

```bash
docker build -t documentos-api .
```

### Executar Container

```bash
docker run -p 3000:3000 \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_DATABASE=testdb \
  documentos-api
```

## 📁 Estrutura do Projeto

```
teste-tecnico-documentos-api/
├── src/
│   ├── clients/          # Módulo de clientes
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── entities/     # Entidades TypeORM
│   │   ├── clients.controller.ts
│   │   ├── clients.service.ts
│   │   └── clients.module.ts
│   ├── documents/        # Módulo de documentos
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── documents.module.ts
│   ├── app.module.ts     # Módulo principal
│   └── main.ts           # Arquivo de entrada
├── scripts/
│   └── web_scraper.py    # Script Python para web scraping
├── test/                 # Testes E2E
├── Dockerfile
├── docker-compose.yml
├── requirements.txt      # Dependências Python
└── package.json
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=testdb
```

### Configuração do Banco de Dados

A configuração atual está em `src/app.module.ts`. Para produção, recomenda-se usar variáveis de ambiente.

## 📝 Observações

- O web scraping é feito através de um script Python separado (`scripts/web_scraper.py`)
- O script Python precisa estar acessível e ter as dependências instaladas
- PDFs são processados em memória (buffer), não são salvos em disco
- A API suporta CORS para desenvolvimento frontend
- Validação automática de dados de entrada usando `class-validator`

## 🚧 Melhorias Futuras (Opcional)

- [ ] Autenticação JWT
- [ ] Rate limiting
- [ ] Cache de resultados
- [ ] Suporte a mais formatos de documento
- [ ] Processamento assíncrono com filas
- [ ] Logging estruturado
- [ ] Documentação Swagger/OpenAPI

## 📄 Licença

Este projeto foi desenvolvido como teste técnico.
