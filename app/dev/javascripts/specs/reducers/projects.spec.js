import expect from 'expect';
import reducer from '../../reducers/projects';

describe('projects Reducer', () => {
  it('should return the initial state', () => {
    const expectedResult = {
      isFetching: false,
      items: []
    }
    expect(reducer(undefined, {})).toEqual(expectedResult);
  })

  it('should handle FETCH_PROJECTS_REQUEST', () => {
    const currentState = {
      isFetching: false,
      items: []
    }

    const action = {
      type: 'FETCH_PROJECTS_REQUEST'
    }

    const expectedResult = {
      isFetching: true,
      items: []
    }

    expect(
      reducer(currentState, action)
    ).toEqual(expectedResult);
  })

  it('should handle FETCH_PROJECTS_SUCCESS', () => {
    const currentState = {
      isFetching: false,
      items: []
    }

    const action = {
      type: 'FETCH_PROJECTS_SUCCESS',
      body: { projects: ['Project A'] },
      receivedAt: 0
    }

    const expectedResult = {
      isFetching: false,
      items: ['Project A'],
      lastUpdated: 0
    }

    expect(
      reducer(currentState, action)
    ).toEqual(expectedResult);
  })

  it('should handle FETCH_PROJECT_FAILURE', () => {
    const currentState = {
      isFetching: true,
      items: []
    }

    const action = {
      type: 'FETCH_PROJECT_FAILURE',
      error: 'Something Wrong!'
    }

    const expectedResult = {
      isFetching: false,
      items: []
    }

    expect(
      reducer(currentState, action)
    ).toEqual(expectedResult);
  })
})
