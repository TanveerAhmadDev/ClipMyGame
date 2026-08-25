import { Country, State, City } from "country-state-city";
import SearchSelect from "../SearchSelect";

const LocationSelector = ({ metadata, setMetadata, className }) => {
  const countries = Country.getAllCountries();

  const selectedCountry = countries.find(
    (country) => country.isoCode === metadata.location.countryCode,
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find(
    (state) => state.isoCode === metadata.location.stateCode,
  );

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  const updateLocation = (updates) => {
    setMetadata((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        ...updates,
      },
    }));
  };

  return (
    <div className="space-y-4">
      {/* COUNTRY */}
      <SearchSelect
        label="Country"
        value={metadata.location.country}
        options={countries.map((country) => country.name)}
        placeholder="Choose country"
        className={className}
        onChange={(countryName) => {
          const country = countries.find((item) => item.name === countryName);

          updateLocation({
            countryCode: country?.isoCode || "",
            country: country?.name || "",

            stateCode: "",
            state: "",

            city: "",
          });
        }}
      />

      {/* STATE */}
      <SearchSelect
        label="State / Region"
        value={metadata.location.state}
        options={states.map((state) => state.name)}
        className={className}
        placeholder={
          selectedCountry ? "Choose state / region" : "Choose country first"
        }
        onChange={(stateName) => {
          const state = states.find((item) => item.name === stateName);

          updateLocation({
            stateCode: state?.isoCode || "",
            state: state?.name || "",

            city: "",
          });
        }}
      />

      {/* CITY */}
      <SearchSelect
        label="City"
        value={metadata.location.city}
        options={cities.map((city) => city.name)}
        className={className}
        placeholder={
          selectedState ? "Choose city" : "Choose state / region first"
        }
        onChange={(cityName) => {
          updateLocation({
            city: cityName,
          });
        }}
      />
    </div>
  );
};

export default LocationSelector;
