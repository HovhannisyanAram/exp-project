import actionTypes from '../actionTypes';

const initialState = {
  singleTask: null,
  isEditModal: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SINGLE_TASK: {
      return {
        ...state,
        singleTask: action.data,
        isEditModal: false
      }
    }
    case actionTypes.TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModal: !state.isEditModal
      }

    default: return state;
  }
};

export default  reducer;