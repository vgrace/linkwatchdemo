(function (controllers) {
    //Initialize all controllers needed for the application here in order to keep server.js clean
    //All routing is controlled here
    var homeController = require("./homeController");
    //var notesContoller = require("./notesController");

    controllers.init = function (app) {
        homeController.init(app);
        //notesContoller.init(app);
    };
})(module.exports);