# Teste Técnico Documentos API

## Estrutura do Projeto

- **`src`**: Contém o código-fonte, organizado por módulos.
  - **`clients`**: Lida com funcionalidades relacionadas a clientes.
  - **`documents`**: Gerencia o processamento e armazenamento de documentos.
  - **`types`**: Define tipos de dados e interfaces personalizadas.
  - **`app.module.ts`**: O módulo raiz da aplicação.
  - **`main.ts`**: O ponto de entrada da aplicação.
- **`test`**: Contém os arquivos de teste.
- **`scripts`**: Contém scripts auxiliares em Python para web scraping e leitura de PDFs..
- **`node_modules`**: Armazena todas as dependências do projeto.
- **`dist`**: Contém o código JavaScript compilado.
- **`coverage`**: Armazena os relatórios de cobertura de código.
- **`Dockerfile`**: Define a imagem Docker para a aplicação.
- **`docker-compose.yml`**: Configura os serviços, redes e volumes para o Docker.
- **`package.json`**: Lista as dependências e scripts do projeto.
- **`README.md`**: Este arquivo, fornecendo informações sobre o projeto.
- **`tsconfig.json`**: O arquivo de configuração do TypeScript.

## Começando

Para começar com este projeto, você precisará ter o Docker e o Docker Compose instalados em sua máquina.

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/teste-tecnico-documentos-api.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd teste-tecnico-documentos-api
   ```
3. Construa e execute os contêineres:
   ```sh
   docker-compose up --build
   ```

## Executando a Aplicação

Quando os contêineres estiverem em execução, a API estará disponível em `http://localhost:3000`.

Para parar a aplicação, execute:
```sh
docker-compose down
```

## Coleção do Postman

Este projeto inclui uma coleção do Postman para ajudá-lo a testar a API. Você pode importar a coleção seguindo estes passos:

1. Abra o Postman.
2. Clique no botão "Import".
3. Selecione o arquivo `Teste pratico API Plin.postman_collection.json` da raiz do projeto.
4. A coleção será importada e você poderá começar a fazer requisições para a API.

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
