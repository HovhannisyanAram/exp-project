import React from 'react';

class AddTask extends React.Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value
    })
  };

  render() {
    const { inputValue } = this.state;
    return(
      <div>
        <input
          type="text"
          placeholder="Add text"
          onChange={this.handleChange}
          value={inputValue}
        />
        <button>Add</button>
      </div>
    );
  }

};

export default AddTask;