import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import * as actions from '../../actions/ProjectActions'
import api from '../../middlewares/callAPIMiddleware'
import nock from 'nock'
import MockDate from 'mockdate'

const middlewares = [ thunk, api ]
const mockStore = configureMockStore(middlewares)

describe('Projects Actions', () => {
  /*it('should create FETCH_PROJECTS_REQUEST', () => {
    const expectedAction = {
      type: 'FETCH_PROJECTS_REQUEST'
    };
    expect(actions.fetchProjectsRequest()).toEqual(expectedAction);
  });

  it('should create FETCH_PROJECTS_SUCCESS with body data', () => {
    const expectedAction ={
      type: 'FETCH_PROJECTS_SUCCESS',
      body: [1, 2, 3]
    };
    expect(actions.fetchProjectsSuccess([1, 2, 3])).toEqual(expectedAction);
  });

  it('should create FETCH_PROJECT_FAILURE with exception data', () => {
    const expectedAction ={
      type: 'FETCH_PROJECT_FAILURE',
      ex: { code: 1, message: 'Something Wrong' }
    };
    expect(actions.fetchProjectsFailure({ code: 1, message: 'Something Wrong' })).toEqual(expectedAction);
  });*/

});


describe('Projects Actions Async', () => {

  beforeEach(() =>{
    MockDate.set('1/1/2000')
  })

  afterEach(() => {
    MockDate.reset()
    nock.cleanAll()
  })

  it('should create FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS when fetching projects has been done', (done) => {

    nock('https://dotography.teamwork.com/')
      .get('/projects.json')
      .reply(200, { projects: ["test"] })

    const expectedActions = [
      { type: 'FETCH_PROJECTS_REQUEST' },
      { type: 'FETCH_PROJECTS_SUCCESS', body: { projects: ["test"] }, receivedAt: Date.now() }
    ]

    const store = mockStore({ projects: [] }, expectedActions, done)
    store.dispatch(actions.fetchProject())
  });

  it('should create FETCH_PROJECTS_REQUEST, FETCH_PROJECT_FAILURE when fetching projects has been failed', (done) => {
    nock('https://dotography.teamwork.com/')
      .get('/projects.json')
      .replyWithError(new Error("Something Wrong!"));

    const expectedActions = [
      { type: 'FETCH_PROJECTS_REQUEST' },
      { type: 'FETCH_PROJECT_FAILURE', error: "request to https://dotography.teamwork.com/projects.json failed, reason: Something Wrong!" }
    ]

    const store = mockStore({ projects: [] }, expectedActions, done)
    store.dispatch(actions.fetchProject())
  });

});
