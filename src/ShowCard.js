import React from 'react'
import * as R from 'ramda'

const calHP = (value) => parseInt(value, 10) > 100 ? 100 : parseInt(value, 10)

const ShowCard = props => {
    const { COLORS, currentSelect, remove } = props;

  return (
    <div>
    { R.keys(currentSelect).length > 0 && <div id="ModalAddItem2" className={ "modal display-block" } 
      style={{ 
        maxHeight: '569px',
        overflowY: 'auto',
        width: '1023px', 
        height: '569px', 
        border: `1px solid ${COLORS.Colorless}`, 
        backgroundColor: COLORS.Colorless,
        position: 'absolute', 
        zIndex:2, 
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      { R.map((item, i) => {
        return (
            <div id="ModalAddItem2" keys={i+item.id} 
              style={{ 
                width: '47.5%', 
                height: '250px', 
                border: `1px solid ${COLORS.Colorless}`,
                borderRadius: '5px',
                margin: '10px',
                backgroundColor: COLORS.Metal,
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <img src={item.imageUrl} alt={`${item.setCode}`}
                style={{
                  height: '235px',
                  margin: '5px',
                  width: '30%'
                }}>
              </img>
              <table style= {{width:'60%'}}>
                <tr><td><span style={{fontSize: '40px'}}>{item.name}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>HP {calHP(item.hp)}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>STR {item.name}</span></td> </tr>
                <tr><td><span style={{fontSize: '20px'}}>WEAK {item.name}</span></td> </tr>
              </table>
              <h1 
              style={{
                fontSize:'40px',
                textAlign: 'right',
                width: '10%',
                top: '0px',
                right: '8px',
                padding: 0,
                margin: '0 8px'
              }}
              onClick={() => remove(item.id)}>X</h1>

        </div> )
        }, currentSelect)
      }
      <div style={{
        margin: '5px',
        width: '960px',
        height: '90px',
        borderRadius: '10px',
        position: 'static',
        zIndex:1
    }}/>
    </div> }
    </div>
  );
};

export default ShowCard
