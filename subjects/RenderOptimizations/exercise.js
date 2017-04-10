////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    availableHeight: null,
    scrollPosition: null,
    startIndex: null
  }

  handleWindowScroll = () => {
    this.setState({scrollPosition: window.scrollY })
    this.setState({availableHeight: window.screen.availHeight});
    console.log('handleWindowScroll');
    this.forceUpdate();
  }

  componentDidMount() {
    this.handleWindowScroll()
    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const {availableHeight, scrollPosition} = this.state;
    console.log(this.state);
    console.log(`Rows per window = ${availableHeight / rowHeight}`)
    const rowsPerScreen = availableHeight / rowHeight;
    const startIndex = (scrollPosition) / rowHeight;
    console.log(`startIndex = ${startIndex}`)
    const items = []

    let index = startIndex
    while (index < rowsPerScreen) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <ol style={{ height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <RainbowList
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
