
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
  return (
    <div className="App">
      
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
