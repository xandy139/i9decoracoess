# i9 Decorações - Festas, Casamentos & Os Maiores Letreiros de LED de Londrina (1,20m) 🥂✨

Website institucional e comercial de alta conversão desenvolvido para a **i9 Decorações**, decorações refinadas para casamentos, debutantes e locação exclusiva dos **maiores letreiros de LED de Londrina e região (1,20m de altura)** em **luz fria (LED branco frio)**.

---

## 🌟 Diferenciais & Funcionalidades Principais

1. **Os Maiores Letreiros de Londrina e Região (1,20m de Altura):**
   - Estrutura robusta tridimensional em caixa alta branca acetinada com base firme.
   - Escala real monumental (1,20m) que alcança a altura do tronco, muito superior às letrinhas de 70cm a 90cm comuns do mercado.
   - **Exclusividade em Luz Fria:** Lâmpadas globo de LED em tom branco frio cristalino, entregando nitidez fotográfica impecável sem interferir nas cores dos vestidos e sem amarelamento.

2. **100% Fotos Reais do Acervo da Jaine:**
   - Todas as fotos ilusórias foram substituídas por registros autênticos de eventos reais atendidos pela i9 Decorações (no Tsuru Centro de Eventos, Espaço Luz, casamentos ao ar livre, etc.).

3. **Simulador Interativo de Letras de 1,20m:**
   - Permite que o cliente digite nomes, palavras ou iniciais (ex: `#15`, `LOVE`, `G & V`, `MARIA`, `ANA JULIA`, `E & L`).
   - Renderização realista de lâmpadas globo em LED Branco Frio com modos cênicos (Luz Contínua, Pulso Suave e Brilho Intenso).
   - Botão *"Quero Essas Letras no Meu Evento"* que transfere a escolha diretamente para a mensagem do WhatsApp.

4. **Portfólio com Filtro por Categoria & Lightbox Fullscreen:**
   - Categorias: Todos os Cenários Reais, Casamentos, 15 Anos & Debutantes, Letreiros 1,20m, Portais & Corações e Aniversários/Bodas.
   - Visualizador de fotos em tela cheia com navegação por setas e suporte à tecla `ESC`.

5. **Gerador de Orçamento Direto para o WhatsApp:**
   - Formulário intuitivo calibrado para a região de Londrina, Cambé, Ibiporã, Rolândia e região metropolitana.
   - Prévia dinâmica estilo conversa de WhatsApp em tempo real.
   - Envio direto e automatizado para o WhatsApp oficial da i9 Decorações: **+55 (43) 98808-0315**.

---

## 📁 Estrutura de Arquivos

```
sitedecorou/
├── assets/
│   └── images/              # Logo oficial, fotos reais e acervo em alta definição
├── css/
│   └── style.css            # Folha de estilos vanilla (Design System & Responsividade)
├── js/
│   └── main.js              # Lógica interativa (Simulador LED, WhatsApp, Lightbox, Filtros)
├── .gitignore               # Arquivos ignorados pelo Git
├── index.html               # Página principal semântica e otimizada para SEO
├── vercel.json              # Configurações de cache e rotas limpas para o Vercel
└── README.md                # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Você pode abrir o projeto diretamente no navegador dando um duplo clique em `index.html` ou executando um servidor estático local:

```bash
# Com Python
python -m http.server 3000

# Ou com Node.js (npx serve)
npx serve .
```
Acesse em: `http://localhost:3000`

---

## 📦 Como Publicar no GitHub e no Vercel

### Passo 1: Inicializar o repositório Git local e fazer commit

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: site completo i9 decoracoes com fotos locais e simulador de led"
```

### Passo 2: Criar o repositório no GitHub e enviar

1. Crie um novo repositório no seu GitHub (ex: `i9decoracoes`).
2. Vincule e envie os arquivos:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/i9decoracoes.git
git push -u origin main
```

### Passo 3: Publicar no Vercel (Em menos de 1 minuto)

#### Opção A (Pelo Painel do Vercel - Recomendada):
1. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
2. Clique em **"Add New..."** -> **"Project"**.
3. Selecione o repositório `i9decoracoes`.
4. Deixe as opções padrão (o arquivo `vercel.json` e `index.html` já estão prontos) e clique em **Deploy**.
5. Em poucos segundos, você terá um link seguro com HTTPS e domínio personalizado grátis (ex: `i9decoracoes.vercel.app`)!

#### Opção B (Pelo Terminal com a Vercel CLI):
```bash
npm i -g vercel
vercel
# Siga as instruções do terminal e escolha as opções padrão.
# Para produção:
vercel --prod
```
