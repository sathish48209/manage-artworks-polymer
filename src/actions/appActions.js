import {
  store
} from '../store.js';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const DASHBOARD_METRICS_LOADING = 'DASHBOARD_METRICS_LOADING';
export const DASHBOARD_METRICS_SUCCESS = 'DASHBOARD_METRICS_SUCCESS';
export const NAVBAR_METRICS_LOADING = 'NAVBAR_METRICS_LOADING';
export const NAVBAR_METRICS_SUCCESS = 'NAVBAR_METRICS_SUCCESS';
export const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'dashboard' : path.slice(1);

  dispatch(loadPage(page));
}

const loadPage = (page) => (dispatch) => {
  let routes = ['dashboard', 'inbox', 'myProjects', 'allProjects', 'search', 'browse', 'newProject', 'reports'];
  if (!routes.includes(page)) {
    page = 'view404';
  }
  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export function _loadDashboardMetrics() {
  fetch('../../data/dashboardMetricsData.json')
    .then((response) => response.json())
    .then(({
      dashboardMetrics
    }) => {
      store.dispatch({
        type: DASHBOARD_METRICS_SUCCESS,
        payload: dashboardMetrics
      });
    });
}

export function _loadNavbarDetails() {
  fetch('../../data/navbarData.json')
    .then((response) => response.json())
    .then(({
      navbarMetrics
    }) => {
      store.dispatch({
        type: NAVBAR_METRICS_SUCCESS,
        payload: navbarMetrics
      });
    });
}

export function _loadComponentDetails() {
  fetch('../../data/allProjectsData.json')
    .then((response) => response.json())
    .then(({
      allProjects
    }) => {
      store.dispatch({
        type: ALL_PROJECTS_SUCCESS,
        payload: allProjects
      });
    });
}