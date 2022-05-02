
import './App.css';

function App() {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //UnitedStates,United Kindom
            value: country.countryInfo.iso3, //USA,UK
          }));
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
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
