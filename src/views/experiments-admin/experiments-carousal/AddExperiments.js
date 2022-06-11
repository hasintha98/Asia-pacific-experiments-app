import React, { useState } from 'react'
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormLabel,
    CFormSelect,
    CFormInput,
    CInputGroup,
    CFormTextarea,
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react'
import Alert from 'src/components/alert/Alert'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { cilCheckCircle } from '@coreui/icons';
import { ALERT_TYPE } from 'src/config/const';
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react';
import { createExperiment } from 'src/actions/experiments';


const AddExperiment = () => {

    const [name, setName] = useState('')
    const [submitErrorMsg, setSubmitErrorMsg] = useState(false)
    const [visible, setVisible] = useState(false)


    const [url, setUrl] = useState('')
    const [types, settypes] = useState(['Single-line text', 'Multi-line text', 'List of options'])
    const [selectedTypes, setSelectedTypes] = useState('Single-line text')
    const [questions, setquestions] = useState([
        { type: 's-text', question: 'Name', answers: [] },
        { type: 's-text', question: 'Email', answers: [] },
        { type: 's-text', question: 'Phone', answers: [] }
    ])

    const [answer, setanswer] = useState('')
    const [answers, setanswers] = useState([])

    const [question, setquestion] = useState('')
    const [urlSubmitError, seturlSubmitError] = useState(false)

    let history = useHistory()
    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleURL = (e) => {
        setUrl(e.target.value)
    }

    const onChangeVisableModel = (value) => {
        setVisible(value)
        if (value == false)
            history.push('/experiments')
    }



    const handleTypes = (e) => {
        setSelectedTypes(e.target.value)
    }



    const handleQuestion = (e) => {
        setquestion(e.target.value)
    }

    const handleAnswers = (e) => {
        setanswer(e.target.value)

    }

    const addMulitlineAnswers = () => {
        setanswers([...answers, answer])
        setanswer('')
    }



    const addQuestion = () => {
        setSubmitErrorMsg(false)
        seturlSubmitError(false)
        if (question == '') {
            setSubmitErrorMsg(true)
            return
        }
        if (selectedTypes == 'Single-line text') {
            setquestions([...questions, { type: 's-text', question: question, answers: [] }])
            setquestion('')
        }
        else if (selectedTypes == 'Multi-line text') {
            setquestions([...questions, { type: 'm-text', question: question, answers: [] }])
            setquestion('')
        }
        else if (selectedTypes == 'List of options') {
            if (answers.length <= 0) {
                setSubmitErrorMsg(true)
                return
            }
            setquestions([...questions, { type: 'list', question: question, answers: answers }])
            setquestion('')
            setanswers([])
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitErrorMsg(false)
        seturlSubmitError(false)

        if (name == '') {
            setSubmitErrorMsg(true)
            return
        }

        if (url == '') {
            setSubmitErrorMsg(true)
            return
        }


        const formObject = {
            name: name,
            url: url,
            questions: questions,
        }



        //---------------------------
        console.log(formObject)
        createExperiment(formObject).then(res => {
            console.log(res)
            if (res.succeded) {
                onChangeVisableModel(true)
                console.log(res)
            } else {
                if(res.message == "URL_FOUND") {
                    seturlSubmitError(true)
                }
                
                console.log(res)
            }
        }, (err) => {
            alert(err);
        })





    }
    return (
        <>
            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => onChangeVisableModel(false)}>
                    <CModalTitle>{"Experiments"}</CModalTitle>
                </CModalHeader>
                <CModalBody className='model_body'>
                    <CIcon size="6xl" icon={cilCheckCircle} color="info" className="success_icon" />
                    <h2>{'New Experiment Added Successfully'}</h2>
                    <p>{'New Experiment has been uploaded to the experiment configurations.'}</p>
                </CModalBody>
                <CModalFooter className='model_footer'>
                    <CButton color="danger" className="d-grid gap-2 col-2 mx-auto doneBtn" onClick={() => onChangeVisableModel(false)}>
                        <h6 className='boneBtn_text text-white'>Done</h6>
                    </CButton>
                </CModalFooter>
            </CModal>

            <CCard className="mb-4">
                <PageHeader heading="Experiments" />
                <CCardBody>
                    <form onSubmit={handleSubmit} className="m-0 p-0">
                        <CRow>
                            <CCol lg={7}>
                                <p id="bannerCarousalItems" className="card-title my-2">
                                    <strong>Add New Experiments</strong>
                                </p>
                            </CCol>
                            <CRow className="mt-3">
                                <CCol sm={5}>
                                    <CFormLabel htmlFor="inputState">Experiment Name</CFormLabel>
                                    <CFormInput
                                        id="inputState"
                                        placeholder="Experiment Name"
                                        name="name"
                                        label="name"
                                        onChange={handleName}
                                        value={name}

                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CCol sm={5}>
                                    <CFormLabel htmlFor="inputState">URL extension</CFormLabel>
                                    <CFormInput
                                        id="inputState"
                                        placeholder="Experiment URL"
                                        name="url"
                                        label="url"
                                        onChange={handleURL}
                                        value={url}

                                    />



                                </CCol>

                            </CRow>

                            <CRow className="mt-3">
                                <CCol lg={7}>
                                    <p id="bannerCarousalItems" className="card-title my-2">
                                        <strong>{"Questions"}</strong>
                                    </p>
                                </CCol>
                            </CRow>
                            <CRow >
                                <CTable align="middle" className="mb-0 mt-3 border-0" hover responsive>
                                    <CTableHead color="light">
                                        <CTableRow className="bannerItemsHeader">
                                            <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                                            <CTableHeaderCell className="text-start">Questions</CTableHeaderCell>
                                            <CTableHeaderCell className="text-start">Answer Types</CTableHeaderCell>
                                            <CTableHeaderCell className="text-start">Select Options</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {questions && questions.map((item, index) => (
                                            <CTableRow v-for="item in tableItems" key={index}>
                                                <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                                                <CTableDataCell className="text-start">{item.question}</CTableDataCell>
                                                <CTableDataCell className="text-start">{item.type == 's-text' ? 'Single-line text' : item.type == 'm-text' ? 'Multi-line text' : 'List'}</CTableDataCell>
                                                <CTableDataCell className="text-start">{item.answers.length > 0 ? item.answers.map(item => (<>{item} <span> </span><span> </span></>)) : '-'}</CTableDataCell>

                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                            </CRow>

                            <CRow className="mt-3">
                                <CCol sm={3}>
                                    <CFormLabel htmlFor="inputState">Select Answer Type</CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        id="inputState"
                                        name="locations"
                                        label="locations"
                                        options={types}
                                        onChange={handleTypes}
                                    />



                                </CCol>
                                <CCol sm={5}>
                                    <CFormLabel htmlFor="inputState">Add Custom Question</CFormLabel>
                                    {selectedTypes == 'Single-line text' ? <CFormInput
                                        id="inputState"
                                        placeholder="Custom question"
                                        name="question"
                                        label="question"
                                        onChange={handleQuestion}
                                        value={question}

                                    /> : null}
                                    {selectedTypes == 'Multi-line text' ?
                                        <CFormTextarea
                                            id="inputState"
                                            placeholder="Custom question"
                                            name="question"
                                            label="question"
                                            onChange={handleQuestion}
                                            value={question}

                                        /> : null}
                                    {selectedTypes == 'List of options' ?
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                id="inputState"
                                                placeholder="Custom question"
                                                name="question"
                                                label="question"
                                                onChange={handleQuestion}
                                                value={question}

                                            />

                                        </CInputGroup> : null}
                                        <ol>
                                    {answers && answers.map((answer, index) => (
                                       
                                            <li key={index}>{answer}</li>
                                     

                                    ))}   </ol>
                                    {selectedTypes == 'List of options' ?
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                id="inputState"
                                                placeholder="Set Answers"
                                                name="answer"
                                                label="answer"
                                                onChange={handleAnswers}
                                                value={answer}

                                            />
                                            <CButton type="button" color="secondary" variant="outline" id="button-addon2" onClick={addMulitlineAnswers}>+</CButton>
                                        </CInputGroup> : null}

                                </CCol>
                                <CCol>
                                    <CButton color="danger" className="addNewBtn mt-4 px-100" onClick={addQuestion}>
                                        <h6 className="card-title text-white mx-2 mb-1">Add Question</h6>
                                    </CButton>
                                </CCol>


                            </CRow>


                            <CRow>
                                <CCol className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                    <CButton color="danger" className="addNewBtn mt-4 px-100" type="submit">
                                        <h6 className="card-title text-white mx-2 mb-1">Create</h6>
                                    </CButton>

                                    <CButton color="danger" className=" canceleModalBtn mt-4 px-100" variant="outline" onClick={() => history.push('/experiments')}>
                                        Cancel
                                    </CButton>
                                </CCol>
                            </CRow>


                        </CRow>
                        &nbsp;
                        &nbsp;
                        <CRow>
                            <CCol>
                                {submitErrorMsg && (
                                    <Alert errorMsg={"Please fill all fields"} errorType={ALERT_TYPE.DANGER} />
                                )}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                {urlSubmitError && (
                                    <Alert errorMsg={"URL extension is already found"} errorType={ALERT_TYPE.DANGER} />
                                )}
                            </CCol>
                        </CRow>
                    </form>
                </CCardBody>

            </CCard>
        </>
    )

}

export default AddExperiment;