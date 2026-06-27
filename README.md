# 🧠 Quantum AI Trainee Allocator — Optimus Jr.

Uma SPA de **trollagem corporativa** para "alocar" trainees nas diretorias da
**Optimus Jr.** (Empresa Júnior de Engenharia de Controle e Automação).

Toda a mágica roda no front-end: o trainee escolhe seu nome, responde 4
perguntas absurdas a uma IA sarcástica e — depois de uma falsa tensão
dramática — é alocado na sua diretoria pré-determinada num card holográfico 3D.

## ✨ Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (design system Optimus, cores e geometria estritas)
- **Framer Motion** (transições de cena, stagger, springs, layout)
- **CSS 3D Transforms** (tilt holográfico real via `boundingClientRect`)
- **Lucide React** (ícones)
- Fonte **League Spartan** (via Google Fonts)

## 🎬 As 4 cenas

1. **PortalLogin** — seleção do trainee + "Iniciar Varredura Neural".
2. **QuantumChat** — entrevista troll com IA que digita e responde com desdém.
3. **ClimaxLoader** — barra circular que trava em 99% e dá um *white flash*.
4. **HolographicResultCard** — card 3D que rastreia o mouse, com glare e partículas.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite imprimir (normalmente `http://localhost:5173`).

### Build de produção

```bash
npm run build
npm run preview
```

## 🖼️ Imagens das diretorias

Coloque os PNGs em `public/assets/diretorias/` com estes nomes exatos:

| Arquivo                  | Diretoria         | Trainee |
| ------------------------ | ----------------- | ------- |
| `projetos.png`           | Projetos          | João    |
| `gestao.png`             | Gestão de Pessoas | Maria   |
| `marketing.png`          | Marketing         | Pedro   |
| `comercial.png`          | Comercial         | Ana     |
| `presidencia.png`        | Presidência       | Lucas   |
| `vice-presidencia.png`   | Vice-Presidência  | Julia   |

Sem as imagens, o card mostra um placeholder elegante — nada quebra.

## 🌐 Deploy

É 100% estático. Suba na [Vercel](https://vercel.com) ou
[Netlify](https://netlify.com): build `npm run build`, diretório de saída `dist`.

## 🗂️ Estrutura

```
src/
├─ types.ts                       # Tipagens das entidades
├─ data/
│  ├─ trainees.ts                 # Banco fake: 6 trainees, 24 perguntas
│  └─ aiReactions.ts              # Falas de desdém da IA
├─ hooks/
│  ├─ useTypewriter.ts            # Efeito de digitação
│  └─ useChatSimulation.ts        # Coreografia do chat
├─ components/
│  ├─ shared/                     # Gear, Circuito, Bevel, Equalizer
│  └─ scenes/                     # As 4 cenas
└─ App.tsx                        # Orquestrador (AnimatePresence)
```
