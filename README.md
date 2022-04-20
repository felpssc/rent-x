## Requisitos funcionais
[X] - Deve ser possível cadastrar um carro;
[X] - Deve ser possível listar os carros disponíveis;
[X] - Deve ser possível cadastrar uma especificação para um carro;
[X] - Deve ser possível listar todas as especificações;
[X] - Deve ser possível listar todos os carros;
[X] - Deve ser possível listar todos os carros disponíveis por categoria;
[X] - Deve ser possível listar todos os carros disponíveis pela marca;
[X] - Deve ser possível listar todos os carros disponíveis pelo nome;
[X] - Deve ser possível cadastrar as imagens dos carros;
[X] - Deve ser possível cadastrar um aluguel;
## Requisitos não funcionais
[X] - Utilizar o multer para upload dos arquivos;
## Regras de negócio
[X] - Não deve ser possível cadastrar um carro com uma placa já existente;
[X] - Não deve ser possível alterar a placa de um carro já cadastrado;
[X] - O carro deve ser cadastrado, por padrão, com disponibilidade;
[X] - O usuário responsável pelo cadastro de carros deve ser um administrador;
[X] - Não é necessário estar autenticado no sistema para listar os carros disponíveis;
[X] - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
[X] - Não deve ser possível cadastrar especificações iguais para um mesmo carro;
[X] - O usuário responsável pelo cadastro de especificações deve ser um administrador;
[X] - O usuário responsável pelo cadastro das imagens dos carros deve ser um administrador;
[X] - O aluguel de um carro deve ter duração mínima de 24 horas;
[X] - Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário;
[X] - Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro;