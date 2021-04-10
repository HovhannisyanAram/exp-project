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
    dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
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
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
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
    dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
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
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
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
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
    })
};

export const toggleActiveStatusThunk = (task) => (dispatch) => {
  const status = task.status === "active" ? "done" : "active";
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
  fetch(`http://localhost:3001/task/${task._id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) throw data.error;
    dispatch({ type: actionTypes.TOGGLE_ACTIVE_TASK, task: data  })
  })
  .catch(error => {
    dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
  })
  .finally(() => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
  })
};

export const sortOrFilterTasksThunk = (queryData) => (dispatch) => {
  let query = "?";
  for (let key in queryData) {
    query += key + "=" + queryData[key] + "&";
  }
  dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
  fetch(`http://localhost:3001/task` + query.slice(0, query.length - 1))
  .then(res => res.json())
  .then(data => {
    if(data.error) throw data.error;
    dispatch({ type: actionTypes.SET_TASKS, data })
  })
  .catch(error => {
    dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
  })
  .finally(() => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false })
  })
}
