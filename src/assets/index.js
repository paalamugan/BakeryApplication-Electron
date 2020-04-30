
define(function(require) {
    var app = require("../assets/express/index");

    const port = app.get('port') || 3000;
app.listen(port, () => console.log('server is starter on port 3000'));

});