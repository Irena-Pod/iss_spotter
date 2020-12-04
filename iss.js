const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = JSON.parse(body).ip
      callback(null, ip);
    }
  });
}


const fetchCoordsByIP = function (ip, callback) {
  request("https://freegeoip.app/json/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    callback(null, { latitude, longitude });

  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`

  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode}  when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      error.message = "Error @ fetchMyIP"
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        error.message = "Error @ FetchCoordsByIP"
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          error.message = "Error @ fetchISSFlyOverTimes"
          callback(error, null);
          return;
        }
        callback(null, passes)
      });
    });
  });
}


module.exports = { fetchMyIP };
    module.exports = { fetchCoordsByIP };
    module.exports = { fetchISSFlyOverTimes };
    module.exports = { nextISSTimesForMyLocation };