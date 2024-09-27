express sequelize mysql2 zod cookie-parser multer bcrypt jsonwebtoken dotenv
nodemon

# Módulo 01

### 1. **Visão Geral do Projeto**

O módulo de postagens do blog visa fornecer uma API para gerenciar o conteúdo de postagens, permitindo a criação, leitura, atualização e exclusão (CRUD) de postagens. Cada postagem deve ser capaz de incluir um título, conteúdo textual, data de publicação, autor e uma imagem associada. Esse módulo deve ser flexível o suficiente para permitir futuras expansões, como a adição de comentários, categorias e tags.
---

### 2. **Requisitos Funcionais**

### 2.1. **Postagens**

- **RF01 - Criar Postagem**
    - O sistema deve permitir a criação de uma nova postagem com as seguintes informações:
        - `titulo` (obrigatório): Título da postagem.
        - `conteudo` (obrigatório): Texto ou corpo da postagem.
        - `dataPublicacao` (automático): Data e hora da criação da postagem.
        - `autor` (obrigatório): Nome ou identificador do autor da postagem.
        - `imagem` (opcional): URL ou caminho para a imagem associada à postagem.
    - **Endpoint:** `POST /postagens`
    - **Validação:** Os dados de entrada devem ser validados utilizando um esquema de validação adequado (por exemplo, utilizando a biblioteca Zod).
- **RF02 - Listar Postagens**
    - O sistema deve permitir a listagem de todas as postagens, com suporte à paginação.
        - A listagem deve incluir:
            - `totalPostagens`: Total de postagens cadastradas.
            - `totalPaginas`: Número total de páginas.
            - `paginaAtual`: Página atual sendo visualizada.
            - `itemsPorPagina`: Número de postagens por página.
            - `proximaPagina`: URL para acessar a próxima página, se aplicável.
            - `postagens`: Lista de postagens da página atual.
    - **Endpoint:** `GET /postagens`
    - **Parâmetros:**
        - `page` (opcional): Número da página. Valor padrão: `1`.
        - `limit` (opcional): Número de itens por página. Valor padrão: `10`.
- **RF03 - Buscar Postagem por ID**
    - O sistema deve permitir a busca de uma postagem específica pelo seu ID.
        - **Validação:** O ID deve ser validado utilizando um esquema de validação.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `GET /postagens/:id`
- **RF04 - Atualizar Postagem**
    - O sistema deve permitir a atualização de uma postagem específica pelo seu ID.
        - Campos que podem ser atualizados:
            - `titulo`
            - `conteudo`
            - `imagem`
        - **Validação:** O ID e os dados de entrada devem ser validados utilizando esquemas de validação apropriados.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `PUT /postagens/:id`
- **RF05 - Excluir Postagem**
    - O sistema deve permitir a exclusão de uma postagem específica pelo seu ID.
        - **Validação:** O ID deve ser validado utilizando um esquema de validação.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `DELETE /postagens/:id`
- **RF06 - Upload de Imagem para Postagem**
    - O sistema deve permitir o upload de uma imagem associada a uma postagem.
        - O upload da imagem deve ser feito no momento da criação ou atualização da postagem.
        - A imagem deve ser armazenada em um diretório específico no projeto.
    - **Endpoint:** `POST /postagens/:id/imagem`
    - **Validação:** A imagem deve ser validada quanto ao tamanho máximo permitido e tipo de arquivo (por exemplo, JPEG, PNG).

---
### 2.2. **Usuários**

- **RF01 - Registro de Usuário**
    - O sistema deve permitir que novos usuários se registrem fornecendo:
        - `nome` (obrigatório): Nome completo do usuário.
        - `email` (obrigatório e único): Endereço de email do usuário.
        - `senha` (obrigatório): Senha de acesso.
        - `imagem` (opcional):  URL ou caminho para a imagem associada à usuário.
        - `papel` (opcional): Tipo de usuário (`administrador`, `autor`, `leitor`). O valor padrão é `leitor`.
    - **Endpoint:** `POST /usuarios/registro`
    - **Validação:** Os dados de entrada devem ser validados utilizando um esquema de validação (como Zod). A senha deve ter uma força mínima (ex.: pelo menos 8 caracteres, contendo letras e números).
- **RF02 - Autenticação de Usuário (Login)**
    - O sistema deve permitir que os usuários façam login fornecendo:
        - `email`: E-mail do usuário.
        - `senha`: Senha de acesso.
    - O sistema deve retornar um token de autenticação (JWT) para ser usado em requisições subsequentes.
    - **Endpoint:** `POST /usuarios/login`
    - **Validação:** Os dados de entrada devem ser validados, e a autenticação deve garantir segurança adequada, como hash de senha e proteção contra ataques de força bruta.
- **RF03 - Atualização de Perfil de Usuário**

    - O sistema deve permitir que o usuário atualize suas informações de perfil, como nome, imagem, e-mail e senha.
    - **Endpoint:** `PUT /usuarios/:id`
    - **Validação:** Os dados de entrada devem ser validados, e a atualização deve garantir que o e-mail permaneça único.
- **RF04 - Listagem de Usuários (Admin)**
    - O sistema deve permitir que administradores listem todos os usuários registrados, com opção de filtro por nome, email ou papel.
    - **Endpoint:** `GET /usuarios`
    - **Validação:** Acesso permitido apenas para usuários com o papel de `administrador`.
- **RF05 - Exclusão de Usuário (Admin)**
    - O sistema deve permitir que um administrador exclua um usuário específico pelo ID.
    - **Endpoint:** `DELETE /usuarios/:id`
    - **Validação:** Acesso permitido apenas para usuários com o papel de `administrador`.
- **RF07 - Gerenciamento de Papéis de Usuário (Admin)**
    - O sistema deve permitir que um administrador atribua ou altere o papel de um usuário (ex.: de `leitor` para `autor`).
    - **Endpoint:** `PATCH /usuarios/:id/papel`
    - **Validação:** Apenas administradores podem modificar os papéis dos usuários.
### 2.3 **Interações entre Usuários e Postagens**

- **RF01 - Associação de Usuários às Postagens**
    - Cada postagem deve ser associada a um usuário autor.
    - **Regras:**
        - Apenas usuários autenticados com papel de `autor` ou `administrador` podem criar postagens.
        - O sistema deve permitir que os usuários listem postagens filtradas por autor.
    - **Endpoints:**
        - `GET /postagens?autor=:userId` - Lista postagens por autor.
        - `POST /postagens` - Cria uma nova postagem associada ao usuário autenticado.
- **RF02 - Comentários em Postagens**
    - O sistema deve permitir que usuários autenticados comentem nas postagens.
    - **Regras:**
        - Os comentários devem incluir:
            - `conteudo` (obrigatório): Texto do comentário.
            - `usuarioId` (obrigatório): ID do usuário autor do comentário.
            - `postagemId` (obrigatório): ID da postagem comentada.
        - Apenas usuários autenticados podem comentar.
        - O sistema deve suportar edição e exclusão de comentários pelo autor ou administrador.
    - **Endpoints:**
        - `POST /postagens/:postagemId/comentarios` - Adiciona um comentário a uma postagem.
        - `PUT /comentarios/:comentarioId` - Edita um comentário.
        - `DELETE /comentarios/:comentarioId` - Exclui um comentário.
        - `GET /postagens/:postagemId/comentarios` - Lista comentários de uma postagem.
- **RF03 - Curtidas em Postagens**
---

- 

### 3. **Requisitos Não Funcionais**

- Validação de dados de entrada deve ser realizada para todas as operações utilizando a biblioteca Zod ou similar.
- Implementação de mecanismos de autenticação e autorização para garantir que apenas usuários autorizados possam criar, atualizar ou excluir postagens.
- O sistema deve ser implementado utilizando Node.js com Express.
- O banco de dados utilizado será MYSQL.
- O sistema deve estar preparado para integração com bibliotecas de validação (Zod) e ORM (Sequelize ou Prisma).


- Todas as senhas devem ser armazenadas utilizando hashing seguro (ex.: bcrypt).
- O sistema deve implementar autenticação baseada em tokens (JWT) para proteger endpoints sensíveis.
- Implementação de proteção contra ataques comuns (ex.: SQL Injection, XSS, CSRF).
- O módulo deve estar preparado para integração com bibliotecas de autenticação e autorização (como Passport.js ou JWT).


---

### 4. **Fluxo de Dados**

1. **Criação de Postagem:**
    - O usuário envia uma requisição `POST` com os dados da nova postagem.
    - O sistema valida os dados e cria a postagem com a data de publicação atual.
2. **Listagem de Postagens:**
    - O usuário solicita a listagem de postagens.
    - O sistema retorna uma lista paginada de postagens.
3. **Busca de Postagem por ID:**
    - O usuário solicita uma postagem específica.
    - O sistema valida o ID e retorna a postagem ou um erro `404`.
4. **Atualização de Postagem:**
    - O usuário envia uma requisição `PUT` com dados atualizados da postagem.
    - O sistema valida os dados e atualiza a postagem correspondente.
5. **Exclusão de Postagem:**
    - O usuário envia uma requisição `DELETE` para remover uma postagem específica.
    - O sistema valida o ID e remove a postagem ou retorna um erro `404`.
6. **Upload de Imagem:**
    - O usuário envia uma imagem para ser associada a uma postagem específica.
    - O sistema valida a imagem e a armazena no local apropriado.

---


1. **Registro de Usuário:**
    - O usuário envia uma requisição `POST` com seus dados para registro.
    - O sistema valida os dados, cria o usuário e retorna uma confirmação.
2. **Login de Usuário:**
    - O usuário envia uma requisição `POST` com seu email e senha.
    - O sistema valida as credenciais e retorna um token de autenticação (JWT).
3. **Atualização de Perfil:**
    - O usuário envia uma requisição `PUT` com os dados atualizados.
    - O sistema valida e atualiza as informações do perfil.
4. **Listagem e Gerenciamento de Usuários (Admin):**
    - O administrador visualiza, altera e exclui usuários conforme necessário.

---





    - O sistema deve permitir que usuários autenticados curtam ou removam curtidas de postagens.
    - **Regras:**
        - Cada usuário pode curtir uma postagem apenas uma vez.
        - Se um usuário tentar curtir novamente, a curtida deve ser removida.
    - **Endpoints:**
        - `POST /postagens/:postagemId/curtidas` - Adiciona ou remove uma curtida em uma postagem.