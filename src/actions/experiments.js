import axios from "axios";
import { API_URL, MAIN_URL } from "src/config/const";

export const createExperiment = async (data) => {
  console.log(MAIN_URL)
  const URL = API_URL.EXPERIMENT_CREATE;
  try {
    const response = await axios(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllExperiment = () => {
  console.log(MAIN_URL)
  const URL = API_URL.EXPERIMENT_GET_ALL;
  return axios(URL)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};


export const getExperimentByID = (id) => {
  const URL = API_URL.EXPERIMENT_GET_BY_ID;
  return axios(URL + "/" + id)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
  
  export const getExperimentByURL = (url) => {
    const URL = API_URL.EXPERIMENT_GET_BY_URL;
    return axios(URL + "/" + url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };


export const acceptExperiment = (data) => {
 
  const URL = API_URL.EXPERIMENT_ACCEPT;
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const disableExperiment = (data) => {
 
  const URL = API_URL.EXPERIMENT_DISABLE;
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
  
export const deleteExperimentById = async (data) => {
  
  const URL = API_URL.EXPERIMENT_DELETE;
  try {
    const response = await axios(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  };


