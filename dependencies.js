/**
 * Configurações de variáveis e dependências de projeto
 */

// SuperTest é o framework que iremos utilizar para fazer as requisições HTTP dos scripts automatizados, ou seja, 
// é ele quem "simula" o comportamento do POSTMAN, por exemplo, no entanto de forma automatizada.
const supertest = require('supertest')
    , expect = require("chai").expect
    , addContext = require('mochawesome/addContext')

module.exports = {
    expect: expect,
    supertest: supertest,
    addContext: addContext
} 
