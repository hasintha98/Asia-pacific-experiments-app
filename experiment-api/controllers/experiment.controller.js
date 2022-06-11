const experimentService = require("../services/experiment.service");

const { HTTP403Error, HTTP401Error } = require("../util/HtttpErrors");

const date = require('date-and-time')

const createExperiment = async (req, res, next) => {
  console.log(req.body)
  const { name,
    url,
    questions

  } = req.body;

  try {
    if (!name || !url || !questions) {
      throw new HTTP403Error("Details are required");
    }

    const result = await experimentService.createExperiment({ name, url, questions });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getExperiment = async (req, res, next) => {
  console.log("called")
  try {

    const result = await experimentService.getAllExperiment();
    console.log(result)
    if (!result) {
      throw new HTTP401Error("Unautherized");
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
}

const getRecentExperiment = async (req, res, next) => {
  console.log("called")
  try {
    let result = null;
    await experimentService.getAllExperiment().then(res => {
      result = res.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });


    });

    const finalReuslt = result.slice(0, 5);
    console.log(finalReuslt)




    if (!finalReuslt) {
      throw new HTTP401Error("Unautherized");
    }

    res.json(finalReuslt);

  } catch (error) {
    next(error);
  }
}

const getExperimentByID = async (req, res, next) => {
  console.log("called")
  try {
    const _id = req.params.id
    const result = await experimentService.getExperimentByID(_id);
    console.log(result)
    if (!result) {
      throw new HTTP401Error("Unautherized");
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
}

const getExperimentByURL = async (req, res, next) => {
  console.log("called")
  try {
    const url = req.params.url
    const result = await experimentService.getExperimentByURL(url);
    console.log(result)
    if (!result) {
      throw new HTTP401Error("Unautherized");
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
}

const deleteExperiment = async (req, res, next) => {
  let response = null


  try {
    const { _id
  
    } = req.body;


    const news = await experimentService.deleteExperimentById(_id);
    console.log(news)
    if (!news) {
      throw new HTTP401Error("Unauthorized");
    }


    return res.json({ succeded: false });

  } catch (error) {
    next(error)
  }
}


const acceptExperiment = async (req, res, next) => {
  console.log(req.body)
  const {
    _id,
    answers
  } = req.body;




  try {
    if (!answers || !_id) {
      throw new HTTP403Error("Details are required");
    }


    const result = await experimentService.acceptExperiment({ _id, answers });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const disableExperiment = async (req, res, next) => {
  console.log(req.body)
  const {
    _id,
    status
  } = req.body;




  try {
    if (!_id) {
      throw new HTTP403Error("Details are required");
    }


    const result = await experimentService.disableExperiment({ _id, status });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createExperiment,
  getExperiment,
  getExperimentByID,
  deleteExperiment,
  getRecentExperiment,
  acceptExperiment,
  disableExperiment,
  getExperimentByURL

};
