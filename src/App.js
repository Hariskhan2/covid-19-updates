import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import "./components/InfoBox.css";
import numeral from "numeral";
import InfoBoxes from "./components/InfoBoxes.js";
import Map from "./components/Map.js";
import Table from "./components/Table.js";
import Typical from 'react-typical'
import LineGraph from "./components/LineGraph.js";
import { sortData, prettyPrintStat } from "./util";
import "./App.css";
import "leaflet/dist/leaflet.css";
//Add dependencies to use the material UI
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  //useEffect is used to run the piece of code based on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []); //[] because we fetch data from an api as an object but these brackets use to make it an array
  useEffect(() => {
    //the code inside this component will run once
    //when the component loads and not again
    //async =send a request ,wait for it ,do something with it
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //UnitedStates,United Kindom
            value: country.countryInfo.iso2, //USA,UK
          }));
          let sortedData = sortData(data);

          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    //fetching data for the cards
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  // console.log(countryInfo);
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
        <Typical
        steps={['COVID-19', 1000, 'COVID-19 TRACKER', 500,'CORONA PANDAMIC TRACKER ', 500]}
        loop={Infinity}
        wrapper="h1"
        className="heading"
     
      />
          
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>;
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_status">
          <InfoBoxes
          isBlue
          active={casesType==="cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBoxes
          isGreen
           active={casesType==="recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBoxes
          isRed
           active={casesType==="deaths"}
            onClick={(e) => setCasesType("deaths")}
            title=" Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases in country</h3>
          <Table countries={tableData} />
          <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
          {/* <LineGraph className="app_graph" casesType={casesType}/> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
