# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/LucasMCFidelis/curriculum-generator/compare/v1.1.0...v1.2.0) (2025-05-19)


### ♻️ Refactors

* criar classe abstrata BaseCrud para unificar métodos dos controllers ([5db18a5](https://github.com/LucasMCFidelis/curriculum-generator/commit/5db18a5fff7eba5962243c87b01c8ebb66c193a0))
* **skill:** substituir listagem por função com múltiplos filtros no Prisma ([256c16f](https://github.com/LucasMCFidelis/curriculum-generator/commit/256c16f3f529fe5e1601fb50733a0db42322e293))


### ✨ Features

* **skill:** adicionar função de busca individual de skill por ID ([10713fa](https://github.com/LucasMCFidelis/curriculum-generator/commit/10713fa953d8dbb006e2dbe2078c3a059768836f))
* **skill:** adicionar funcionalidade de atualização de skill por ID ([239503d](https://github.com/LucasMCFidelis/curriculum-generator/commit/239503d5b71755931cf5af26da194817e6942bd2))
* **skill:** adicionar funcionalidade de deleção de skill por ID ([f59c0c1](https://github.com/LucasMCFidelis/curriculum-generator/commit/f59c0c13b44050e0f0525b9a7a845821570e4d0d))
* **skill:** adicionar listagem de skills do usuário ([6f2bf10](https://github.com/LucasMCFidelis/curriculum-generator/commit/6f2bf102fa41109c8b17449f201f946a928f1dd0))
* **skill:** adicionar schema de validação para criação de skill ([87ac66f](https://github.com/LucasMCFidelis/curriculum-generator/commit/87ac66fef36c5e9736fd51831a5abd2072e4761b))
* **skill:** implementar rota e lógica para criação de skill ([9838272](https://github.com/LucasMCFidelis/curriculum-generator/commit/983827218b3900ed2e8d454696f29420238e8d89))
* **skills:** estruturar arquivos iniciais para desenvolvimento das funcionalidades ([cef3a98](https://github.com/LucasMCFidelis/curriculum-generator/commit/cef3a988ec34b4bced70f41ac6bc958272641205))


### 🐛 Bug Fixes

* **prisma:** corrige campos do model Skill e aplica migration ([ed73b12](https://github.com/LucasMCFidelis/curriculum-generator/commit/ed73b129c604f67366e3595b0f3cbed1a078e1d0))
* **skill:** corrigir chamada do serviço de skill na função de atualização ([c1da453](https://github.com/LucasMCFidelis/curriculum-generator/commit/c1da4538294faa27e287509a741bb6ef64858c22))


### 🧹 Chores

* **format:** aplicar ajustes de formatação após resolução de conflitos de merge ([141bd7c](https://github.com/LucasMCFidelis/curriculum-generator/commit/141bd7c6d543fcb4268b9f1d8ce289632cd7a361))

## 1.1.0 (2025-05-15)


### 🧹 Chores

* configura build do backend ([ccb4864](https://github.com/LucasMCFidelis/curriculum-generator/commit/ccb48644a5d0f6dd5793d65bcfa6c2b368ed31d3))
* inicializa setup básico para o projeto ([db638b7](https://github.com/LucasMCFidelis/curriculum-generator/commit/db638b78e155bb3422d6aa5258e308028cfdb626))
* **migration:** aplica estrutura inicial do banco de dados ([a874ac8](https://github.com/LucasMCFidelis/curriculum-generator/commit/a874ac87e5e04e0f2f6673335dcee27270276fb1))
* **prisma:** adiciona instância global do Prisma Client ([db42a45](https://github.com/LucasMCFidelis/curriculum-generator/commit/db42a45f121e8a7a952d8c9a116dc71e54ccfa74))
* **release:** configura standard-version para controle futuro de versões ([699a684](https://github.com/LucasMCFidelis/curriculum-generator/commit/699a684575a930d582bda6799191e2eac509bd5c))
* **schema:** define regras onDelete e onUpdate para os relacionamentos ([bbe3187](https://github.com/LucasMCFidelis/curriculum-generator/commit/bbe318736958a333cd049451f704d19b4b751bf8))


### ♻️ Refactors

* **auth:** adiciona lógica de validação e lançamento de erro para comparePassword ([8be4b0b](https://github.com/LucasMCFidelis/curriculum-generator/commit/8be4b0b3eba826770f6d183594a1300c37852834))
* **error-handler:** melhorar estrutura de retorno para erros de validação do Zod ([186a190](https://github.com/LucasMCFidelis/curriculum-generator/commit/186a190741e1a40681a4529bac203bef94871180))
* **middleware:** adiciona replace para remover prefixo 'Bearer' do token ([6cb6d90](https://github.com/LucasMCFidelis/curriculum-generator/commit/6cb6d9056869e301b1e94d383a8217d6bdc5e56b))
* substituição de 'this' por 'AuthMiddleware' em métodos estáticos ([972fc33](https://github.com/LucasMCFidelis/curriculum-generator/commit/972fc3360977e662fe4e99c7d2f932ab00cdbe3c))
* **user:** padroniza e-mail para minúsculo antes da atualização ([f42bcc0](https://github.com/LucasMCFidelis/curriculum-generator/commit/f42bcc01e73e3a4c53df9c012018609e11f5d77c))
* **user:** reorganiza ordem de validação na busca por ID ou email ([623486f](https://github.com/LucasMCFidelis/curriculum-generator/commit/623486f7dfbd93c0ef0536acb3fd5a6848ab21b4))


### ✨ Features

* **auth:** define plugin de autenticação com geração e validação de JWT ([57f6780](https://github.com/LucasMCFidelis/curriculum-generator/commit/57f678070e31a30c15bdbd9c7199f95ec0f3bfbd))
* **auth:** gerar token automaticamente ao criar novo usuário ([cf3eade](https://github.com/LucasMCFidelis/curriculum-generator/commit/cf3eade30b249d69f8e20debcfad36717b3d01ed))
* **auth:** implementar funcionalidade de login com validação e geração de token JWT ([aa0ad81](https://github.com/LucasMCFidelis/curriculum-generator/commit/aa0ad81d5a1350a42fedc5fe746e7d53b5df172c))
* cria função de errorHandler para padronizar respostas de erro ([5323c47](https://github.com/LucasMCFidelis/curriculum-generator/commit/5323c4795630beb33d2095b3c2eec1a6a7550906))
* implementa cadastro de usuário com verificação de e-mail duplicado ([87faef2](https://github.com/LucasMCFidelis/curriculum-generator/commit/87faef2aac446c7d16348c8cf0375a16443cd317))
* **middleware:** criação do middleware de autenticação e verificação de propriedade ([1012594](https://github.com/LucasMCFidelis/curriculum-generator/commit/101259406266fb38c989e3c43fb387d34f27844e))
* **schema:** define modelos iniciais do banco de dados e seus relacionamentos ([080505f](https://github.com/LucasMCFidelis/curriculum-generator/commit/080505ff7e16fd4a4ad34cb5c1abab6d9801c920))
* **user-routes:** adiciona preHandlers de autenticação e verificação de propriedade nas rotas de usuário ([c7ba0ef](https://github.com/LucasMCFidelis/curriculum-generator/commit/c7ba0ef48d5433af5c03fb5d266a35207014c4aa))
* **user:** adiciona bcrypt e funções utilitárias para hash de senha ([a25e697](https://github.com/LucasMCFidelis/curriculum-generator/commit/a25e697867fa67befee36c5cd88ae426cfe7c6c3))
* **user:** adiciona funcionalidade de busca de usuário por ID ou email ([a5ebef1](https://github.com/LucasMCFidelis/curriculum-generator/commit/a5ebef13d5dcfeefe7ca4cbc4ee2f1a9b4c03451))
* **user:** adiciona funcionalidade de exclusão de usuário ([ab4cfc3](https://github.com/LucasMCFidelis/curriculum-generator/commit/ab4cfc3a39c96d4cadc5cd4f90c04fc94ea8a51a))
* **user:** adiciona seleção dinâmica de relacionamentos na busca de usuário ([366942f](https://github.com/LucasMCFidelis/curriculum-generator/commit/366942f8f59e0f0ee9d52afdc47b206283098348))
* **user:** estrutura inicial com controller, service, rotas e validações com Zod ([a31f6fd](https://github.com/LucasMCFidelis/curriculum-generator/commit/a31f6fd6789d21a51ecc6696dbfa6e5a54b5a534))
* **user:** implementa update de usuário ([a0d6acd](https://github.com/LucasMCFidelis/curriculum-generator/commit/a0d6acddf14216134e586e6367d1548f2271f135))
