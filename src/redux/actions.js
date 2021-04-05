import actionTypes from './actionTypes';

export const setTasksThunk = () => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true })
  fetch("http://localhost:3001/task")
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      throw data.error;
    };
    dispatch({ type: actionTypes.SET_TASKS, data })
  })
  .catch(error => {
    console.error("get Tasks request error", error);
  })
  .finally(
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
  );
};

export const addTasksThunk = (formData) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true })
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      };
      dispatch({ type: actionTypes.ADD_TASK, data })
    })
    .catch(error => {
      console.log('error', error)
    })
    .finally(() => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
    })
};

export const deleteOneTaskThunk = (_id) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true })
  fetch(`http://localhost:3001/task/` + _id, {
    method: "DELETE",
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      throw data.error;
    }
    dispatch({ type: actionTypes.DELETE_ONE_TASK, _id })
  })
  .catch(error => {
    console.error("Delete task request Error", error);
  })
  .finally(() => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
  })
};

export const editTaskThunk = (editTask) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch('http://localhost:3001/task/' + editTask._id, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error
      };
      dispatch({ type: actionTypes.EDIT_TASK, data })
    })
    .catch(error => {
      console.error("Edit task request error", error);
    })
    .finally(() => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
    })
};

export const removeAnyTaskThunk = (removeTasks) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true })
    fetch("http://localhost:3001/task", {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(removeTasks) }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        throw data.error;
      }
      dispatch({ type: actionTypes.DELETE_CHECKED_TASKS })
    })
    .catch(error => {
      console.error("Delete any task request error", error)
    })
    .finally(() => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
    })
};
