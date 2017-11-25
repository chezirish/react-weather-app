export default function apiCall() {
    return dispatch => 
      fetch(
        'http://api.openweathermap.org/data/2.5/forecast?id=524894&appid=41f8a33ae39edd9592f7e81ffbc91566'
      ).then(function(response) {
        return response.json();
       }
      ).then(
        json => dispatch({ type: 'FETCH_APICALL',  json }),
        err => dispatch({ type: 'FETCH_FAILED',  err })
      );
}