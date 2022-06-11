import React from 'react'
import { CCardHeader, CRow } from '@coreui/react'
import PropTypes from 'prop-types'

const PageHeader = ({ heading }) => {
  return (
    <>
      <CCardHeader>
        <CRow xs={{ cols: 12 }} md={{ cols: 12 }} className="text-start">
          <h6 className="m-0">
            <strong>{heading}</strong>
          </h6>
        </CRow>
      </CCardHeader>
    </>
  )
}

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default PageHeader
