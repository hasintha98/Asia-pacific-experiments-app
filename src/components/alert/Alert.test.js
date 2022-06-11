import React from 'react'
import { shallow } from 'enzyme/build'
import Alert from './Alert'

it('mounts AddNewBanner without crashing', () => {
  const wrapper = shallow(<Alert />)
  wrapper.unmount()
})
