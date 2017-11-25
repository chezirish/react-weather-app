import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Wrapper from './wrapper';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';




let d = new Date();
let weekday = [];
weekday[1] = "Пн.";
weekday[2] = "Вт.";
weekday[3] = "Ср.";
weekday[4] = "Чт.";
weekday[5] = "Пт.";
weekday[6] = "Сб.";
weekday[0] = "Вс.";
let n = d.getDay();
let days = [];
for(let i=0; i<5;i++){
    days.push(weekday[n]);
    if(n === 6){
        n = 0;
    } else {
        n += 1;
    }
}

let dates = [];
for(let i=0; i<5; i++){
    dates.push([d.getDate()+i, d.getMonth()+1, d.getFullYear()].join('.'));
}

let datesDays = [];
for(let i=0; i<5; i++){
    datesDays[i] = { date: dates[i], day: days[i]};
}



function reducer(state = {initialState: datesDays, apiData: null, currentDate: datesDays[0].date} , action){
    if( action.type === 'FETCH_FAILED'){
        console.log(action.err);
    } else if (action.type === 'FETCH_APICALL'){
        return { ...state, apiData: action.json };
    } else if(action.type === 'changeDay'){
        return {...state, currentDate: action.currentDate};
    }
    return state;
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    console.log('sub', store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <Wrapper />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
