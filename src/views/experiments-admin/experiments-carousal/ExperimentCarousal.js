import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip

} from '@coreui/react'
import PageHeader from 'src/components/PageHeader/PageHeader'
import { useHistory } from 'react-router-dom'
import { deleteExperimentById, disableExperiment, getAllExperiment } from 'src/actions/experiments'
import iconView from '../../../assets/images/icons/eye.svg'
import iconDisable from '../../../assets/images/icons/disable.svg'
import iconDelete from '../../../assets/images/icons/trash.svg'
import iconEnable from '../../../assets/images/icons/publish.png'
import responseIcon from '../../../assets/images/icons/edit.svg'
import { format } from "date-fns";

const ExperimentCarousal = () => {
  let history = useHistory()
  const [allExperiments, setallExperiments] = useState([])
  
  const onAddNewBtn = () => {
    history.push('/experiments/add-experiment')
  }
  useEffect(() => {    
    getAllExperiment().then(msg => {
      setallExperiments(msg)
      console.log(msg)
   
    })
  
  }, [])

  const disableExperiments = (id, status) => {
    const formObject = {
      _id: id,
      status: status
    }

    console.log(formObject)
    disableExperiment(formObject).then(msg => {
      getAllExperiment().then(msg => {
        setallExperiments(msg)
     
      })
    })
  }

  const deleteExperiments = (id) => {
    const formObject = {
      _id: id
    }
    deleteExperimentById(formObject).then(msg => {
      getAllExperiment().then(msg => {
        setallExperiments(msg)
     
      })
    })
  }

  
  const formatDates = (date) => {

    return format(new Date(date), "yyyy-MM-dd hh:mm aaaaa'm'");
  }

  


    return (
      <>
      <CCard className="mb-4">
      <PageHeader heading="Experiments" />     
        <CCardBody>
          <CRow className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <CCol sm={5}>
              <p id="bannerCarousalItems" className="card-title my-2">
                <strong>Experiment Carousal Items</strong>
              </p> 
            </CCol>
          <CCol className="d-grid gap-2 d-md-block">
              <CButton color="danger" className=" addNewBtn float-end" onClick={onAddNewBtn}>
                <h6 className="card-title m-0 text-white mx-2 my-1">Add New</h6>
              </CButton>
            </CCol>
          </CRow>
      
          <br />
          <CRow>
          <CTable align="middle" className="mb-0 mt-3 border-0" hover responsive>
            <CTableHead color="light">
              <CTableRow className="bannerItemsHeader">
                <CTableHeaderCell className="text-center">#</CTableHeaderCell>

                <CTableHeaderCell className="text-start">Name</CTableHeaderCell>
                <CTableHeaderCell className="text-start">URL extension</CTableHeaderCell>
                <CTableHeaderCell className="text-start">Status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Created date</CTableHeaderCell>
                <CTableHeaderCell width={150} className="text-center">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {allExperiments && allExperiments.map((item, index) => (
                <>
                <CTableRow v-for="item in tableItems" key={index} >
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-start">{item.name}</CTableDataCell>
                  <CTableDataCell className="text-start">{item.url}</CTableDataCell>
                  <CTableDataCell className="text-start">{item.isDisable ? 
                  <><span className="dot-red"></span> &nbsp; Disable</>: 
                  item.isResponse ? <><span className="dot-green"></span> &nbsp; Submitted</> :
                  <><span className="dot-red"></span> &nbsp; No Response</>
                  }</CTableDataCell>
                  <CTableDataCell className="text-center">{formatDates(item.createdDate)}</CTableDataCell>
                 
                  <CTableDataCell className="text-end p-0">
                    <CRow className="m-0 p-0 justify-content-center">
                    {item.isResponse ? <CCol sm={2} className="p-0">
                        <CTooltip
                          content="View response"
                          placement="top"
                        >
                          <img src={responseIcon} alt="logo" className='experiment-icons'
                            onClick={() => history.push('/experiments/view-response?id='+item._id)}
                          />

                        </CTooltip>
                      </CCol> : null }
                      <CCol sm={2} className="p-0">
                        <CTooltip
                          content="Client Form"
                          placement="top"
                        >
                          <img src={iconView} alt="logo" className='experiment-icons'
                            onClick={() => history.push('/client/'+item.url)}
                          />

                        </CTooltip>
                      </CCol>
                      {!item.isDisable ? <CCol sm={2} className="p-0">
                        <CTooltip
                          content="Disable"
                          placement="top"
                        >
                          <img src={iconDisable} alt="logo" className='experiment-icons'
                            onClick={() => disableExperiments(item._id, true)}
                          />

                        </CTooltip>
                      </CCol> :
                      <CCol sm={2} className="p-0">
                        <CTooltip
                          content="Enable"
                          placement="top"
                        >
                          <img src={iconEnable} alt="logo" className='experiment-icons'
                            onClick={() => disableExperiments(item._id, false)}
                          />

                        </CTooltip>
                      </CCol>}
                      <CCol sm={2} className="p-0">
                        <CTooltip
                          content="Delete"
                          placement="top"
                        >
                          <img src={iconDelete} alt="logo" className='experiment-icons'
                            onClick={() => deleteExperiments(item._id)}
                          />

                        </CTooltip>
                      </CCol>

                 

               
                

                    </CRow>
                  </CTableDataCell>

                </CTableRow>
               
                {/* {item.questions && item.questions.map((question,i) => (
                    <CTableRow v-for="item in tableItems" key={i} col>
                        
                <CTableDataCell className="text-center"></CTableDataCell>
                <CTableDataCell className="text-start" colSpan="3">{question.question}</CTableDataCell>
                <CTableDataCell className="text-end" colSpan="2">{question.type}</CTableDataCell>
                </CTableRow>
                ))} */}
                
                </>
                
              ))}
            </CTableBody>
          </CTable>
        </CRow>



      </CCardBody>
    </CCard>

      </>
    )
  
}

export default ExperimentCarousal;
