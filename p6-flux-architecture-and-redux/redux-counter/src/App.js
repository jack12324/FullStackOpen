import {createStore} from "redux";

function App() {

 const counterReducer = (state = 0, action) => {
   switch (action.type) {
     case 'INCREMENT':
       return state + 1
     case 'DECREMENT':
       return state - 1
     case 'ZERO':
       return 0
     default:
       return state
   }
 }

 const store = createStore(counterReducer)

  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

  store.dispatch({type: 'INCREMENT'})
  store.dispatch({type: 'INCREMENT'})
  store.dispatch({type: 'INCREMENT'})
  store.dispatch({type: 'ZERO'})
  store.dispatch({type: 'DECREMENT'})


  return (
    <div>
      <p>{store.getState()}</p>
      <button onClick={() => store.dispatch({type: 'INCREMENT'})}>plus</button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>minus</button>
      <button onClick={() => store.dispatch({type: 'ZERO'})}>zero</button>
    </div>
  );
}

export default App;
