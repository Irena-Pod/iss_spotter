// const { fetchMyIP } = require("./iss");
// const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log('It worked! Returned IP:', ip);
//   }
// });

// fetchCoordsByIP("174.112.140.137", (error, coords) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(coords);
// });

fetchISSFlyOverTimes({ latitude: "45.2722", longitude: "-75.7522" }, (error, flyoverTimes) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(flyoverTimes);
});