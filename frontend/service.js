const constructor = require('./htmlConstructor.js');

function getMainHtml(req, res){
    res.send(constructor.todosPage());
}

module.exports = {getMainHtml}