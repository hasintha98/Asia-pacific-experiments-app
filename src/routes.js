import React from 'react'

const PropertyCarousal = React.lazy(() => import('./views/experiments-admin/experiments-carousal/ExperimentCarousal'))
const AddExperiment = React.lazy(() => import('./views/experiments-admin/experiments-carousal/AddExperiments'))
const ViewResponse = React.lazy(() => import('./views/experiments-admin/experiments-carousal/ViewResponse'))

const routes = [
  { path: '/', exact: true,  name: 'Home' },
  { path: '/dashboard', name: 'Experiments', component: PropertyCarousal, exact: true },
  { path: '/experiments', name: 'Experiments', component: PropertyCarousal, exact: true },
  {
    path: '/experiments/add-experiment',
    name: 'Add New Experiment',
    component: AddExperiment,
    exact: true,
  },
  {
    path: '/experiments/view-response',
    name: 'View Response',
    component: ViewResponse,
    exact: true,
  },
]

export default routes
