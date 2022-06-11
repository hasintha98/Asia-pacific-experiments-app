import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,

} from '@coreui/react'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { useHistory, useLocation } from 'react-router-dom'
import { getExperimentByID } from 'src/actions/experiments';
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ViewResponse = () => {
    let history = useHistory()
    let query = useQuery();

    const [questions, setquestions] = useState([])
    const [answers, setanswers] = useState([])



    useEffect(() => {
        console.log(query.get("id"))
        getExperimentByID(query.get("id")).then(msg => {
            setquestions(msg.questions)
            setanswers(msg.answers)
            console.log(answers)
        })

    }, [])

    return (
        <>


            <CCard className="mb-4">
                <PageHeader heading="Experiment Responses" />
                <CCardBody>
                    <form className="m-0 p-0">
                        {questions.map((q, index) => (
                            <>
                                <CRow>
                                    <CCol lg={7}>
                                        <p id="bannerCarousalItems" className="card-title my-2">
                                            <strong>{q.question}</strong>
                                        </p>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg={7}>
                                        <p id="bannerCarousalItems" className="card-title my-2">
                                            {answers[index]}
                                        </p>
                                    </CCol>
                                </CRow>
                            </>
                        ))}
                        <CRow>
                            <CCol className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                <CButton color="danger" className="addNewBtn mt-4 px-100" onClick={() => history.push('/experiments')} >
                                    <h6 className="card-title text-white mx-2 mb-1">Done</h6>
                                </CButton>

                            </CCol>
                        </CRow>
                    </form>
                </CCardBody>

            </CCard>
        </>
    )

}

export default ViewResponse;