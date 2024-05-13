# Projeto microservice loan

Este projeto visa atender ao trabalho da matéria SOFTWARE ENGINEERING DEVELOPMENT de Engenharia de Software da FIAP

## Objetivo do microserviço
simular financiamento através de tipos "price" e "sac".

## Arquitetura e padrões de projeto
Serviço desenvolvido com clean architecture usando os princípios/conceitos do SOLID também.

### Padrões de projeto
Para este projeto foram utilizados os seguintes padrões de projeto:
 - Decorator: Utilizado para "loggar" as informações que chegam no usecase de criação de loan 
 - Repository: Utilizado para o armazanemento dos dados
 - Factory: Utilizado para a criação de instâncias de entidades e repositorios em memória/repositorios de banco de dados

Os arquivos que utilizam esses padrões foram nomeados também com o nome do padrão no final, exemplo:
```bash
  InstallmentGeneratorFactory.ts
  InstallmentDatabaseRepository.ts
  LogDecorator.ts
```
## 🚀 Executar o projeto localmente

Abra a pasta microservice-loan-fiap e execute no terminal: 
```bash
  npm install
```
para instalar as dependências do projeto.

Após a instalação de todas as dependências, execute o comando:
```bash
  npm run start
```
Pronto, seu backend estará escutando na port 8888

