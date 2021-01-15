import {
  UPDATE_PAGE,
  DASHBOARD_METRICS_SUCCESS,
  DASHBOARD_METRICS_LOADING
} from '../actions/appActions.js';

const initialState = {
  page: '',
  dashboardMetrics: [],
  navbarMetrics: [],
  allProjects: []
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PAGE':
      return {
        ...state,
        page: action.page
      };
    case 'DASHBOARD_METRICS_SUCCESS':
      return {
        ...state,
        dashboardMetrics: action.payload
      }
    case 'NAVBAR_METRICS_SUCCESS':
      return {
        ...state,
        navbarMetrics: action.payload
      }
    case 'ALL_PROJECTS_SUCCESS':
      return {
        ...state,
        allProjects: action.payload
      }
    default:
      return state;
  }
}