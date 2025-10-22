const fs  = require('fs');
const path = require('path');

function renderHtml(req, res){
    res.send(loadHtml());
}

function loadHtml(){
    const filePath = path.join(process.cwd(), 'frontend', 'todos.html');
    let html = fs.readFileSync(filePath, 'utf8');
    return html;
}


module.exports = {renderHtml}