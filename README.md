# How it works

Inspired in https://github.com/kgrzybek/modular-monolith-with-ddd

## 1. Domain
### 1.1 Description

**Social context**:

The main bussiness entities are `Member`, `Page` and `Poll`.

A `Member` can create a `Page`, be part of a `Page`, follow a `Page` or vote in a `Poll`.

**Accounts context**:

Each `Member` is a `User`

Each `User` have a `UserRole`


-----
Usar classe guard talvez?

Fazer validation na classe controller para todos os controllers terem

Fazer usecase na classe controller para todos os controllers terem

Ver onde fica o dto (input e output de usecases ou na resposta do controller)

Events para adicionar coisas ao feed talvez???

Criar sut factories para todas as entities e aggregate roots, assim como alterar os testes dos mesmos para usar essas sut factories