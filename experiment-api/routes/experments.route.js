
const { Router } = require("express");
const experimentContorller = require("../controllers/experiment.controller");

// init express router
const experimentRoute = Router();

experimentRoute.use('/experiment', experimentRoute);
experimentRoute.post("/create", experimentContorller.createExperiment);
experimentRoute.post("/accept", experimentContorller.acceptExperiment);
experimentRoute.post("/disable", experimentContorller.disableExperiment);
experimentRoute.get("/getall", experimentContorller.getExperiment);
experimentRoute.get("/get/:id", experimentContorller.getExperimentByID);
experimentRoute.get("/geturl/:url", experimentContorller.getExperimentByURL);
experimentRoute.post("/delete", experimentContorller.deleteExperiment);
module.exports = experimentRoute;
  
