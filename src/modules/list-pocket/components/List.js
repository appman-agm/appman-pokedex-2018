import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProgressBar from 'react-bootstrap/ProgressBar'

export const List = ({id,imgCard, name, hp, str, weak, happiness, happinessArray}) => (
    <Fragment>
        <Wrapper>
            <WrapperImg>
                <img alt='notfound' src= {imgCard}/>
            </WrapperImg>
            <WrapperContent>
                <WrapperName>
                <span >{ name } </span>
                </WrapperName>
                <WrapperHp>
                    <WrapperTitle>
                        <span>
                            HP
                        </span>
                    </WrapperTitle>
                    <WrapperProcessBar>
                    <ProgressBar now={hp} max={100} min={0} />
                    </WrapperProcessBar>
                </WrapperHp>    
                <WrapperStr>
                    <WrapperTitle>
                        <span>
                            Str
                        </span>
                    </WrapperTitle>
                    <WrapperProcessBar>
                    <ProgressBar now={str} max={100} min={0} />
                    </WrapperProcessBar>
                </WrapperStr>  
                <WrapperWeak>
                    <WrapperTitle>
                        <span>
                            Weak
                        </span>
                    </WrapperTitle>
                    <WrapperProcessBar>
                    <ProgressBar now={weak} max={100} min={0} />
                    </WrapperProcessBar>
                </WrapperWeak>     
                <WrapperHappiness>
                    {
                        happinessArray.map(value => {
                            //img not found ผมเลยใช้ รูป card มาแทนก่อนครับ
                       return  <img alt='notfound' src={imgCard}/> 
                        })
                    }
                </WrapperHappiness>        
            </WrapperContent>
            <WrapperButtonAdd>
                <div>
                    Add
                </div>
            </WrapperButtonAdd>

        </Wrapper>
    </Fragment>
)

List.propTypes = {
    imgCard: PropTypes.string,
    name: PropTypes.string,
    str: PropTypes.number,
    hp: PropTypes.number,
    weak: PropTypes.number,
    happinessArray: PropTypes.array,
    handleButtonAdd: PropTypes.func,
    id: PropTypes.string,
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 1px 1px 1px 1px #d5d6dc;
  padding: 10px 10px 10px 10px;

  margin-bottom: 20px;
  background: #f3f4f7;
  :hover {
    cursor: pointer;
    box-shadow: 1px 1px 1px 1px #aeaeae;
    border: 1px solid #d5d6dc;
  }
`

const WrapperImg = styled.div`
width: 20%;
    img {
        width: 150px;
    }
`

const WrapperContent = styled.div`
width: 65%;
margin-left: 20px;
`
const WrapperButtonAdd = styled.div`
    width: 10%;
    text-align: center;
    font-size: 25px;
    color: #dc7777;
    /* ปกติ ใช้ท่านี้ได้ ติดปัญหาครับ ทำ show button hover */
    /* display: none;
        :hover {
            display: block;
        } */
`

const WrapperName = styled.div`
 span {
    font-size: 30px;
 }
`

const WrapperHp = styled.div`
display: flex;
width: 100%;
margin-right: 20px;
 span {
    font-size: 18px;
 }
`
const WrapperHappiness = styled.div`
    margin-top: 20px;
    img{
        width: 40px;
        height: 60px;
        padding-right: 5px;
    }
`
const WrapperStr = styled.div`
display: flex;
width: 100%;
margin-right: 20px;
 span {
    font-size: 18px;
 }
`
const WrapperWeak = styled.div`
display: flex;
width: 100%;
margin-right: 20px;
 span {
    font-size: 18px;
 }
`
const WrapperTitle = styled.div`
width: 20%;
`
const WrapperProcessBar = styled.div`
    width: 50%;
    .progress {
        height: 20px;
    }
    .progress-bar{
        background-color: #f3701a;
    }
`