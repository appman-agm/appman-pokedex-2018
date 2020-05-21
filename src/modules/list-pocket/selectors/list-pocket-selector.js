import { createSelector } from 'reselect'
import { get, size } from 'lodash'

export const cardInfoStore = state =>  get(state, 'listPocket', {})


export const getCardSelector = createSelector(
    cardInfoStore,
    cardInfo => get(cardInfo, 'cardInfo.cards', [])
)
export const getIdCardSelector = createSelector(
    cardInfoStore,
    cardInfo => get(cardInfo, 'ids', [])
)

export const getHpSelector = createSelector(
    getCardSelector,
    cards => {    
       const mapCardInfo = cards.map((card) => {
            if( card.hp > 100) {
            return {...card, hp: 100}
            } else {
                return {...card, hp: 0}
            }
        })
        return mapCardInfo
    }
)

export const getStrSelector = createSelector(
    getHpSelector,
    cards => { 
       const mapCardInfo = cards.map((card) => {
            if( size(card.attacks) === 1 ) {
            return {...card, str: 50}
            } else if( size(card.attacks) === 2 ) {
                return {...card, str: 100}
            } else {
                return {...card, str: 0}
            }
        })
        return mapCardInfo
    }
)

export const getWeakSelector = createSelector(
    getStrSelector,
    cards => { 
       const mapCardInfo = cards.map((card) => {
            if( size(card.weaknesses) === 1 ) {
            return {...card, weak: 100}
            } else {
                return {...card, weak: 0}
            }
        })
        return mapCardInfo
    }
)

export const getDamageSelector = createSelector(
    getWeakSelector,
    cards => {
    const calculateDamage = (attacks =[]) => attacks.reduce((acc, cur) => { 
        const checkDamage =    isNaN(parseInt(cur.damage)) ? 0 : parseInt(cur.damage)
        return acc + checkDamage
    }, 0 )
    const attackDamages = cards.map(card => {
        return {...card , attackDamage: calculateDamage(card.attacks)}
    })
        return attackDamages
        
    } 
)

export const getMapDataIntoCardSelector = createSelector(
    getDamageSelector,
    (cards) => { 
        const mapCardInfo = cards.map((card) => {

            // logic incorrect???
            // const happinessInfo = ((card.hp / 10) + (card.attackDamage /10 ) + 10 - (card.weak)) / 5 
            const happinessInfo = 5
            const arrays = []
                if( happinessInfo )
                 for( let i = 0; i<happinessInfo; i++){
                    arrays.push(i)
            } 
              
            return {...card, happiness: 5, happinessArray:  arrays}
             
         })
         return mapCardInfo
     }
)

export const getFlagSelector = createSelector(
    getMapDataIntoCardSelector,
    (cards) => cards.filter( card => card.selectCard === false )
)



