const plecesHTML = require('./piecesHTML.js');

function authorizationPage(){
    return plecesHTML.page1(plecesHTML.body_authorization)
}

function todosPage(){
    return plecesHTML.page1(plecesHTML.body_todos)
}

module.exports = {authorizationPage, todosPage};