import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCardinfo, addCardAction } from '../actions'
import { 
    getMapDataIntoCardSelector,
 } from '../selectors'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'
import { List } from '../components/List'

class ListPocketContainer extends Component {

componentDidMount () {
    const { props: { loadCardinfo }} = this
    loadCardinfo()
}

handleButtonAdd = () => {
    const { addCard } = this.props
    addCard()
}

render () {
    const {
        props: {
            mapData
        },
        // handleButtonAdd,
    } = this
    
    return (
        <WrapperList>
       { mapData.map((card, key) => (
          <List
            id={ card.id }
            imgCard={ card.imageUrl }
            name={ card.name}
            hp={ card.hp}
            str={ card.str}
            weak={ card.weak}
            happinessArray={ card.happinessArray }
          />
          
        )) }
          </WrapperList>
    )
    
}
}

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadCardinfo: loadCardinfo,
    addCard: addCardAction,
  }, dispatch)
  const mapStateToProps = (state, props) => createStructuredSelector({
    mapData: getMapDataIntoCardSelector,

  })(state, props)

  ListPocketContainer.propTypes = {
    loadCardinfo: PropTypes.func,
    addCard: PropTypes.func,
    mapData: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPocketContainer)

const WrapperList = styled.div`
`
