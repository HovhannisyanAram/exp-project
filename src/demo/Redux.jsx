import { connect } from 'react-redux';


const ReduxDemo = (props) => { 
  const {
    counter,
    setValue,
    helloText,
    plusCount, 
    minusCount, 
    resetCount, 
    inputValue,
    resetInputValue
  } = props;
  return (
    <div>
      <h1>Redux Demo Component</h1>
      <div>
        <p>
          {helloText}
        </p>
        <p>
          <div>{counter}</div>
          <button onClick={plusCount}>+</button>
          <button onClick={minusCount}>-</button>
          <button onClick={resetCount}>reset</button>
        </p>
      </div>
      <p>
        <input
          type="text"
          name="text" 
          value={inputValue}
          placeholder="type a text"
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          <button 
            onClick={() => resetInputValue()}
          >
            reset area
          </button>
        </div>
      </p>
      <div>
        Value: {inputValue}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  console.log('mapstate', state)
  return {
    counter: state.counter,
    helloText: state.helloText,
    inputValue: state.inputValue
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    plusCount: () => dispatch({ type: "plusCount" }),
    minusCount: () => dispatch({ type: "minusCount" }),
    resetCount: () => dispatch({ type: "resetCount" }),
    setValue: (inputValue) => dispatch({ type: "setInputValue", inputValue: inputValue }),
    resetInputValue: () => dispatch({ type: "resetInput" }) 
  }
}

const ReduxDemoWithState = connect(mapStateToProps, mapDispatchToProps)(ReduxDemo)

export default ReduxDemoWithState;