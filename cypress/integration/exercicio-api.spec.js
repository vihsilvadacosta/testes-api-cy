/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
          }).then(response => {
               expect(response.body.usuarios[0].nome).to.equal('Vitória Silva')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar usuário com sucesso', () => {
          let emailFaker = faker.internet.email()
          cy.cadastrarUsuario('Fulano da Silva', emailFaker, 'teste').then(response => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario('Fulano da Silva', 'uhahduh', 'teste').then(response => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal('email deve ser um email válido')
          })



     });

     it.only('Deve editar um usuário previamente cadastrado', () => {
          let emailFaker = faker.internet.email()
          cy.cadastrarUsuario('Fulaninho da Silva', emailFaker, 'teste').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         "nome": "Fulano da Silva",
                         "email": emailFaker,
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response =>{
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })

     });

     it('Deve deletar um usuario previamente cadastrado', () => {
          let emailFaker = faker.internet.email()
          cy.cadastrarUsuario('Beltrano da Silva', emailFaker, 'teste').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
               })
          })
     });
});  