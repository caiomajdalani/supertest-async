'use strict'

// import { expect, supertest, addContext } from './dependencies'
const { expect, supertest, addContext } = require('./dependencies')

/**
 * Método para adicionar ao relatório os dados utilizados para a Request e o Response da requisição
 * @param {*} test Parâmetro de referência ao caso de teste específico
 * @param {*} method Método HTTP utilizado (Ex.: get, post, etc)
 * @param {*} url Rota utilizada para a chamada HTTP
 * @param {*} headers Headers adicionais da requisição (Ex.: Authorization, etc)
 * @param {*} body Corpo da requisição, se houver
 * @param {*} httpCode Código HTTP de retorno esperado
 * @param {*} response Corpo da resposta da API
 */
const reporter = function (test, method, url, headers = { "Content-Type": "application/json" }, body, httpCode, res) {
    console.log('res on reporter => ', res)
    return addContext(test, {
        title: 'Request Parameters',
        value: {
            Request: {
                URL: url,
                Method: method,
                Headers: headers,
                Body: body,
            },
            HttpCodeExpect: httpCode,
            Response: {
                Headers: res.headers,
                StatusCode: res.statusCode,
                Body: res.body
            }
        }
    })
}

/**
 * Método para montar e realizar a requisição HTTP
 * @param {*} method Método HTTP a ser utilizado (Ex.: get, post, etc)
 * @param {*} url Rota que a chamada deverá ser realizada
 * @param {*} headers Headers adicionais da requisição (Ex.: Authorization, etc)
 * @param {*} body Corpo da requisição, se houver
 * @param {*} httpCode Código HTTP de retorno esperado
 */

const http = function (method, url, headers = { "Content-Type": "application/json" }, body = {}) {
    return request[method](url)
        .set(headers)
        .send(body)
}

/**
 * Definição de Suítes e Casos de Teste
 * describe - Suíte de Teste
 * it - Caso de Teste
 */

const request = supertest("https://www.google.com")

describe('Test Mocha with Functional NodeJS', () => {
    it(`GET`, async function () {
        let test = this
        const res = await http('get', '/')
        reporter(test, 'get', '/', { "Content-Type": "application/json" }, {}, 200, { headers: res.headers, body: (res.body ? res.body : res.res.text), statusCode: res.statusCode })
        expect(res.statusCode).to.equal(200)
    })
})