
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
      
    </div>
  );
}

export default App;
