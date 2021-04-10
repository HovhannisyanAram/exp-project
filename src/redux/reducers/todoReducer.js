import actionTypes from '../actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  errorMessage: "",
  successMessage: "",
  editableTask: null,
  isAllChecked: false,
  isConfirmModal: false,
  removeTasks: new Set(),
  isOpenAddTaskModal: false
  
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_TASKS: {
      return {
        ...state,
        tasks: action.data,
        // successMessage: "Task was added successfully !"
      };
    }
    case actionTypes.SET_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    }
    case actionTypes.SET_SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: action.successMessage
      };
    }
    case actionTypes.TOGGLE_ACTIVE_TASK: {
      let tasks = [...state.tasks];
      const idx = tasks.findIndex(task => task._id === action.task._id);
      tasks[idx] = action.task;
      return {
        ...state,
        tasks
      };
    }
    case actionTypes.TOGGLE_LOADING: {
      return {
        ...state,
        loading: action.isLoading,
        errorMessage: action.loading ? "" : state.errorMessage,
        successMessage: action.loading ? "" : state.errorMessage
      };
    }
    case actionTypes.DELETE_ONE_TASK: {
      let tasks = [...state.tasks];
      tasks = tasks.filter(item => item._id !== action._id);
      return {
        ...state,
        tasks,
        successMessage: "The task was deleted succesfully !"
      };
    };
    case actionTypes.ADD_TASK: {
      let tasks = [...state.tasks];
      tasks.push(action.data);
      return {
        ...state,
        tasks,
        isOpenAddTaskModal: false,
        successMessage: "The task was added succesfully !"
      };
    };
    case actionTypes.EDIT_TASK: {
      let tasks = [...state.tasks];
      const { data } = action;
      const idx = tasks.findIndex(task => task._id === data._id);
      tasks[idx] = data;
      return {
        ...state,
        tasks,
        editableTask: null,
        successMessage: "The task was changed succesfully !"
      };
    };
    case actionTypes.TOGGLE_CHECK_TASK: {
      const { _id } = action;
      let removeTasks = new Set(state.removeTasks);
      if(removeTasks.has(_id)) {
        removeTasks.delete(_id)
      } else {
        removeTasks.add(_id);
      };
      return {
        ...state,
        removeTasks
      };
    };
    case actionTypes.DELETE_CHECKED_TASKS: {
      let tasks = [...state.tasks];
      const { removeTasks } = state;
      tasks = tasks.filter(task => !removeTasks.has(task._id))
      return {
        ...state,
        tasks,
        removeTasks: new Set(),
        isConfirmModal: false
      }
    };
    case actionTypes.TOGGLE_CHECK_ALL_TASKS: {
      const { tasks, isAllChecked } = state;
      let removeTasks = new Set();
      if(!isAllChecked) {
        tasks.forEach(task => {
          removeTasks.add(task._id)
        })
      };
      return {
        ...state,
        removeTasks,
        isAllChecked: !isAllChecked,
      }
    };
    case actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL: {
      return {
        ...state,
        isOpenAddTaskModal: !state.isOpenAddTaskModal
      };
    }
    case actionTypes.TOGGLE_OPEN_CONFIRM_MODAL: {
      return {
        ...state,
        isConfirmModal: !state.isConfirmModal
      };
    }
    case actionTypes.SET_OR_REMOVE_EDITABLE_TASK: {
      return {
        ...state,
        editableTask: action.task
      };
    }
    default: return state;
  }
};

export default reducer;