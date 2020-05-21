import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCardinfo } from '../actions'
import { deleteCardAction } from '../../list-pocket/actions'
import styled from 'styled-components'

 import { getFlagMyPocketSelector } from '../selectors'
import { createStructuredSelector } from 'reselect'
import { getMapDataIntoCardSelector } from '../../list-pocket/selectors'
import { ListMyPocket } from '../components/ListMyPocket'

class MyPocketContainer extends Component {


handleButtonDelete = (id) => {
    const { deleteCard, cardMapdata } = this.props
    deleteCard(id, cardMapdata)
}

render () {
    const {
        props: {
            deleteMyPocket,
        },
        handleButtonDelete,
    } = this
    return (
        <Wrapper>
       { deleteMyPocket.map((card, key) => (
          <ListMyPocket
            id={ card.id }
            imgCard={ card.imageUrl }
            name={ card.name}
            hp={ card.hp}
            str={ card.str}
            weak={ card.weak}
            happinessArray={ card.happinessArray }
            handleButtonDelete={handleButtonDelete}
          />
          
        )) }
          </Wrapper>
    )
    
}
}

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadCardinfo: loadCardinfo,
    deleteCard: deleteCardAction,
  }, dispatch)
  const mapStateToProps = (state, props) => createStructuredSelector({
    deleteMyPocket: getFlagMyPocketSelector,
    cardMapdata: getMapDataIntoCardSelector
  })(state, props)

  MyPocketContainer.propTypes = {
    loadCardinfo: PropTypes.func,
    addCard: PropTypes.func,
    cardInfo: PropTypes.array,
    deleteCard: PropTypes.func,
    cardMapdata: PropTypes.array,
}


export default connect(mapStateToProps, mapDispatchToProps)(MyPocketContainer)

const Wrapper = styled.div`
    /* ปกติต้องใช้ max-height: 100% */
    max-height: 545px;
    overflow: auto;
`