import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCardinfo, addCardAction } from '../actions'
import { size } from 'lodash'
import { 
  getMapDataIntoCardSelector,
  getFlagSelector,
  getCardSelector,
 } from '../selectors'
import { createStructuredSelector } from 'reselect'
import { List } from '../components/List'

class ListPocketContainer extends Component {

componentDidMount () {
    const { props: { loadCardinfo, cardInfo }} = this
    console.log('size(cardInfo)', size(cardInfo))
    
    if(size(cardInfo) === 0) {
      loadCardinfo()
    }
}

handleButtonAdd = (id) => {
    const { addCard, cardMapdata } = this.props
    
    addCard(id, cardMapdata)
}

render () {
    const {
        props: {
          mapData,
        },
        handleButtonAdd,
    } = this
    return (
        <Fragment>
       { mapData.map((card, key) => (
          <List
            id={ card.id }
            imgCard={ card.imageUrl }
            name={ card.name}
            hp={ card.hp}
            str={ card.str}
            weak={ card.weak}
            happinessArray={ card.happinessArray }
            handleButtonAdd={handleButtonAdd}
          />
        )) }
          </Fragment>
    )
    
  }
}

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadCardinfo: loadCardinfo,
    addCard: addCardAction,
  }, dispatch)
  const mapStateToProps = (state, props) => createStructuredSelector({
    mapData: getFlagSelector,
    cardMapdata: getMapDataIntoCardSelector,
    cardInfo: getCardSelector
  })(state, props)

  ListPocketContainer.propTypes = {
    loadCardinfo: PropTypes.func,
    addCard: PropTypes.func,
    mapData: PropTypes.array,
    cardMapdata: PropTypes.array,
    cardInfo: PropTypes.object,
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListPocketContainer)
