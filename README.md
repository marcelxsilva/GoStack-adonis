<h1 align="center">Welcome to GoStack Adonis 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: UNLICENSED" src="https://img.shields.io/badge/License-UNLICENSED-yellow.svg" />
  </a>
  <a href="https://twitter.com/marcelxsilva" target="_blank">
    <img alt="Twitter: marcelxsilva" src="https://img.shields.io/twitter/follow/marcelxsilva.svg?style=social" />
  </a>
</p>

> GoStack Adonis

Adonis é um ORM semelhante ao Sequelize, porém ele nos trás algumas abstraçoes que facilita muito nosso trabalho, por exemplo durante a configuraçao de autenticaçao de usuário ja vem tudo pronto.


Para seguir uma guia de estilo de desenvolvimento estou utilizando o eslint.


Foi utilizado redis para realizar o processo de filas no envio dos emails rodando no docker

Criando Docker

      docker run --name redis -p 6379:6379 -d redis:alpine 

### Comandos
Validator possibilita validar os valores de entrada em uma requisição, como p ex: ao criar um usuário o nome e email deve ser obrigatórios.

      # adonis make:validator < nome do validator >

Hooks pode ser executado em dado momento durante a execução de um controller, podendo ser antes, depois e etc, comando para criar um hook:

      # adonis make:hook < nome do hook >

Para colocar o Redis para ouvir as filas:

      # adonis kue:listen

## Author

👤 **Marcelo Silva**

* Twitter: [@marcelxsilva](https://twitter.com/marcelxsilva)

## Show your support

Give a ⭐️ if this project helped you!
