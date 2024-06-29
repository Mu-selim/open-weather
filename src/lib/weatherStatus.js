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

export const getMonthAndDayName = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "long" }).toLocaleLowerCase();
  const day = date.toLocaleString("default", { weekday: "long" }).toLocaleLowerCase();
  const dayNumber = date.getDate();
  return { month, day, dayNumber };
};

export const timestampsToTimeAmAndPm = (timestamp, includeMinute) => {
  const date = new Date(timestamp * 1000);
  if (includeMinute) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleTimeString([], { hour: "2-digit", hour12: true });
};
