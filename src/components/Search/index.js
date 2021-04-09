import { DropdownButton, Dropdown, Form, Button } from 'react-bootstrap';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';

const Search = () => {
  return (
    <div>
      <h1>Search</h1>
      <div className={styles.searchSection}>
      <div>
        <Form.Control
          name="title"
          type="text"
          placeholder="Search"
          style={{ width: "70%" }}
        />
      </div>
        <div style={{ display: "flex" }} >
          <DropdownButton id="dropdown-basic-button" variant="dark" title="Status">
            <Dropdown.Item>Done</Dropdown.Item>
            <Dropdown.Item>Active</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" variant="dark" title="Sort" className="ml-3">
            <Dropdown.Item>A-Z</Dropdown.Item>
            <Dropdown.Item>Z-A</Dropdown.Item>
            <Dropdown.Item>Creation Date Oldest</Dropdown.Item>
            <Dropdown.Item>Creation Date Newest</Dropdown.Item>
            <Dropdown.Item>Completion Date Oldest</Dropdown.Item>
            <Dropdown.Item>Completion Date Newest</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className={styles.datePicker}>
          Create lte: <DatePicker
            
            />
        </div>
        <div className={styles.datePicker}>
          Create gte: <DatePicker
            
            />
        </div>
        <div className={styles.datePicker}>
          Complete gte: <DatePicker
            
            />
        </div>
        <div>
          <Button variant="primary mt-3">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Search;