import "isomorphic-fetch";

function fetchProjectsRequest() {
  return {
    type: 'FETCH_PROJECTS_REQUEST'
  };
}

function fetchProjectsSuccess(body) {
  return {
    type: 'FETCH_PROJECTS_SUCCESS',
    body
  };
}

function fetchProjectsFailure(ex) {
  return {
    type: 'FETCH_PROJECT_FAILURE',
    ex
  };
}

export function fetchProject() {
  return {
    types: ['FETCH_PROJECTS_REQUEST', 'FETCH_PROJECTS_SUCCESS', 'FETCH_PROJECT_FAILURE'],
    callAPI: () => fetch(`https://dotography.teamwork.com/projects.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic Ymxpbms3NjdzaGlydDp4eHg='
      }
    })
  }
}

// export function fetchProject() {
//   return dispatch => {
//     dispatch(fetchProjectsRequest());
//     return fetch('https://dotography.teamwork.com/projects.json', {
//         headers: {
//           'Authorization': 'Basic Ymxpbms3NjdzaGlydDp4eHg='
//         }
//       })
//       .then(res =>  res.json())
//       .then(json => dispatch(fetchProjectsSuccess(json.body)))
//       .catch(ex => {
//         dispatch(fetchProjectsFailure(ex))
//       })
//   }
// }

