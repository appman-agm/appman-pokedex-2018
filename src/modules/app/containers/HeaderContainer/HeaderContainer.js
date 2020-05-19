import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header } from '../../components/Header'

class HeaderContainer extends Component {
render () {
    const { props: { title }} = this
    
    return (
        <div>
            <Header
                title={ title }
            /> 
        </div>
        )
    }
}

export default HeaderContainer

HeaderContainer.propTypes = {
    title: PropTypes.string,
}
