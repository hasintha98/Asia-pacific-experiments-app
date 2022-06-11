import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
 

  {
    component: CNavGroup,
    name: 'Experiments',
    to: '/experiments',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      { 
        component: CNavItem,
        name: 'Experiments',
        to: '/experiments',
      },
      { 
        component: CNavItem,
        name: 'Add New Experiment',
        to: '/experiments/add-experiment',
      },

   
    ],
  },
 

]

export default _nav
