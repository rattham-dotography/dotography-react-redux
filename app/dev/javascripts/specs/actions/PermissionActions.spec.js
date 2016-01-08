import expect from 'expect';
import * as actions from '../../actions/PermissionActions';

describe('Permission Actions', () => {
  it('should create an action to reqeust a permission list', () => {
    const expectedAction = {
      type: 'REQUEST_PERMISSION'
    };
    expect(actions.requestPermissions()).toEqual(expectedAction);
  });
});
