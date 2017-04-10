////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: this.props.data[0]
    };
  }    
  // state = {
  //   selectedCountry: this.props.data[0]
  // }

// only called when props update
  componentWillReceiveProps = ((nextProps) => {
    console.log(nextProps);
    if (nextProps.data) {
      this.setState({selectedCountry: nextProps.data[0]});
    }
  });

  render() {
    return (
      <div className="Tabs">
        { this.state.selectedCountry && (
          this.props.data.map((c) => {
            return <div className="Tab" key={c.id}
                        onClick={(e) => this.setState({selectedCountry: c})}
                        style={c.name === this.state.selectedCountry.name ? styles.activeTab : styles.tab}>
                      {c.name}
                    </div>
          })
        )
        }
        <div className="TabPanel" style={styles.panel}>
          {this.state.selectedCountry ? this.state.selectedCountry.description : ''}
        </div>

        {/*<div className="Tab" style={styles.activeTab}>
          Active
        </div>
        <div className="Tab" style={styles.tab}>
          Inactive
        </div>
        <div className="TabPanel" style={styles.panel}>
          Panel
        </div>*/}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

ReactDOM.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
