const Experiment = require("../models/experiment.model");
const date = require('date-and-time')


const createExperiment = async (experimentDTO) => {

    const experiment = await Experiment.findOne({ url: experimentDTO.url });
    if (experiment) {
        return { succeded: false, addedEntry: null, message: 'URL_FOUND' };
    }

    //adding catalogue
    const newExperiment = new Experiment();

    newExperiment.name = experimentDTO.name;
    newExperiment.url = experimentDTO.url;
    newExperiment.questions = experimentDTO.questions;
    newExperiment.isResponse = false;
    newExperiment.isDisable = false;
    newExperiment.answers = [];
    newExperiment.createdDate = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
    const addedRecord = await newExperiment.save();

    if (!addedRecord) {
        return { succeded: false, addedEntry: null, message: 'ERROR' };
    }

    return { succeded: true, addedEntry: addedRecord, message: 'SUCCESS' };
}

const getAllExperiment = async () => {
    const experiments = await Experiment.find();

    console.log(experiments)

    if (!experiments) {
        return null;
    }

    return experiments;
};

const getExperimentByID = async (_id) => {
    const experiment = await Experiment.findOne({ _id: _id });

    console.log(experiment)

    if (!experiment) {
        return null;
    }

    return experiment;
};

const getExperimentByURL = async (url) => {
    const experiment = await Experiment.findOne({ url: url });

    console.log(experiment)

    if (!experiment) {
        return null;
    }

    return experiment;
};



const deleteExperimentById = async (_id) => {
    const experiment = await Experiment.findOne({ _id });



    if (!experiment) {
        return false;
    }

    await experiment.remove();
    return experiment;
};



const acceptExperiment = async (experimentDTO) => {

    const experiment = await Experiment.findOne({ _id: experimentDTO._id });
    experiment.isResponse = true;
    experiment.answers = experimentDTO.answers;
    experiment.lastUpdatedDate = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
    const addedRecord = await experiment.save();

    if (!addedRecord) {
        return { succeded: false, addedEntry: null };
    }

    return { succeded: true, addedEntry: addedRecord };
}

const disableExperiment = async (experimentDTO) => {

    const experiment = await Experiment.findOne({ _id: experimentDTO._id });
    experiment.isDisable = experimentDTO.status;
    const addedRecord = await experiment.save();

    if (!addedRecord) {
        return { succeded: false, addedEntry: null };
    }

    return { succeded: true, addedEntry: addedRecord };
}

module.exports = {
    createExperiment,
    getAllExperiment,
    getExperimentByID,
    deleteExperimentById,
    acceptExperiment,
    disableExperiment,
    getExperimentByURL

};