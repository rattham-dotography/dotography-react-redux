'user strict'

import assign from 'object-assign'

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    next(assign({}, payload, {
      type: requestType
    }))

    return callAPI().then(
      response =>
        response.json().then( json => {
          next(assign({}, payload, {
            type: successType,
            body: json,
            receivedAt: Date.now()
          }))
        })
      ).catch(ex => {
        next(assign({}, payload, {
          type: failureType,
          error: ex.message
        }))
      })
  }
}

module.exports = callAPIMiddleware;
