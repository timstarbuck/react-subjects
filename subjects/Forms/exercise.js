////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {
  state = {
    billingName: '',
    billingState: '',
    isSame: false,
    shipName: '',
    shipState: ''
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(`bill name = ${this.state.billingName}`);
    console.log(`bill state = ${this.state.billingState}`);
    console.log(`ship name = ${this.state.isSame ? this.state.billingName : this.state.shipName}`);
    console.log(`ship state = ${this.state.isSame ? this.state.billingState : this.state.shipState}`);
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input type="text" onChange={(e) => this.setState({billingName: e.target.value})}/></label>
            </p>
            <p>
              <label>Billing State: <input type="text" size="2" onChange={(e) => this.setState({billingState: e.target.value.toUpperCase()})}/></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input type="checkbox" onChange={(e) => this.setState({isSame: e.target.checked})}/> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input type="text" onChange={(e) => {
                                                          this.setState({shipName: e.target.value});
                                                          }}
                                                          disabled={this.state.isSame}
                                          value={this.state.isSame ? this.state.billingName : this.state.shipName}/></label>
            </p>
            <p>
              <label>Shipping State: <input type="text" size="2" onChange={(e) => { 
                                                                  if (e.target.value.length > 2) { alert('use abbr'); return;}
                                                                  this.setState({shipState: e.target.value.toUpperCase()})} 
                                                                } 
                                                                disabled={this.state.isSame}
                                      value={this.state.isSame ? this.state.billingState : this.state.shipState}/></label>
            </p>
          </fieldset>

          <p>
            <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
