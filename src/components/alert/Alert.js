import React from 'react'
import { CAlert } from '@coreui/react'
import PropTypes from 'prop-types'

const Alert = ({ errorMsg, errorType }) => {
  return (
    <>
      <CAlert color={errorType} className="mb-0 text-center p-1">
        {errorMsg}
      </CAlert>
    </>
  )
}

Alert.propTypes = {
  errorType: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
}

export default Alert
