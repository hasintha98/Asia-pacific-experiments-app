import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle } from '@coreui/icons'
import PropTypes from 'prop-types'

const SuccessModal = ({visible, setVisible, heading, mainText, subText}) => {
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle className="deleteBannerHeading">{heading}</CModalTitle>
        </CModalHeader >
        <CModalBody className="text-center">
        <CIcon size="4xl" icon={cilCheckCircle} className="successIcon my-3" />
        <h5 className='successText'>{mainText}</h5>
        {subText}
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton className="doneModalBtn text-white" color="danger" onClick={() => setVisible(false)}>
           <strong>Done</strong> 
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

SuccessModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  mainText: PropTypes.bool.isRequired,
  subText: PropTypes.bool.isRequired,
}

export default SuccessModal
