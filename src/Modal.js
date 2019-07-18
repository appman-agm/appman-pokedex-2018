import React from 'react'
import * as R from 'ramda'

const calHP = (value) => parseInt(value, 10) > 100 ? 100 : parseInt(value, 10)
const Modal = props => {
    const { handleClose, show, setPokedex, card = [], COLORS, currentSelect, _onChange, valueFilter = '' } = props
    const getListSelected = R.map(list => list.id, currentSelect)
    const listToShow = R.filter( item => !R.contains(item.id, getListSelected), card)
    const filterlistByNameOrType = R.empty(valueFilter) ? listToShow : R.filter(item => R.includes(R.toUpper(valueFilter), R.toUpper(item.name)) || R.includes(R.toUpper(valueFilter), R.toUpper(item.type)), listToShow) 
    document.onclick = function(e){
        if(e.target.id !== 'ModalAddItem'){
        handleClose()
        }
    };

  return (
    <div>
    <div id="ModalAddItem" className={ show ? "modal display-block" : "modal display-none" } 
      style={{ 
        boxShadow: '2px 2px 8px 3px grey',
        maxHeight: '800px',
        overflowY: 'auto',
        width: '984px', 
        height: '728px', 
        border: `1px solid ${COLORS.Colorless}`, 
        backgroundColor: COLORS.Colorless,
        margin: '20px',
        borderRadius: '10px',
        position: 'absolute', 
        zIndex:2
      }}
    >
    <input 
    id="ModalAddItem"
    value={valueFilter}
    onChange={e => _onChange(e)}
    style={{
        margin: '5px',
        width: '960px',
        height: '32px',
        borderRadius: '10px',
        position: 'fixed',
        zIndex:2
    }}
    />
    <div style={{
        margin: '5px',
        width: '960px',
        height: '32px',
        borderRadius: '10px',
        position: 'static',
        zIndex:1
    }}/>
      { filterlistByNameOrType.length > 1 && filterlistByNameOrType.map((item, i) => {
        return (
            <div id="ModalAddItem" keys={i+item.id} 
              style={{ 
                width: '962px', 
                height: '250px', 
                border: `1px solid ${COLORS.Colorless}`,
                borderRadius: '5px',
                margin: '10px',
                backgroundColor: COLORS.Metal,
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <img id="ModalAddItem" src={item.imageUrl} alt={`${item.setCode}`}
                style={{
                  height: '235px',
                  margin: '5px'
                }}>
              </img>
              <table id="ModalAddItem">
                <tr><td><span style={{fontSize: '40px'}}>{item.name}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>HP {calHP(item.hp)}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>STR {item.name}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>WEAK {item.name}</span></td> </tr>
              </table>
              <button id="ModalAddItem" style={{
                right: 0,
                position: 'absolute',
                width: '80px',
                height: '40px',
                zIndex:1
              }}
              onClick={() => setPokedex(item)}>add</button>
        </div> )
        })
      }
    </div>
    </div>
  );
};

export default Modal
