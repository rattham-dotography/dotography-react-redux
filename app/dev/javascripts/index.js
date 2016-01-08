'user strict';

import configureStore from './stores/configureStore'
import * as actions from './actions/ProjectActions'

const store = configureStore()

store.dispatch(actions.fetchProject()).then(() => {

})
