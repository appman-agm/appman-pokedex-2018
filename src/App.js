import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import AppContainer from './modules/app/containers/AppContainer/AppContainer'
import { Alert } from './components/Alert'


class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isShowModalCardList: false
    }
  }

  handleCloseModal = () => {
    console.log('ss')
    this.setState({ isShowModalCardList : false})
  }

  handleOpenModal = () => {
    console.log('22')
    this.setState({ isShowModalCardList : true})
  }

  render() {
    const { 
      state: { 
        isShowModalCardList 
      },
      handleCloseModal,
      handleOpenModal 
    } = this
console.log('Footer', isShowModalCardList)

    return (
      <Provider store={store}>
      <div className="App">
        <AppContainer handleOpenModal={handleOpenModal}/>
        { isShowModalCardList &&
     <Alert onClose={ handleCloseModal }>
        <WrapperTop>
          <WrapperSearch>
          <input type="text" placeholder="Find Pokemon" />
          </WrapperSearch>
          <WrapperButtonClose onClick={ handleCloseModal }>
            x
          </WrapperButtonClose>
        </WrapperTop>
        11111
      </Alert>
}
      </div>
      </Provider>
    )
  }
}

export default App

const WrapperTop = styled.div`
  width: 100%;
  display: flex;
`

const WrapperSearch = styled.div`
  width: 98%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  input {
    padding: 0px 5px;
    font-size: 14px;
    margin-top: 0px;
    height: 35px;
    width: 50%;
    font-family: 'Atma', cursive;
  }
`
const WrapperButtonClose = styled.div`
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
  line-height: 1;
  width: 2%;
  :hover {
    cursor: pointer;
  }
`

