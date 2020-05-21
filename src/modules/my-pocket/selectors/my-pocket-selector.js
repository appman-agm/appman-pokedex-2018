import { createSelector } from 'reselect'   
 import { 
    getCardSelector,
 } from '../../list-pocket/selectors'


 export const getFlagMyPocketSelector = createSelector(
    getCardSelector,
    (flags) => flags.filter( card => card.selectCard === true )
)

