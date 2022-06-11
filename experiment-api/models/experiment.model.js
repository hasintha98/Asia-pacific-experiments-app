const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Experiment = new Schema ({

    name: {
        type: String
    },
    url: {
        type: String
    },

    questions: [{
        type: {
            type: String
        },
        question: {
            type: String
        },
        answers: [String]        
}],

    isResponse: {
        type: Boolean
    },
    isDisable: {
        type: Boolean
    },

    answers: [String],
  
    createdDate: {
        type: Date
    },
    lastUpdatedDate: {
        type: Date
    },

   
    
},
{
 
});

module.exports = mongoose.model('Experiment', Experiment);

