# ToDoList

Este projeto é uma aplicação de lista de tarefas desenvolvida com [Angular](https://angular.io/) e [Bootstrap](https://getbootstrap.com/). A aplicação permite que os usuários adicionem, editem e excluam tarefas, além de marcar tarefas como concluídas. A interface é responsiva e utiliza animações para melhorar a experiência do usuário.

## Tecnologias Utilizadas

- **Angular**: Framework para construção de aplicações web.
- **Bootstrap**: Biblioteca de CSS para estilização e layout responsivo.

## Checklist de Etapas

- [x] Criação do ToDo-List com LocalStorage.
- [x] Adição de autenticação com LocalStorage.
- [ ] Adição do Firebase no projeto (autenticação e lista).
- [ ] Deploy.

## Futuras Alterações

### Versão 1: Funcionalidades Básicas (Localhost)

- Adicionar, editar e excluir tarefas.
- Marcar tarefas como concluídas.
- Interface responsiva utilizando Bootstrap.
- Armazenamento de tarefas no `localStorage`.

### Versão 2: Autenticação

- Implementação de autenticação de usuários.
- Proteção de rotas com `AuthGuard`.
- Login e registro de usuários.
- Armazenamento seguro de credenciais no `localStorage`.

### Versão 3: Conexão com Firebase

- Integração com Firebase para armazenamento de dados.
- Autenticação de usuários utilizando Firebase Authentication.
- Sincronização de tarefas em tempo real.
- Implementação de funcionalidades avançadas como notificações push.

## Tutorial Rápido para Rodar o Projeto

### Pré-requisitos

- Node.js e npm instalados. Você pode baixá-los em [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Para instalar, execute:
  ```bash
  npm install -g @angular/cli
  ```

### Passos para Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/marcosluan00/todo-list
   cd todo-list
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```

4. **Abra o navegador e navegue para:**
   ```
   http://localhost:4200/
   ```

A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos de origem.


## Contribuindo

Se você deseja contribuir para este projeto, por favor, siga as diretrizes de contribuição.

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.