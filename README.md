## Requisitos funcionais
- [x] Deve ser possível cadastrar um carro;
- [x] Deve ser possível listar os carros disponíveis;
- [x] Deve ser possível cadastrar uma especificação para um carro;
- [x] Deve ser possível listar todas as especificações;
- [x] Deve ser possível listar todos os carros;
- [x] Deve ser possível listar todos os carros disponíveis por categoria;
- [x] Deve ser possível listar todos os carros disponíveis pela marca;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome;
- [x] Deve ser possível cadastrar as imagens dos carros;
- [x] Deve ser possível cadastrar um aluguel;
## Requisitos não funcionais
- [x] Utilizar o multer para upload dos arquivos;
## Regras de negócio
- [x] Não deve ser possível cadastrar um carro com uma placa já existente;
- [x] Não deve ser possível alterar a placa de um carro já cadastrado;
- [x] O carro deve ser cadastrado, por padrão, com disponibilidade;
- [x] O usuário responsável pelo cadastro de carros deve ser um administrador;
- [x] Não é necessário estar autenticado no sistema para listar os carros disponíveis;
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- [x] Não deve ser possível cadastrar especificações iguais para um mesmo carro;
- [x] O usuário responsável pelo cadastro de especificações deve ser um administrador;
- [x] O usuário responsável pelo cadastro das imagens dos carros deve ser um administrador;
- [x] O aluguel de um carro deve ter duração mínima de 24 horas;
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário;
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro;