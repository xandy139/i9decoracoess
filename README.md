# i9 Decorações - Festas, Casamentos & Letras de LED Gigantes 🥂✨

Website institucional e comercial de alta conversão desenvolvido para a **i9 Decorações**, especialista em cenografia floral de alto padrão para casamentos, debutantes e locação exclusiva de Letras de LED Gigantes.

---

## 🌟 Funcionalidades Principais

1. **Design Sofisticado & Identidade Visual:**
   - Paleta refinada com Dourado Champagne, Branco Perolado e Grafite Escuro.
   - Tipografia de luxo (*Cormorant Garamond*, *Playfair Display* e *Plus Jakarta Sans*).
   - Micro-interações, sombras iluminadas e efeitos de iluminação cênica.

2. **Simulador Interativo de Letras de LED:**
   - Permite que o cliente digite o nome do casal, palavras ou iniciais (ex: `#15`, `LOVE`, `A & M`, `SR & SRA`).
   - Lâmpadas bolinha estilo *vintage marquee* com renderização realista.
   - Alternância de cores de luz: Âmbar Vintage, Branco Quente e Rosa Neon.
   - Botão *"Quero Essas Letras no Meu Evento"* que transfere a escolha diretamente para o orçamento.

3. **Portfólio com Filtro por Categoria & Lightbox Fullscreen:**
   - Categorias: Todos, Casamentos, Letras de LED, Mesas de Doces e 15 Anos.
   - Visualizador de fotos em tela cheia com navegação por setas e suporte à tecla `ESC`.
   - Inclui a **foto real do acervo (`#15`)** com destaque exclusivo.

4. **Gerador de Orçamento Direto para o WhatsApp:**
   - Formulário intuitivo (Nome, Tipo de Evento, Data Prevista, Local, Nº de Convidados e Serviços).
   - Prévia dinâmica estilo conversa de WhatsApp em tempo real.
   - Botão de envio que formata o texto com emojis e abre a conversa no WhatsApp automaticamente.

5. **100% Autônomo (Zero Dependência de Imagens Externas):**
   - Todas as fotos, avatares, fundos e a logo oficial estão salvos localmente em `assets/images/`, garantindo carregamento ultrarrápido e sem risco de links quebrados no Vercel.

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
