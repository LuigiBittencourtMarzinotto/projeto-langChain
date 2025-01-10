# LLM Summarizer API

Este projeto é uma API composta por Node.js com TypeScript e Express e um serviço Python utilizando FastAPI e LangChain, que permite aos usuários submeter textos e receber resumos gerados em diferentes idiomas.

---

## Estrutura do Projeto

### **node-api/**: Implementação da API Node.js
- **src/**: Código-fonte da API.
  - **app.ts**: Configuração inicial da aplicação.
  - **index.ts**: Inicia o servidor.
  - **routes/**: Define as rotas da API.
    - **tasksRoutes.ts**: Rotas para gerenciar tarefas.
  - **repositories/**: Lógica de armazenamento de tarefas.
    - **tasksRepository.ts**: Implementa um repositório baseado em arquivo JSON.

### **python-llm/**: Serviço Python
- **app/**: Código-fonte do serviço Python.
  - **main.py**: Ponto de entrada da aplicação FastAPI.
  - **services/**: Lógica de resumo de texto.
    - **llm_service.py**: Integra LangChain para gerar resumos em idiomas solicitados.

---

## Configuração do Ambiente

Antes de iniciar o projeto, é necessário configurar o seguinte:

- **HF_TOKEN**: Token de acesso ao Hugging Face (https://huggingface.co/settings/tokens). Caso ainda não possua, crie uma conta e gere um token gratuito.

---

## Como Executar

### 1. Clone o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### 2. Instale as dependências

#### Instale as dependências Node.js e Python:
```bash
./setup.sh install-node
./setup.sh install-python
```

### 3. Inicie a API Node.js e o serviço Python
```bash
./setup.sh start-node
./setup.sh start-python
```

### 4. Acesse os serviços:

- A API Node.js estará disponível em: `http://localhost:3005`
- O serviço Python estará disponível em: `http://localhost:8000`

---

## Endpoints

### Node.js API

#### **POST /tasks**
Cria uma nova tarefa para resumir um texto.

**Parâmetros:**
- `text` (string): Texto a ser resumido.
- `lang` (string): Idioma do resumo. Idiomas suportados:
  - `pt`: Português.
  - `en`: Inglês.
  - `es`: Espanhol.

**Resposta:**
- **200 OK**: Tarefa criada com sucesso.
- **400 Bad Request**: Caso o idioma não seja suportado.

#### **GET /tasks**
Lista todas as tarefas criadas.

**Resposta:**
- **200 OK**: Retorna a lista de tarefas com suas informações.

#### **GET /tasks/:id**
Retorna os detalhes de uma tarefa específica.

**Resposta:**
- **200 OK**: Retorna os detalhes da tarefa (id, texto original, resumo e idioma).
- **404 Not Found**: Caso a tarefa não seja encontrada.

#### **DELETE /tasks/:id**
Remove uma tarefa do sistema.

**Resposta:**
- **200 OK**: Tarefa removida com sucesso.
- **404 Not Found**: Caso a tarefa não seja encontrada.

#### **GET /**
Rota inicial da API. Retorna:
```json
{
  "message": "API is running"
}
```


---

## Persistência

As tarefas criadas pela API Node.js são armazenadas em um arquivo JSON para garantir a persistência dos dados.

---

## Tecnologias Utilizadas

- **Node.js** com **TypeScript** e **Express** para a API principal.
- **Python** com **FastAPI** para o serviço de resumo de textos.
- **LangChain** para processamento de linguagem natural.
- **Hugging Face** para modelos de linguagem.

---

## Exemplo de Texto

```
Diagnósticos médicos e decisões jurídicas: o papel da IA
A justiça e a Medicina são considerados campos de alto risco. Neles é mais urgente do que em qualquer outra área estabelecer sistemas para que os humanos tenham sempre a decisão final.

Os especialistas em IA trabalham para garantir a confiança dos usuários, para que o sistema seja transparente, que proteja as pessoas e que os humanos estejam no centro das decisões.

Aqui entra em jogo o desafio do "doutor centauro". Centauros são modelos híbridos de algoritmo que combinam análise formal de máquina e intuição humana.

Um "médico centauro + um sistema de IA" melhora as decisões que os humanos tomam por conta própria e que os sistemas de IA tomam por conta própria.

O médico sempre será quem aperta o botão final; e o juiz quem determina se uma sentença é justa.
```
FONTE: [BBC Brasil](https://www.bbc.com/portuguese/articles/c2kx2e74jyxo)

---

## Autor

Este projeto foi desenvolvido por Luigi Bittencourt Marzinotto. Caso tenha dúvidas ou sugestões, entre em contato!

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

