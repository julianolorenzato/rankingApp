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

Events para adicionar coisas ao feed talvez???