import { connect } from 'react-redux';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';
import dateFormatter from '../../helpers/date';
import actionTypes from '../../redux/actionTypes';
import { sortOrFilterTasksThunk } from '../../redux/actions';
import { firstLetterToUpperCase } from '../../helpers/stringHelpers';
import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';

const Search = (props) => {
  const {
    // functions 
    handleSubmit,
    handleSetDate,
    resetSearchForm,
    changeSearchInput,
    changeDropDownValue,
    ...state
  } = props;

  const {
    search,
    status,
    sort,
    Create_lte,
    Create_gte,
    Complete_lte,
    Complete_gte
  } = state;

  const handleS = () => {
    const queryData = {};
    for (let key in state) {
      if(state[key]) {
        queryData[key] = typeof state[key] === "object" ? dateFormatter(state[key]) : state[key];
      }
    }
    handleSubmit(queryData)
  };

  return (
    <div>
      <h1>Search</h1>
      <div className={styles.searchSection}>
      <div>
        <Form.Control
          name="title"
          type="text"
          value={search}
          placeholder="Search"
          style={{ width: "70%" }}
          onChange={(e) => changeSearchInput(e.target.value)}
        />
      </div>
        <div style={{ display: "flex" }} >
          <DropdownButton
            variant="outline-info"
            title={!!!status ? "Status" : firstLetterToUpperCase(status)}
            id="dropdown-basic-button"
          >
            <Dropdown.Item onClick={(e) => changeDropDownValue("done", "status")}>Done</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("active", "status")}>Active</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("", "status")}>Reset</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" variant="outline-info" title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")} className="ml-3" style={{ width: '200px' }}>
            <Dropdown.Item onClick={(e) => changeDropDownValue("a-z", "sort")}>A-Z</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("z-a", "sort")}>Z-A</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_oldest", "sort")}>Creation Date Oldest</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("creation_date_newest", "sort")}>Creation Date Newest</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_oldest", "sort")}>Completion Date Oldest</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("completion_date_newest", "sort")}>Completion Date Newest</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changeDropDownValue("", "sort")}>Reset</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className={styles.datePicker}>
          Create late: <DatePicker
              selected={Create_lte ? Create_lte : null}
              onChange={date => handleSetDate("Create_lte" ,date)}
            />
        </div>
        <div className={styles.datePicker}>
          Create generate: <DatePicker
              selected={Create_gte}
              onChange={date => handleSetDate("Create_gte", date)}
            />
        </div>
        <div className={styles.datePicker}>
          Complete late: <DatePicker
              selected={Complete_lte}
              onChange={date => handleSetDate("Complete_lte", date)}
            />
        </div>
        <div className={styles.datePicker}>
          Complete generate: <DatePicker
              selected={Complete_gte}
              onChange={date => handleSetDate("Complete_gte", date)}
            />
        </div>
        <div>
          <Button 
            variant="outline-info mt-3"
            onClick={handleS}
          >
            Search
          </Button>
          <Button 
            variant="outline-info mt-3 ml-3"
            onClick={resetSearchForm}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    search,
    status,
    sort,
    Create_lte,
    Create_gte,
    Complete_lte,
    Complete_gte
  } = state.searchState;
  return {
    search,
    status,
    sort,
    Create_lte,
    Create_gte,
    Complete_lte,
    Complete_gte
  };
};

 const mapDispatchToProps = (dispatch) => {
  return {
    changeDropDownValue: (value, dropDownType) => { dispatch({
       type: actionTypes.SET_STATUS,
       dropDownType,
       value 
    }) },
    changeSearchInput: (value) => dispatch({ 
      type: actionTypes.CHANGE_SEARCH_VALUE, 
      value 
    }),
    handleSetDate: (dateType, date) => dispatch({ 
      type: actionTypes.SET_SORT_DATE, 
      dateType, 
      date 
    }),
    handleSubmit: (queryData) => dispatch(sortOrFilterTasksThunk(queryData)),
    resetSearchForm: () => dispatch({ type: actionTypes.RESET_SEARCH_FORM })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);