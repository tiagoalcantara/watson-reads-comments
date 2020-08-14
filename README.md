# 🤖 Watson Reads Comments
  Fiz esse pequeno projeto a principio para estudar automação com Puppeteer realizando web scrapping com comentários do YouTube. Depois de coletados os comentários, decidi integrar com o serviço de interpretação de linguagem natural da IBM Cloud.
  
## Tecnologias
- [NodeJS](https://nodejs.org/en/)
- [Puppeteer](https://pptr.dev/)
- [IBM Watson](https://www.ibm.com/watson/br-pt/)
- [Typescript](https://www.typescriptlang.org/) 

## Como rodar?

**1. Clonar o projeto**

`git clone https://github.com/tiagoalcantara/watson-reads-comments.git`

**2. Instalar as dependências**

`yarn install`

**3. Configurar API da IBM**

  Pra rodar a aplicação você vai precisar de uma conta na [IBM Cloud](https://cloud.ibm.com/). Busque por Natural Language Understanding nos recursos, crie um novo recurso e copie os dados de acesso (API_KEY e URL).
  Dentro da pasta do projeto, crie uma pasta chamada `credentials` e dentro dela um arquivo `nlu.ts`, no seguinte formato:
  
```typescript
const nluCredentials = {
    API_KEY: 'SUA_API_KEY',
    API_URL:
        'SUA_URL',
};

export default nluCredentials;
```

**4. Pronto! Agora basta rodar :)**

`yarn dev`

## Exemplo

Ao rodar a aplicação, será solicitada a URL de um vídeo. Nesse exemplo utilizei o vídeo [Nota de R$ 200: por que agora e qual a razão de tanta polêmica?](https://www.youtube.com/watch?v=u0A5Opejy2k) da BBC.

Ao entrar com a URL, o Puppeteer acessa a página e coleta cerca de 200 comentários. Os comentários são passados ao Watson, que analisa e proporciona alguns dados, formatados e apresentados da seguinte maneira:

<p align="center">
  <image src="https://i.imgur.com/kUURt1M.png">
</p>
