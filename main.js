// Foursquare API Info
const clientId = 'place holder';
const clientSecret = 'place holder';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'placeholder';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $amount = $('#num');
const $destination = $('#destination');
const $section = $('#venues');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const getVenues = async() => {
  const city = $input.val();
  const urlToFetch = url + city + '&limit=' + $amount.val() + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200528';
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }
  }catch(error){
    console.log(error);
  }
}

const getForecast = async() => {
  const urlToFetch = weatherUrl + '?&q=' + $input.val() + '&APPID=' + openWeatherKey;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse
    }
  }catch(e){
    console.log(e)
  }
}


const renderVenues = (venues) => {
    
    let j=1;
    for(let i=0;i<$amount.val();i++){
    let test=document.createElement('div');
    test.setAttribute('class','venue');
   
    const venue = venues[i];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(j,venue.name, venue.location, venueImgSrc);

   test.innerHTML = test.innerHTML + venueContent;
   $section.append(test);
    j+=1;
  }
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $section.empty();
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  
  getVenues().then(venues => renderVenues(venues));
  
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

if($input.val){
    $submit.click(executeSearch);
}
