import React from 'react'

const connect = (mapStateToProps) => {


  return (Component) => {
    // return Component // return class
    // <Component {...props}/>
    return class extends React.Component {
       static contextTypes = {
          store: React.PropTypes.object
      }

      // constructor() {
      //   super();
      //   this.store = this.context.store;
      // }

      // junk = this.context.store;

      componentDidMount() {
        this.unscribe = this.context.store.subscribe(() => {
          this.forceUpdate();
        })
        // console.log(this.junk);
        // console.log(this.someProps);
      }

      componentWillUnmount() {
        this.unscribe();
      }

      // someProps = mapStateToProps(this.context.store.getState())
      render() {
        const {store} = this.context;
        const someProps = mapStateToProps(this.context.store.getState());
        console.log(someProps);
        return <Component {...someProps} dispatch={store.dispatch}/>
      }
    }
  }
}

export default connect
