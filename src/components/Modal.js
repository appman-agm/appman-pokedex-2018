import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import search from '../search.png'
import CuteImg from '../cute.png'
import { getPokemon } from '../selectors';
import { addPokedex, CloseModal } from '../actions';
const Overlay = styled.div`
display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
  display: flex;
`

export const Container = styled.div`
  width:100%;
  padding:10px;
  position:relative;
`
export const SearchBox = styled.input`
  width: 100%;
  position: relative;
  height: 50px;
  font-size: 35px;
  padding-left:30px;
`
export const Icon = styled.img`
  width:50px; 
  position:absolute;
  right:10px;
`
export const Wrapper = styled.div`
  position: relative;
  height: auto;
  margin: 40px;
  width: 100%;
  background-color:#ffffff;
  overflow: hidden;
`
const CardContainer = styled(Container)`
  padding:15px;
  height:100%;
  overflow: scroll;
`

const CardWrapper = styled.div`
  width: 100%;
  padding:5px 8px 15px;
  height:220px;
  background-color: #f3f4f7;
  display:flex;
  margin-bottom: 20px;
  .add{
    display:none;
  }
  &:hover {
    box-shadow: 3px 3px 5px #aeaeae;
    .add{
      display:block;
      cursor: pointer;
    }
  }

`
const CardPicture = styled.div`
  height:100%;
  width: 160px;
  img{
    width: 100%;
    height: 100%;
  }
`
const StatContainer = styled.div`
  display: flex;
  margin-top: 4px;
  span {
    width: 80px;
  }
`

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 55%;
  h1 {
    margin-top: 0;
    font-family: Gaegu;
  }
  margin: 0 20px;
`

const ProgressBar = styled.div`
  margin-left: 10px;
  border-radius: 25px;
  height: 24px;
  width: 100%;
  background-color: #e4e4e4;
  box-shadow: 1px 1px #d4d4d4;
  &::after {
    content: '';
    border-radius: 25px;
    display: block;
    background-color: #f3701a;
    height: 24px;
    width: ${props => `${props.value*10 || 0}%`};
    z-index: 2;
  }
`
const CuteImgStyle = styled.img`
  width: 46px;
  margin: 0 2px;
`

const calHp = (v)=>{
  const value = Number(v)
  if(isNaN(v)){return 0 }
  if(value > 100){ return 100}
  return value
}

const calcStr = (v)=> {
  const value = v * 50
  if (isNaN(value)) {
    return 0
  } else {
    if (value > 100) {
      return 100
    } else {
      return value
    }
  }
}
function calcHap(hp = 0, dmg = 0, weak = 0) {
  const hap = (hp / 10 + dmg / 10 + 10 - weak / 100) / 5
  return Math.round(hap)
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

const AddContent = styled.div`
  color:#dc7777;
  justify-self:flex-end;
`
export const CardPokemon = ({name,imageUrl,hp,onAdd,convertedRetreatCost,weaknesses,nationalPokedexNumber})=>{
  const hpValue = calHp(hp)
  const str = calcStr(convertedRetreatCost)
  const weak = calcWeak(weaknesses)
  const happy = calcHap(hpValue,str,weak)
  return (
            <CardWrapper>
              <CardPicture>
                  <img src={imageUrl}></img>
              </CardPicture>
              <DetailWrapper>
                  <h1>{name}</h1>
                  <StatContainer>
                    <span>HP</span> <ProgressBar value={hpValue/10} />
                  </StatContainer>
                  <StatContainer>
                    <span>STR</span> <ProgressBar value={str/10} />
                  </StatContainer>
                  <StatContainer>
                    <span>WEAK</span> <ProgressBar value={weak/10} />
                  </StatContainer>
                  <div style={{marginTop:'10px'}}>
                  {[...Array(happy).keys()].map(item => {
                    return <CuteImgStyle key={item} src={CuteImg} alt="" />
                  })}
                  <CuteImgStyle key={'1'} src={CuteImg} alt="" />
                 </div>
              </DetailWrapper>
             <AddContent onClick={(e)=>console.log(e.target)||onAdd(nationalPokedexNumber)} className="add">ADD</AddContent>
            </CardWrapper>
  )
}

class Modal extends React.Component{

  render(){
    return (
      this.props.isOpen&&
      <Overlay onClick={this.props.closeModal}>
        <Wrapper>
        <Container>
         <SearchBox/>
         <Icon src={search}/>
        </Container>
        <CardContainer>
          {
            this.props.pokemon.map(v=><CardPokemon key={v.id} {...v} onAdd={this.props.onAdd}/>)
          }
        </CardContainer>
        </Wrapper>
      </Overlay>
    )
  }
}
const mapStateToProps = (state)=>({
  pokemon:getPokemon(state),
  isOpen:state.ui.isOpen,
})
const mapDispatchToProps = (dispatch)=>({
  addPokeDex:(value)=>dispatch(addPokedex(value)),
  closeModal:()=>dispatch(CloseModal())
})
const mergeProps = ({pokemon=[],isOpen},{closeModal,addPokeDex},...ownProps)=>({
  ownProps,
  pokemon,
  isOpen,
  closeModal,
  onAdd:(value)=>{
   const pokemonIChoose =  pokemon.find(({nationalPokedexNumber})=>nationalPokedexNumber===value)
   console.log(pokemon,pokemonIChoose)
   addPokeDex(pokemonIChoose)
  }
})
export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(Modal)