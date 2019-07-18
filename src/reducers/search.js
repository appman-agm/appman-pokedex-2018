
export default (state='',{type,payload})=>{
  switch(type){
   case 'SET_SEARCH':
      return payload
    default:
      return state
  }
}