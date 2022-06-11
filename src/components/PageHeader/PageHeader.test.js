import React from 'react'
import { shallow } from 'enzyme/build'
import PageHeader from './PageHeader'

it('mounts PageHeader without crashing', () => {
  const wrapper = shallow(<PageHeader />)
  wrapper.unmount()
})
