import sun from "@/assets/icons/sun.png";
import moon from "@/assets/icons/moon.png";
import clouds from "@/assets/icons/clouds.png";
import cloudWithSun from "@/assets/icons/cloudWithSun.png";
import cloudWithMoon from "@/assets/icons/cloudWithMoon.png";
import cloudsHeavy from "@/assets/icons/cloudsHeavy.png";
import heavilyRainyCloudsWithSun from "@/assets/icons/heavilyRainyCloudsWithSun.png";
import heavilyRainyCloudsWithMoon from "@/assets/icons/heavilyRainyCloudsWithMoon.png";
import rainyClouds from "@/assets/icons/rainyClouds.png";
import snow from "@/assets/icons/snow.png";
import sparkClouds from "@/assets/icons/sparkClouds.png";
import pressure from "@/assets/icons/pressure.png";
import direction from "@/assets/icons/direction.png";

export const weatherStatusIconsMap = {
  sun,
  moon,
  clouds,
  cloudWithSun,
  cloudWithMoon,
  cloudsHeavy,
  heavilyRainyCloudsWithSun,
  heavilyRainyCloudsWithMoon,
  rainyClouds,
  snow,
  sparkClouds,
  pressure,
  direction,
};

export const isDayLight = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();

  // Assuming day is between 6 AM and 6 PM
  if (hours >= 6 && hours < 18) {
    return true;
  }
  return false;
};

export const temperatureIconMap = (temp) => {
  if (temp < 0) {
    return snow;
  } else if (temp >= 0 && temp < 10) {
    return sparkClouds;
  } else if (temp >= 10 && temp < 20) {
    return clouds;
  } else if (temp >= 20 && temp < 30) {
    return cloudWithSun;
  } else {
    return sun;
  }
};

export const dateHoursAndMinutes = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  console.log(date.toLocaleString());
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};
