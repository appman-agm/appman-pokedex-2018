import React from 'react'
import styled from 'styled-components/macro'
import CuteImg from './cute.png'

const CardContent = styled.div`
  position: relative;
  width: calc(50% - 48px);
  background-color: #f3f4f7;
  padding: 16px;
  margin: 8px;
  box-shadow: 1px 1px #d5d6dc;

  &:hover {
    box-shadow: 3px 3px 5px #aeaeae;
  }
`

const CardItem = styled.div`
  display: flex;

  h1 {
    margin-top: 0;
    font-family: Gaegu;
  }
`

const CardDetail = styled.div`
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
`

const StatContainer = styled.div`
  display: flex;
  margin-top: 4px;

  span {
    width: 80px;
  }
`

const ProgressBar = styled.div`
  margin-left: 10px;
  border-radius: 25px;
  height: 24px;
  width: 100%;
  background-color: #e4e4e4;
  box-shadow: 1px 1px #d4d4d4;

  &::after {
    content: ' ';
    border-radius: 25px;
    display: block;
    background-color: #f3701a;
    height: 24px;
    width: ${props => `${props.value || 0}%`};
    z-index: 2;
  }
`

const PokemonImg = styled.img`
  height: 250px;
`

const CuteImgStyle = styled.div`
  width: 46px;
  margin: 0 2px;
`

const ActionButton = styled.div`
  position: absolute;
  top: 24px;
  right: 36px;
  font-size: 36px;
  cursor: pointer;
`

function CardItemList({ item = [], width, action, actionProps }) {
  function calcHp(value) {
    const v = Number(value)
    if (isNaN(v)) {
      return 0
    } else {
      if (v > 100) {
        return 100
      } else {
        return v
      }
    }
  }

  function calcStr(convertedRetreatCost) {
    const v = convertedRetreatCost * 50
    if (isNaN(v)) {
      return 0
    } else {
      if (v > 100) {
        return 100
      } else {
        return v
      }
    }
  }

  function calcWeak(weaknesses = []) {
    const sumWeak = weaknesses.reduce((prev, cur) => {
      const v = cur.value
      if (typeof v === 'string') {
        const curNumber = Number(v.replace(/[^0-9]/g, '')) * 100
        return prev + curNumber
      }
      return prev
    }, 0)
    return sumWeak > 100 ? 100 : sumWeak
  }

  function calcDmg(attacks = []) {
    const sumDmg = attacks.reduce((prev, cur) => {
      const v = cur.damage
      if (typeof v === 'string') {
        const curNumber = Number(v.replace(/[^0-9]/g, ''))
        return prev + curNumber
      }
      return prev
    }, 0)

    return sumDmg
  }

  function calcHap(hp = 0, dmg = 0, weak = 0) {
    const hap = (hp / 10 + dmg / 10 + 10 - weak / 100) / 5
    return Math.round(hap)
  }

  return (
    <>
      {item.map(item => {
        const hp = calcHp(item.hp)
        const str = calcStr(item.convertedRetreatCost)
        const dmg = calcDmg(item.attacks)
        const weak = calcWeak(item.weaknesses)
        const hap = calcHap(hp, dmg, weak)

        return (
          <CardContent key={item.id} style={{ width: width ? width : null }}>
            <CardItem>
              <PokemonImg src={item.imageUrl} alt="" />
              <CardDetail>
                <h1>{item.name}</h1>
                <StatContainer>
                  <span>HP</span> <ProgressBar value={hp} />
                </StatContainer>
                <StatContainer>
                  <span>STR</span> <ProgressBar value={str} />
                </StatContainer>
                <StatContainer>
                  <span>WEAK</span> <ProgressBar value={weak} />
                </StatContainer>
                <div style={{ marginTop: '24px' }}>
                  {[...Array(hap).keys()].map(item => {
                    return <CuteImgStyle key={item} src={CuteImg} alt="" />
                  })}
                </div>
              </CardDetail>
            </CardItem>

            <ActionButton style={{ color: actionProps.color }} onClick={() => action(item)}>
              {actionProps.text}
            </ActionButton>
          </CardContent>
        )
      })}
    </>
  )
}

export default CardItemList
