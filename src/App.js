import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'
import CardItemList from './CardItem'
import useDebounce from './hooks/useDebounce'
import SearchImg from './search.png'

const BASE_URL = 'http://localhost:3030/api'

const COLORS = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#FFF',
  Fire: '#eb4d4b'
}

const AppContainer = styled.div`
  overflow-y: scroll;
  height: 768px;
`

const Header = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  z-index: 3;
  background-color: ${props => props.theme.Colorless};
`
const Content = styled.div`
  margin-top: 96px;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 78px;
  background-color: #ec5656;
  box-shadow: 1px 1px #d9333387;
  color: #ffffff;
`

const IconAddContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  span {
    font-size: 64px;
    background-color: #ec5656;
    border-radius: 50%;
    padding: 0 35px;
    border-top-style: inset;
    cursor: pointer;
  }
`

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000a3;
  z-index: 4;
`

const ModalContent = styled.div`
  position: absolute;
  margin: 48px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 1px 1px #474444;
`

const SearchContainer = styled.div`
  position: absolute;
  width: 924px;
  z-index: 5;
  display: flex;
`

const InputContainer = styled.div`
  position: relative;
  margin: 8px;
  width: calc(50% - 22px);

  img {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
  }
`

const InputBox = styled.input`
  font-family: Gaegu;
  font-size: 24px;
  width: 100%;
  height: 32px;
  padding-left: 8px;
  border: 2px solid #e6e6e6;
`

function App() {
  const modalRef = useRef(null)
  const [modal, setModal] = useState(false)
  const [list, setList] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [params, setParams] = useState({
    name: '',
    type: ''
  })
  const debouncedSearch = useDebounce(params, 500)

  function addToList(item) {
    setSelectedList([...selectedList, item])
  }

  function removeFromList(item) {
    setSelectedList(selectedList.filter(itemSelected => itemSelected.id !== item.id))
  }

  useEffect(() => {
    const queryString = Object.keys(debouncedSearch)
      .filter(item => debouncedSearch[item])
      .map(key => key + '=' + debouncedSearch[key])
      .join('&')

    const fetchData = async () => {
      try {
        const result = await fetch(`${BASE_URL}/cards?${queryString}`)
        const resultJSON = await result.json()
        console.log(resultJSON)

        setList(resultJSON.cards)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [debouncedSearch])

  useEffect(() => {
    function handleClickOutside(e) {
      if (e.target === modalRef.current) {
        setModal(false)
        setParams({ name: '', type: '' })
      }
    }

    window.addEventListener('mousedown', handleClickOutside, false)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside, false)
    }
  }, [])

  return (
    <ThemeProvider theme={COLORS}>
      <AppContainer>
        <Header>
          <h1>My Pokedex</h1>
        </Header>
        <Content>
          <CardContainer style={{ marginBottom: '120px' }}>
            {/* selected list */}
            <CardItemList item={selectedList} action={removeFromList} actionProps={{ text: 'X' }} />
          </CardContainer>
        </Content>

        <Footer>
          <IconAddContainer>
            <span onClick={() => setModal(true)}>+</span>
          </IconAddContainer>
        </Footer>

        {modal && (
          <ModalBackdrop ref={modalRef}>
            <ModalContent>
              <SearchContainer>
                <InputContainer>
                  <InputBox
                    type="text"
                    placeholder="find pokemon by name"
                    onChange={e => {
                      setParams({
                        ...params,
                        name: e.target.value
                      })
                    }}
                  />
                  <img src={SearchImg} alt="" />
                </InputContainer>
                <InputContainer>
                  <InputBox
                    type="text"
                    placeholder="find pokemon by type"
                    onChange={e => {
                      setParams({
                        ...params,
                        type: e.target.value
                      })
                    }}
                  />
                  <img src={SearchImg} alt="" />
                </InputContainer>
              </SearchContainer>

              <CardContainer style={{ width: '100%', marginTop: '46px', overflowX: 'scroll' }}>
                {/* not selected list */}
                <CardItemList
                  item={list.filter(o => !selectedList.some(v => v.id === o.id))}
                  width="100%"
                  action={addToList}
                  actionProps={{ text: 'Add', color: '#dc7777' }}
                />
              </CardContainer>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AppContainer>
    </ThemeProvider>
  )
}

export default App

//TODO: if I have time more than 3 hours :)
// separate modal to component
// not sure what to do about COLORS constant
// read about how to calculate again, not sure I choose the right property to calculate TT
// write better quality code
// thanks ;)
