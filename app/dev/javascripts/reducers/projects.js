'user strict';
import assign from 'object-assign'

const initialState = {
  isFetching: false,
  items: []
}

const projects = (
  state = initialState,
  action
) => {

  switch(action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return assign({}, state, {
        isFetching: true
      });

    case 'FETCH_PROJECTS_SUCCESS':
      return assign({}, state, {
        isFetching: false,
        items: action.body.projects,
        lastUpdated: action.receivedAt
      });

    case 'FETCH_PROJECT_FAILURE':
      return assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }

}

module.exports = projects;
