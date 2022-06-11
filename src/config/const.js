/* eslint-disable prettier/prettier */
import 'dotenv/config';

export const ALERT_TYPE = {
  DANGER: 'danger',
}







export const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put'
}

// export const MAIN_URL = "http://178.128.53.188:3000"
export const MAIN_URL = process.env.REACT_APP_API_URL

export const API_URL = {


  EXPERIMENT_CREATE: MAIN_URL + '/asia-pacific/experiment/create',
  EXPERIMENT_GET_ALL: MAIN_URL + '/asia-pacific/experiment/getall',
  EXPERIMENT_GET_BY_URL: MAIN_URL + '/asia-pacific/experiment/geturl',
  EXPERIMENT_GET_BY_ID: MAIN_URL + '/asia-pacific/experiment/get',
  EXPERIMENT_UPDATE: MAIN_URL + '/asia-pacific/experiment/update',
  EXPERIMENT_ACCEPT: MAIN_URL + '/asia-pacific/experiment/accept',
  EXPERIMENT_DISABLE: MAIN_URL + '/asia-pacific/experiment/disable',
  EXPERIMENT_DELETE: MAIN_URL + '/asia-pacific/experiment/delete',


}