# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](https://github.com/LucasMCFidelis/curriculum-generator/compare/v1.2.0...v1.3.0) (2025-06-26)


### 💅 Styles

* Ajusta espaçamento de Card e Modal.Root; Diminue font-size da estilização global de h3 ([155fb7f](https://github.com/LucasMCFidelis/curriculum-generator/commit/155fb7f390728971c0556049407e92fcf76c8901))
* ajusta para itens do formulario de usuário usem grid com uma coluna em telas menores que md ([fe7c07d](https://github.com/LucasMCFidelis/curriculum-generator/commit/fe7c07dcd7143c921db4ec4958d2e2435e9b0251))
* ajustar grid do Modal.Body para usar 1 coluna em telas pequenas e 2 colunas a partir de md ([eb547b3](https://github.com/LucasMCFidelis/curriculum-generator/commit/eb547b3ec9486bcf419e5850adfcd5ad1c81b744))
* ajuste da paleta de cores com oklch para tema claro e escuro ([431cb5c](https://github.com/LucasMCFidelis/curriculum-generator/commit/431cb5c06a004b753246bf89f9d77b655c545873))
* **button:** ajusta estilo da variante icon com rounded-full e aplica aos botões de ícone existentes ([a14b65f](https://github.com/LucasMCFidelis/curriculum-generator/commit/a14b65f1d26055758dfbf1442010463cb2b55322))
* **button:** ajusta estilo para exibir ponteiro ao focar em um botão ([7d82810](https://github.com/LucasMCFidelis/curriculum-generator/commit/7d82810e64af71b9ee190d7ffec2400c47216a58))
* define grid para FormItem e padroniza comportamento de FormMessage no grid ([4408429](https://github.com/LucasMCFidelis/curriculum-generator/commit/440842910ddfe9f85dbc29ddfc73c486bcc0c522))
* **modal:** ajusta espaçamento entre elementos no layout do modal ([4757115](https://github.com/LucasMCFidelis/curriculum-generator/commit/4757115427843dfac9b62a52a6454040c825c15e))


### ✨ Features

* adiciona componente de layout com suporte a children ([6d50994](https://github.com/LucasMCFidelis/curriculum-generator/commit/6d509943af9a848a7f1d5b59d06767aa59d40ef2))
* adiciona componente SkillsSection com listagem e botão de cadastro de habilidades ([588bb25](https://github.com/LucasMCFidelis/curriculum-generator/commit/588bb25237296383203486f25fb07e7c132c4230))
* adiciona componente ToggleTheme para alternar tema escuro/claro com persistência no localStorage ([1469d8a](https://github.com/LucasMCFidelis/curriculum-generator/commit/1469d8a809515ff0977e491b3d801975abb7aa7b))
* adicionar componente de spinner LoadingSpin ([59c33e5](https://github.com/LucasMCFidelis/curriculum-generator/commit/59c33e5db690deddfb0b5594f8fe1a0c91d410db))
* adicionar mutation de criação de habilidades e uso de estado no modal ([a8e4b56](https://github.com/LucasMCFidelis/curriculum-generator/commit/a8e4b56ca615256394e7d52eccc2a02aee849f1e))
* adicionar useQuery, useMutation e useQueryClient no ProfileUserModal ([6f0c70d](https://github.com/LucasMCFidelis/curriculum-generator/commit/6f0c70d4cbe4e2316ad61d685247019ccf8052fd))
* **auth:** adiciona hook useAuth para consumo do AuthContext com verificação de provider ([652e0b8](https://github.com/LucasMCFidelis/curriculum-generator/commit/652e0b8df9cffc6a5f0a22fd044c22fecd6613fb))
* **auth:** adiciona interceptador global para 401 e integra com AuthProvider ([eb9a8f4](https://github.com/LucasMCFidelis/curriculum-generator/commit/eb9a8f4509cfa97d61f9c768e355d8df4ad6f2b0))
* **auth:** estruturação inicial do AuthContext com funcionalidades de login e logout ([c8e2302](https://github.com/LucasMCFidelis/curriculum-generator/commit/c8e230248c12e9bb446280aaecc60db0e707a146))
* cria estrutura inicial do Header com menubar e utiliza o ToggleTheme ([ad6f43b](https://github.com/LucasMCFidelis/curriculum-generator/commit/ad6f43ba81e8853d30f9a733ada11cb6335162d9))
* criar componente de confirmação de exclusão de conta (ainda sem integração) ([16acc52](https://github.com/LucasMCFidelis/curriculum-generator/commit/16acc52e7ef4bbd5e7c170b4d51ff4df2ea0819d))
* criar contexto SkillContext e integrar com SectionSkills para centralizar dados de habilidades do usuário ([cf9a7d5](https://github.com/LucasMCFidelis/curriculum-generator/commit/cf9a7d565e5eb67ee62e7f0740b0129e84dfe60b))
* criar modal de criação de habilidades e componente reutilizável SkillForm ([6579cf2](https://github.com/LucasMCFidelis/curriculum-generator/commit/6579cf20e66d67f00bf197e6695dcf3709ee8f88))
* criar modal de edição de habilidade com preenchimento dinâmico e formulário remontável ([e48d88b](https://github.com/LucasMCFidelis/curriculum-generator/commit/e48d88b2903520cb3dac10079df569d4f0bd9e11))
* criar mutation de atualização de skill no contexto e utilizar no modal ([f0d1a6a](https://github.com/LucasMCFidelis/curriculum-generator/commit/f0d1a6a446d13949a4d96568113261f6b14d8ec0))
* extrai componente FormFieldPassword para uso reutilizável em LoginModal e outros formulários ([a696c2e](https://github.com/LucasMCFidelis/curriculum-generator/commit/a696c2eb7c381481961102b925eac03c62b6c744))
* integração completa do ConfirmDeleteAccount com o backend ([3195ac8](https://github.com/LucasMCFidelis/curriculum-generator/commit/3195ac837034477faf47ef28d054a86d553c0fca))
* integrar cadastro de usuário com backend e autenticação ([e05cfa3](https://github.com/LucasMCFidelis/curriculum-generator/commit/e05cfa3ebdd465d44c9793d06ee5c6d9b7721be0))
* **layout:** cria componente Footer reutilizável ([a455ec3](https://github.com/LucasMCFidelis/curriculum-generator/commit/a455ec3a38c890dc77e55164c0574741c9255d9b))
* **login:** adicionar isLoginLoading para feedback visual durante o login ([d791a46](https://github.com/LucasMCFidelis/curriculum-generator/commit/d791a463a4b260fcb29df0eaea49e3e585255c52))
* **login:** cria modal de login e integra controle de estado ao contexto de autenticação ([2dd52c3](https://github.com/LucasMCFidelis/curriculum-generator/commit/2dd52c376186d15c167ef85d9bf4064f8389470e))
* **login:** desabilitar botão de mostrar senha e ocultar senha durante login ([e87e00f](https://github.com/LucasMCFidelis/curriculum-generator/commit/e87e00f1cf2fab6e18aa536b45970bfba28029c1))
* **login:** instala zod e define schema de validação para formulário de login ([1d5a931](https://github.com/LucasMCFidelis/curriculum-generator/commit/1d5a931c48d8201efa54e07063e2872f6a0f6dde))
* **login:** integracao com backend e controle do formulario de login ([cefe846](https://github.com/LucasMCFidelis/curriculum-generator/commit/cefe8466a0f2284aba299a1b6be2d590914294d9))
* **login:** permitir alternar dinamicamente a visualização do campo de senha ([b6ab829](https://github.com/LucasMCFidelis/curriculum-generator/commit/b6ab82949145e8ec962371869ed0a988a9197b6e))
* **modal:** cria componente de Modal com subcomponentes ([8de2099](https://github.com/LucasMCFidelis/curriculum-generator/commit/8de209973d1c33420f1f7e7735390f2eb1697f7b))
* **modal:** criação de contexto global para controle centralizado de modais ([c16afb1](https://github.com/LucasMCFidelis/curriculum-generator/commit/c16afb182a7bf768948050b9d2d697b66cde26e6))
* **profile:** Adiciona integração básica com o endpoint de atualizaçãoo de usuários ([7149e43](https://github.com/LucasMCFidelis/curriculum-generator/commit/7149e43a4c99b6183cec1846ae66defd6d36c1ab))
* **profile:** adiciona modal de edição de perfil com schema de validação e tipagem ([92ba35d](https://github.com/LucasMCFidelis/curriculum-generator/commit/92ba35d93f733c3395ee8251348c6787fcd6860f))
* **profile:** Adiciona retorno de erro em updateUserMutation e exibição com renderização condicional da mensagem de erro ([1c0a040](https://github.com/LucasMCFidelis/curriculum-generator/commit/1c0a04008b193ce59acafd49993606d1c03147ff))
* resetar formulário de criação ao fechar modal de cadastro de habilidade ([0322fbe](https://github.com/LucasMCFidelis/curriculum-generator/commit/0322fbe7b52b18118d01cb56957cf0bf5c203ca3))
* **schema:** cria formUserCadastreSchema base e aplica como shape para os schemas de login e atualização ([30892fb](https://github.com/LucasMCFidelis/curriculum-generator/commit/30892fbbaf747122ebe38b690e27c9456ba5e531))
* **skill:** adiciona deleteSkillMutation ao contexto e modal de confirmação de exclusão ([b4c1c24](https://github.com/LucasMCFidelis/curriculum-generator/commit/b4c1c2419a1f8614ac4a7980f05fdfcd84d456a8))
* **skills:** adicionar SearchInput e filtro por tipo na SkillsSection ([7510ea5](https://github.com/LucasMCFidelis/curriculum-generator/commit/7510ea5d721cc1ec1e92e9b515d06c68fdcbde7f))


### ♻️ Refactors

* Adiciona validação ao campo userCity para que não exceda 50 caracteres ([757f195](https://github.com/LucasMCFidelis/curriculum-generator/commit/757f195783af9c971891bfa5787070a6ed017194))
* ajusta Header com suporte a menu responsivo e melhora organização ([f1729ae](https://github.com/LucasMCFidelis/curriculum-generator/commit/f1729ae890239651c3965418e45c61e8cac25750))
* Ajusta para que schema de validação de atualização de usuário aceite strings vazias para url, para que possa sobreescrever campos no backend ([4ba169c](https://github.com/LucasMCFidelis/curriculum-generator/commit/4ba169cd2cad9d2cc5451b0433bcc77914a5ba5d))
* ajusta para tratar strings vazias do forms de usuário nas urls, para evitar ser tratadas como urls invlidas na atualização ([3d60d50](https://github.com/LucasMCFidelis/curriculum-generator/commit/3d60d5027e25d21e73ea27ffc09e890cb9cb0eb4))
* ajusta para updateUserSchema use o shape de createUserSchema para garantir centralização das definições de validação ([d1537f6](https://github.com/LucasMCFidelis/curriculum-generator/commit/d1537f664297f728a103e0ca81d819524aa06f42))
* Ajusta schema e rota de atualização para aceitar strings vazias para que campos possam ser sobreescritos ([dec0629](https://github.com/LucasMCFidelis/curriculum-generator/commit/dec0629c99f60a7a29bd8b2f4e647da407a2efdd))
* aplica estilização global para títulos e remove estilos duplicados dos componentes ([f496a97](https://github.com/LucasMCFidelis/curriculum-generator/commit/f496a970a9c7bea35b57f55c3ccdd5762d32422f))
* **auth:** aplica tipagem CurrentUserData ao currentUser no AuthProvider ([70665a3](https://github.com/LucasMCFidelis/curriculum-generator/commit/70665a32aaa3ddd468918140614aa253c792332c))
* exibe CTA de cadastro na home para usuários não logados e organiza estrutura de Providers ([5dd39d8](https://github.com/LucasMCFidelis/curriculum-generator/commit/5dd39d8ffe3ed6e00958870e32c2ade0a26b0d53))
* extrai UserForm de ProfileUserModal e adiciona suporte a input de senha; aplica em ProfileUserModal e CadastreUserModal ([6b5ac24](https://github.com/LucasMCFidelis/curriculum-generator/commit/6b5ac24623113b865e181aa3a7bcc3949223c4c7))
* **footer:** corrigir estrutura HTML com sChild e tornar layout responsivo em telas menores ([b2d3f7d](https://github.com/LucasMCFidelis/curriculum-generator/commit/b2d3f7dc9c359065ae45289224637f88c447cccc))
* **header:** ocultar menus para usuários não logados e adicionar botão de cadastro ([f4caee8](https://github.com/LucasMCFidelis/curriculum-generator/commit/f4caee87efd142f4db52aecaaac76dddb461a3b8))
* **header:** separa lista de seções e usa handleNavigation na busca ([471084c](https://github.com/LucasMCFidelis/curriculum-generator/commit/471084ce3fa8808ddb4a6d40aa2238fc84cd7601))
* **login-modal:** integração com contexto global de modais ([d6f7e11](https://github.com/LucasMCFidelis/curriculum-generator/commit/d6f7e119f5ad3abd44f432164ed4b8d357f853d9))
* **login:** define FormLoginDTO no schema e aplica ajustes no loginModal e contexto ([ea48be4](https://github.com/LucasMCFidelis/curriculum-generator/commit/ea48be4f2aac8a4ed3bdecc7932fb67770747b34))
* **modal:** tornar Modal.Action, Confirm e Close mais flexíveis aceitando children ao invés de textContent e icon ([5f1075b](https://github.com/LucasMCFidelis/curriculum-generator/commit/5f1075be4a9e9a916798cc1b726e58dbfb6472eb))
* mover SkillProvider para main e disponibilizar estado global para modais ([555054d](https://github.com/LucasMCFidelis/curriculum-generator/commit/555054d0a7d1ad14a08cddaf658d139fc8775cb5))
* **profile:** isolar lógica de reset do formulário e aplicar em erro e fechamento de modal ([49d5b6b](https://github.com/LucasMCFidelis/curriculum-generator/commit/49d5b6b12bbb10b2e86d2e1fdab9e3f1057c106c))
* remove componentes temporários criados para testes com ShadCN ([8078892](https://github.com/LucasMCFidelis/curriculum-generator/commit/807889281731721b198e05d311ec9e6cba52fca7))
* Remove função close modal da lista de dependencias no useEffect de CreateSkillModal ([66ad7f5](https://github.com/LucasMCFidelis/curriculum-generator/commit/66ad7f5aaf36929bc2e43882ac216a550f6594ca))


### 🐛 Bug Fixes

* **profile:** define tipo dos botões e aplica padrão para mensagens de erro ([f787b91](https://github.com/LucasMCFidelis/curriculum-generator/commit/f787b91673a0c113b0006ba62224541718b06250))
* reset do formulário de criação de skill após cadastro com sucesso ([fd3dcdf](https://github.com/LucasMCFidelis/curriculum-generator/commit/fd3dcdf09481f9814a54904ea28393cb5f447e09))


### 🧹 Chores

* configura CORS no backend para permitir requisições do frontend ([1769e93](https://github.com/LucasMCFidelis/curriculum-generator/commit/1769e93b8856f4cc947481348113117c7623088b))
* configurar shadcn e instalar componentes principais ([20ce2df](https://github.com/LucasMCFidelis/curriculum-generator/commit/20ce2df5ab5d3b1313346e1b26ee864eb944144c))
* merge de develop na release/skills para preparar publicação ([835e383](https://github.com/LucasMCFidelis/curriculum-generator/commit/835e383a2faf8f9f84e8e80924ee9ad0d23a7b36))
* reinicialização do frontend com Vite + TypeScript ([96d5fef](https://github.com/LucasMCFidelis/curriculum-generator/commit/96d5fef780449f55c64d45c65af6eade404d3b3e))
* **tsconfig:** reorganiza arquivos de configuração para melhor manutenção ([22a90c5](https://github.com/LucasMCFidelis/curriculum-generator/commit/22a90c568c0706d612e1ebe759915f28d463a8db))
* **ui:** adiciona Menubar à biblioteca de componentes via shadcn/ui ([57c8f97](https://github.com/LucasMCFidelis/curriculum-generator/commit/57c8f973cdd6c4c22bba6e01e234da2e4a413206))

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
