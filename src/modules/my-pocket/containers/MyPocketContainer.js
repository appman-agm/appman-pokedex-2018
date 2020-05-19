import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCardinfo } from '../actions'
import { Alert } from '../../../components/Alert'

class MyPocketContainer extends Component {

componentDidMount () {
    const { props: { loadCardinfo }} = this
    loadCardinfo()
}

render () {
    return (
        <div>
        <div>

            dwdwdw

         </div>
          </div>
    )
    
}
}

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadCardinfo: loadCardinfo,
  }, dispatch)
MyPocketContainer.propTypes = {
    loadCardinfo: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(MyPocketContainer)
