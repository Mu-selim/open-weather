# **Open Weather**

Open Weather is a simple weather app that uses the Open Weather API to get the weather data for a given city. The app is built using React.js and is deployed on Cloudflare Pages.

## **Contents**

- [**Problem Statement**](#problem-statement)
- [**Requirements**](#requirements)
- [**How to set up the project**](#how-to-set-up-the-project)
- [**How to run the project**](#how-to-run-the-project)
- [**Deployment**](#deployment)
- [**Features**](#features)
- [**Future Scope**](#future-scope)
- [**Author**](#author)

## **Problem Statement**

The problem statement for this project is to build a weather dashboard that displays the weather data for a given city.

## **Requirements**

The project requires the following dependencies:

- [Node.js](https://nodejs.org/en/) v18.x or higher
- Package Manager: npm, pnpm or yarn
- [Open Weather API Key](https://openweathermap.org/api)

## **How to set up the project**

1. Clone the repository using the following command:

```bash
git clone https://github.com/Mu-selim/open-weather.git
```

2. Navigate to the project directory:

```bash
cd open-weather
```

3. Install the project dependencies:

```bash
pnpm install # or npm install or yarn install
```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

```env
VITE_APP_OPEN_WEATHER_KEY="YOUR_OPEN_WEATHER_API_KEY"
```

## **How to run the project**

To run the project, use the following command:

```bash
pnpm dev # or npm run dev or yarn dev
```

to build the project, use the following command:

```bash
pnpm build # or npm run build or yarn build
```

you can also preview the project using the following command:

```bash
pnpm preview # or npm run preview or yarn preview
```

## **Deployment**

The project is deployed on Cloudflare Pages. You can view the live project [openweather-f3p.pages.dev](https://openweather-f3p.pages.dev/).

## **Features**

The project has the following features:

- Search for a city and get the weather data
- Multiple themes: Light and Dark
- Multiple languages: English, Arabic, Spanish, and German
- Display the weather data for the next 5 days
- Display the weather data for the next 24 hours
- Responsive design
- Error handling
- Loading state

## **Future Scope**

The project can be extended with the following features:

- Add more languages
- Add search suggestions
- Add more weather data

## **Author**

- Muhammad Selim
- [muhamadselim70@gmail.com](mailto:muhamadselim70@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/selimjs)