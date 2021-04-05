import actionTypes from './actionTypes';

const initialState = {
  todoState: {
    tasks: [],
    loading: false,
    editableTask: null,
    isAllChecked: false,
    isConfirmModal: false,
    removeTasks: new Set(),
    isOpenAddTaskModal: false
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_TASKS: {
      return {
        ...state,
        todoState: {
          ...state.todoState,
          tasks: action.data
        }
      };
    }
    case actionTypes.TOGGLE_LOADING: {
      return {
        ...state,
        todoState: {
          ...state.todoState,
          loading: action.isLoading
        }
      };
    }
    case actionTypes.DELETE_ONE_TASK: {
      let tasks = [...state.todoState.tasks];
      tasks = tasks.filter(item => item._id !== action._id);
      return {
        ...state,
        todoState: {
          ...state.todoState,
          tasks
        }
      };
    };
    case actionTypes.ADD_TASK: {
      let tasks = [...state.todoState.tasks];
      tasks.push(action.data);
      return {
        ...state,
        todoState: {
          ...state.todoState,
          tasks,
          isOpenAddTaskModal: false
        },
      };
    };
    case actionTypes.EDIT_TASK: {
      let tasks = [...state.todoState.tasks];
      const { data } = action;
      const idx = tasks.findIndex(task => task._id === data._id);
      tasks[idx] = data;
      return {
        ...state,
        todoState: {
          ...state.todoState,
          tasks,
          editableTask: null
        },
      };
    };
    case actionTypes.TOGGLE_CHECK_TASK: {
      const { _id } = action;
      let removeTasks = new Set(state.todoState.removeTasks);
      if(removeTasks.has(_id)) {
        removeTasks.delete(_id)
      } else {
        removeTasks.add(_id);
      };
      return {
        ...state,
        todoState: {
          ...state.todoState,
          removeTasks
        },
      };
    };
    case actionTypes.DELETE_CHECKED_TASKS: {
      let tasks = [...state.todoState.tasks];
      const { removeTasks } = state.todoState;
      tasks = tasks.filter(task => !removeTasks.has(task._id))
      return {
        ...state,
        todoState: {
          ...state.todoState,
          tasks,
          removeTasks: new Set(),
          isConfirmModal: false
        },
      }
    };
    case actionTypes.TOGGLE_CHECK_ALL_TASKS: {
      const { tasks, isAllChecked } = state.todoState;
      let removeTasks = new Set();
      if(!isAllChecked) {
        tasks.forEach(task => {
          removeTasks.add(task._id)
        })
      };
      return {
        ...state,
        todoState: {
          ...state.todoState,
          removeTasks,
          isAllChecked: !isAllChecked,
        },
      }
    };
    case actionTypes.TOGGLE_OPEN_ADD_TASK_MODAL: {
      return {
        ...state,
        todoState: {
          ...state.todoState,
          isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
        },
      };
    }
    case actionTypes.TOGGLE_OPEN_CONFIRM_MODAL: {
      return {
        ...state,
        todoState: {
          ...state.todoState,
          isConfirmModal: !state.todoState.isConfirmModal
        },
      };
    }
    case actionTypes.SET_OR_REMOVE_EDITABLE_TASK: {
      return {
        ...state,
        todoState: {
          ...state.todoState,
          editableTask: action.task
        },
      };
    }
    default: return state;
  }
};

export default reducer;