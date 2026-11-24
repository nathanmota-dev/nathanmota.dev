---
gallery:
  - src: /projects/personal-financial-control/dashboard-1920.jpg
    alt: "Dashboard com saldo previsto, contas a pagar, cartões e investimentos"
    caption: "Dashboard: saldo previsto do mês, contas a pagar por dia, fatura dos cartões, divisão entre reserva e carteira e gastos com moradia."
  - src: /projects/personal-financial-control/ai-chat-1920.jpg
    alt: "Chat do assistente de IA aberto ao lado do dashboard, respondendo qual foi o maior gasto do mês"
    caption: "Assistente de IA: pergunta rápida \"Qual foi meu maior gasto do mês?\" respondida com base nos lançamentos do app, consultados por tools somente leitura."
  - src: /projects/personal-financial-control/credit-card-1920.jpg
    alt: "Tela de cartões com fatura aberta, próximas faturas e parcelas em aberto"
    caption: "Cartões: fatura do ciclo, compromissos das próximas faturas e parcelas em aberto."
  - src: /projects/personal-financial-control/projected-balance-1920.jpg
    alt: "Saldo projetado com evolução diária e alertas"
    caption: "Saldo projetado: fluxo de caixa dia a dia com recorrências, cartão e reserva mínima."
  - src: /projects/personal-financial-control/investments-1920.jpg
    alt: "Investimentos com patrimônio, reserva, carteira e distribuição por classe"
    caption: "Investimentos: reserva e carteira de longo prazo somadas sem dupla contagem."
  - src: /projects/personal-financial-control/transactions-1920.jpg
    alt: "Lançamentos com resultado do período e maiores categorias de despesa"
    caption: "Lançamentos: resultado do período, para onde foi o dinheiro e extrato com filtros."
---

## Contexto

Planilhas não davam conta de responder o que eu queria saber: quanto vai sobrar no fim do mês, o que a fatura do cartão já comprometeu nos próximos meses e quanto do meu patrimônio é reserva e quanto é investimento de longo prazo.

O Personal Financial Control nasceu para isso. Ele reúne contas, receitas, despesas, transferências, cartões com parcelas e faturas, recorrências, investimentos e metas em um só lugar, e importa os dados direto do banco via **Open Finance**. Em cima disso entra a **IA**: ela sugere categorias para o que chega do banco e responde perguntas em linguagem natural, como *"qual foi meu maior gasto do mês?"* ou *"posso gastar mais este mês?"*. Como o app guarda dados financeiros reais, segurança e consistência pesaram em cada decisão, inclusive no que pode ou não ser enviado a um modelo.

## Arquitetura

![Diagrama de arquitetura do Personal Financial Control](/projects/personal-financial-control/architecture.pt.svg)

*Uma aplicação Next.js que concentra autenticação, regras de domínio, criptografia e as chamadas de IA no servidor. As leituras vão para uma réplica local e as gravações para o Turso.*

O app é um monólito Next.js. A interface usa Server Components e Server Actions, e as integrações externas usam API Routes. Toda requisição passa pelo `proxy.ts`, que valida sessão, desbloqueio por PIN e origem antes de chegar ao domínio. As regras financeiras ficam em módulos puros dentro de `lib/`, testados de forma isolada. A persistência usa Drizzle sobre SQLite/libSQL, com migrações versionadas.

## IA no app

A IA é opcional e fica toda no servidor, com o **Vercel AI SDK**. O usuário escolhe o provedor em *Configurações → IA*: **OpenAI**, **Anthropic**, **Google Gemini**, **DeepSeek** ou **Ollama** rodando local, quando os dados não devem sair da máquina. Sem configuração, nada é enviado a ninguém.

### Categorização automática com sugestões

Depois de cada sincronização com o banco, os lançamentos sem categoria vão para o modelo junto com as categorias permitidas e até 300 exemplos do próprio usuário, tirados das regras que ele já confirmou. Assim a IA segue o critério da pessoa, não um genérico.

O resultado passa por várias barreiras antes de aparecer:

- **Saída estruturada com enum:** o schema Zod da resposta só aceita os apelidos das categorias reais (`c1`, `c2`…), então o modelo não consegue inventar categoria, e os UUIDs do banco nunca chegam ao provedor.
- **Validação no código:** a sugestão só vale com confiança de pelo menos 0,8 e se o tipo bate (entrada só vai para receita, saída só para despesa). O prompt pede `null` em vez de chute, porque uma categoria errada custa mais que nenhuma.
- **Proteção contra prompt injection:** descrições de lançamento vêm do banco e são tratadas como dados, nunca como instruções.
- **Cada descrição é perguntada uma vez:** toda resposta, inclusive "não sei", fica gravada (cifrada), e a próxima sincronização só manda o que é novo. Os lotes de 50 rodam em sequência para não estourar o *rate limit* do provedor.

Nada é aplicado sozinho. A sugestão aparece na revisão com o motivo e um botão *Aceitar*. Ao aceitar, ela vira uma regra normal, que também passa a servir de exemplo para a IA nas próximas vezes.

### Assistente financeiro no chat

Um botão flutuante abre um chat que responde sobre os dados reais do usuário, com resposta em markdown e *streaming*. O modelo não acessa o banco: ele chama *tools* no servidor, num ciclo de até 8 passos, e só narra o que elas devolvem.

- **As mesmas tools do MCP, sem duplicar código:** as definições do servidor MCP rodam contra um gravador que captura nome, schema e handler de cada tool. O chat recebe só as marcadas como somente leitura (`readOnlyHint`), então uma tool de escrita adicionada ao MCP depois nunca chega ao modelo por acidente.
- **Números vêm do app, não do modelo:** o prompt proíbe somar valores na mão. Totais e rankings saem de `get_spending_summary`, e *"posso gastar este mês?"* usa `get_spending_capacity`, que devolve quanto sobra por dia e até quando, com base no saldo projetado e nas faturas.
- **Limites claros:** o chat só consulta, não dá recomendação de investimento e recebe a data de hoje no prompt para converter "mês passado" em períodos reais.
- **Privacidade:** a conversa fica só na memória do navegador, a API key nunca sai do servidor e erros do provedor viram uma mensagem fixa, para não vazar detalhes da requisição. O tamanho da conversa também é limitado.

### Provedores, chave e Ollama local

A tela de configurações deixa testar a conexão antes de salvar, com um prompt mínimo, para que chave, endereço ou modelo errado apareçam na hora. Com Ollama, o app lista os modelos instalados direto do servidor local, e os *timeouts* são bem maiores, porque um modelo rodando em CPU pode levar minutos.

A API key é gravada com a mesma criptografia por campo do resto do app, e a interface só mostra a chave mascarada. Se a configuração salva não puder ser lida, a IA desliga em vez de cair em outro provedor sem avisar.

### Servidor MCP para agentes de IA

O app expõe um servidor **MCP** em `/api/mcp` para que um agente como Codex ou Claude consulte gastos, orçamento e faturas, categorize pendências e lance receitas, despesas e compras de cartão sem acesso direto ao banco. O desenho prioriza segurança:

- aceita apenas conexões de loopback e um token próprio, do qual o servidor guarda só o hash;
- valores sempre em centavos inteiros, datas em `YYYY-MM-DD` e IDs em UUID;
- toda criação exige uma chave de idempotência, então repetir uma chamada não duplica o lançamento;
- exclusões exigem o argumento literal `confirm: true`.

## Decisões técnicas

### Open Finance sem duplicar nada

A integração com a Pluggy é a parte mais delicada do projeto, porque os dados do banco chegam incompletos e fora de ordem. Cada lançamento importado é classificado nesta ordem:

| Classificação | Como é identificada | Resultado |
|---|---|---|
| Transferência própria | Pagador **e** recebedor são o titular, por CPF e depois por nome completo | Uma transferência, sem receita nem despesa |
| Pagamento de fatura | Descrição com `PAGAMENTO` seguido de `FATURA` | Vinculado à fatura, fora das despesas |
| Aporte ou resgate | Tipo da operação ou descrição | Movimento de investimento |
| Comum | Todos os demais | Receita ou despesa |

Alguns problemas reais que precisei resolver:

- **Pix de fim de semana:** um banco lança no sábado e o outro só no dia útil seguinte. As transferências entre contas vinculadas são pareadas por valor numa janela de 3 dias e viram um único registro.
- **Parcelas sem identificador comum:** a Pluggy devolve uma transação por parcela. Elas são agrupadas por descrição normalizada, valor e número de parcelas, com tolerância de 1 centavo por parcela, porque alguns bancos jogam o resto do arredondamento na primeira.
- **Pendente que vira confirmado com outro `id`:** o lançamento confirmado assume a linha local equivalente, em vez de criar uma duplicata.
- **Conferência de fatura:** cada fatura é validada com a conta *total = compras + saldo anterior não pago − pagamentos antes do fechamento*, e aparece como *Conferida*, *Com diferença* ou *Pagamento não vinculado*.
- **Categorias aprendidas:** quando o usuário categoriza um lançamento importado, o app grava uma regra para a descrição normalizada e aplica nas próximas sincronizações, sem depender do plano pago da Pluggy. Essas regras também são os exemplos que guiam a IA.

A sincronização é idempotente: rodar duas vezes não cria nada novo, e fatura já paga nunca é reescrita. A migração do histórico manual para os dados do banco é feita por um script com simulação (*dry-run*), confirmação explícita do banco de destino e relatórios de antes e depois para comparar os totais.

### Criptografia por campo

Valores monetários, descrições e identificadores remotos são gravados cifrados com **AES-256-GCM**. A criptografia fica na camada do ORM, em tipos de coluna customizados do Drizzle, então o código de domínio lê e grava valores normais sem saber disso.

As chaves são derivadas por finalidade com HKDF, e o contexto do campo entra como dado autenticado (AAD). Assim, um valor cifrado copiado para outra coluna falha na verificação em vez de ser lido. Para buscar sem decifrar a tabela inteira, colunas `_hash` guardam um HMAC do valor.

Toda tabela de negócio precisa estar classificada num inventário versionado: uma coluna nova sem classificação quebra a definição do schema, e o banco recebe *CHECK constraints* que garantem o formato e a presença dos índices.

### Réplica local: leituras até 96% mais rápidas

Com o Turso remoto, cada página fazia várias consultas pela rede. A solução foi uma réplica SQLite local: todas as leituras vão para o arquivo local, as gravações continuam indo ao Turso, e o app sincroniza a cada 30 segundos, ao voltar para a janela e ao recuperar conexão.

| Serviço | Turso direto | Réplica | Redução |
|---|---:|---:|---:|
| Dashboard | 1.671,78 ms | 183,10 ms | 89,0% |
| Cartão | 1.773,32 ms | 123,04 ms | 93,1% |
| Lançamentos | 148,84 ms | 5,99 ms | 96,0% |
| Saldo projetado | 642,98 ms | 164,30 ms | 74,4% |

Medianas de cinco amostras aquecidas, com dados reais e só SELECTs, incluindo descriptografia e cálculos.

A consistência foi tratada com cuidado: o app lê as próprias gravações logo depois de confirmá-las, uma trava de arquivo impede dois processos na mesma réplica e, se a sincronização falhar, o app entra em modo **somente consulta** em vez de arriscar gravações sobre dados desatualizados. Se a resposta de uma gravação se perde, o app avisa que ela não foi confirmada e não tenta de novo sozinho, porque o commit remoto pode já ter acontecido.

### Sessão local e PIN

O Google é consultado só no login. Depois disso, a sessão usa cookies assinados com HMAC e um PIN de 6 dígitos, com bloqueio por inatividade configurável. Cinco PINs errados invalidam todas as sessões. Não há cadastro público: só e-mails autorizados no banco entram.

## Qualidade e entrega

- Mais de 110 arquivos de teste com **Vitest**, cobrindo regras de domínio, APIs, componentes e o fluxo de IA com modelos simulados, e 25 cenários E2E com **Playwright**.
- Teste de integração da réplica contra um libSQL isolado em Docker, simulando queda real de conexão.
- Benchmarks de desempenho com *baselines* versionadas.
- Sete workflows no **GitHub Actions**. O *quality gate* do PR roda build, lint, typecheck, cobertura, auditoria de dependências, duplicação, tamanho de código, E2E e benchmarks, com política de não regressão.
- Roda com Docker Compose, como aplicativo desktop no Linux ou em **modo demo**, com dados fictícios em memória, que é a versão publicada na Vercel.
