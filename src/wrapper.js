import React, { Component } from 'react';
import './wrapper.css';
import DayButton from './dayButton.js'
import { connect } from 'react-redux';
import apiCall from './apiCall.js';


class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.onClicked = this.onClicked.bind(this);    
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    this.props.getWeather();
  }

  onClicked(e) {
    let element = e.target.getElementsByTagName('p')[0];
    let currentDate = null;
    if(element){
      currentDate = element.innerHTML;

      let arrBtn = document.getElementsByClassName('dayBtn');
      for(let i=0; i<arrBtn.length; i++){
        arrBtn[i].classList.remove("style");
      }
      e.target.classList.add("style");
    } else {
      currentDate = e.target.parentNode.getElementsByTagName('p')[0].innerHTML

      let arrBtn = document.getElementsByClassName('dayBtn');
      for(let i=0; i<arrBtn.length; i++){
        arrBtn[i].classList.remove("style");
      }
      e.target.parentNode.classList.add("style");
    }
    this.props.handleOnClicked('changeDay', currentDate);
     
  }

  render() {
    var apiResponse = false;
    if(this.props.store.apiData){ 
      apiResponse = true;
      var list = this.props.store.apiData.list;
      var chousedDay;
      var currentDay;
      var apiArray;
      for(let i=0;i<list.length;i++){
        chousedDay = list[i].dt_txt.split(' ')[0].split('-')[2];
        currentDay = this.props.store.currentDate.split('.')[0];
        if(chousedDay === currentDay){
          apiArray = list[i];
          console.log(apiArray)
          break;
        }
      }
    }


    return (
      <div>
        <div className="wrapper">
          <div onClick={this.onClicked}>
          { this.props.store.initialState.map(function(item, index) {
            return <DayButton key={index} day={item.day} date={item.date}/>
          })
          }
          </div>
        </div>
        <div className="output">
          <p>{ apiResponse ? (this.props.store.currentDate) : (this.props.store.initialState[0].day + ' - ' + this.props.store.initialState[0].date)  }</p>
          <p>{ 'темпераура: от ' + (apiResponse ? Math.round(apiArray.main.temp_min - 273.15) : '') + ' до ' + (apiResponse ? Math.round(apiArray.main.temp_max - 273.15) : '')}</p>
          <p>{'влажность: ' + (apiResponse ? (apiArray.main.humidity + '%') : '')}</p> 
          <p>{'давление ' + (apiResponse ? (apiArray.main.pressure  + ' hPa') : '')}</p> 
          <p>{'облачность: ' + (apiResponse ? (apiArray.clouds.all  + '%') : '')}</p> 
          <p>{'скорость ветра: ' + (apiResponse ? (apiArray.wind.speed  + ' м/с') : '')}</p>
          <p>{'направление ветра: ' + (apiResponse ? (apiArray.wind.deg  + ' градусов') : '')}</p> 
          <p>{}</p> 
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    getWeather: () => {
      dispatch(apiCall());
    },
    handleOnClicked: (type, currentDate) => {
      dispatch({ type: type,  currentDate });
    }
  })
)(Wrapper);
