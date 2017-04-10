import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  }

  state = {
    selectedValue: this.props.defaultValue ? this.props.defaultValue : this.props.value,
    showingOptions: false
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if ((nextProps.value !== this.state.selectedValue) && this.props.onChange) {
      this.setState({selectedValue: nextProps.value});
      console.log('set state');
    }
  }

 updateSelected = (option) => {
    console.log(option);
    this.setState({selectedValue: option});
    this.setState({showingOptions: false});
    if (this.props.onChange) {
      this.props.onChange(option);
    }
  }
  render() {
    return (
      <div className="select">
        <div className="label" onClick={() => this.setState({showingOptions: !this.state.showingOptions })}
          >{this.state.selectedValue} <span className="arrow">▾</span></div>
        <div className="options" style={{display: this.state.showingOptions ? 'block' : 'none'}}>
          {
            React.Children.map(this.props.children,  (child, index) =>{
              return React.cloneElement(child, 
              {
                key: index,
                onSelected: this.updateSelected
              });
            })
            
          }
        </div>
      </div>
    )
  }
}


class Option extends React.Component {
  // static propTypes = {
  //   children: React.propTypes.string
  // }
  render() {
    return (
      <div className="option"
            onClick={() => this.props.onSelected(this.props.children)}
      >
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
   this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
