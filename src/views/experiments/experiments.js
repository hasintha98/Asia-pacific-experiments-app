import React, { useEffect, useState } from 'react'
import '../../scss/experiment.scss'
import { acceptExperiment, getExperimentByURL } from 'src/actions/experiments'
import { useParams } from 'react-router-dom';
import successIcon from '../../assets/images/icons/success-green-check-mark.svg'
import notfoundIcon from '../../assets/images/icons/Icon ionic-ios-close-circle-outline.svg'

const Experiments = (props) => {
    const [answers, setanswers] = useState([])
    const [selectedExperiment, setselectedExperiment] = useState(null)
    const [successMsg, setsuccessMsg] = useState("Form is already submitted!!")
    const { url } = useParams()
    useEffect(() => {
        console.log(url)
        getExperimentByURL(url).then(msg => {
            setselectedExperiment(msg)
            console.log(msg)
        })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formObject = {
            answers: answers,
            _id: selectedExperiment._id,
        }



        //---------------------------
        console.log(formObject)
        acceptExperiment(formObject).then(res => {
            console.log(res)
            if (res.succeded) {
                getExperimentByURL(url).then(msg => {
                    setselectedExperiment(msg)
                    setsuccessMsg('Form is submitted successfully')
                    console.log(msg)
                })
                console.log(res)
            } else {
                alert("Error");
                console.log(res)
            }
        }, (err) => {
            alert(err);
        })


    }

    const handleInput = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[e.target.id] = e.target.value;
        setanswers(updatedAnswers)
        console.log(updatedAnswers)
    }

    return (
        <div className="ex-body">
            <div className='ex-heading'>
                <h1 id='ex-head'>
                    {selectedExperiment && selectedExperiment.name} Experiment Survey Form
                </h1 >
                <h2 id="ex-subheading">Thank you</h2>
            </div>
            <form onSubmit={handleSubmit} id="ex-form">
                <div id='ex-content'>
                    {selectedExperiment && !selectedExperiment.isDisable ?
                        !selectedExperiment.isResponse ?
                            <>
                                {selectedExperiment && selectedExperiment.questions.map((item, index) => (
                                    <>
                                        <label>{item.question}</label>
                                        {item.type == 's-text' ? <input type="text" name={item.question} placeholder="Enter Here" id={index} className="ex-box" onChange={handleInput}></input> : null}
                                        {item.type == 'm-text' ? <textarea type="text" name={item.question} id={index} placeholder="Write anything..." onChange={handleInput} className="ex-box"></textarea> : null}
                                        {item.type == 'list' ?
                                            <div id="option1">
                                                <select id={index} onChange={handleInput}>
                                                    <option name="Select your role"> - Select - </option>
                                                    {item.answers.map((ans, i) => (
                                                        <option key={i} value={ans}>{ans}</option>
                                                    ))}

                                                </select>
                                            </div>

                                            : null}
                                    </>
                                ))}
                            </>
                            :
                            <div className='ex-success-container'>
                                <img className='ex-success-icon' src={successIcon}></img>
                                <h1 id='ex-head'>

                                    {successMsg}
                                </h1 >
                                <h2 id="ex-subheading">Thank you</h2>
                            </div>
                        :
                        <div className='ex-success-container'>
                            <img className='ex-success-icon' src={notfoundIcon}></img>
                            <h1 id='ex-head'>
                                Experiment Form is not found
                            </h1 >
                            <h2 id="ex-subheading">Thank you</h2>
                        </div>
                    }




                    {selectedExperiment && !selectedExperiment.isDisable ? !selectedExperiment.isResponse ? <button className='ex-button'> Submit</button>: null : null}
                </div>
            </form>
        </div>
    )
}

Experiments.propTypes = {}

export default Experiments
