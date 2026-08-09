import { Country, State, City } from "country-state-city";
import SearchSelect from "../SearchSelect";

const LocationSelector = ({ metadata, setMetadata }) => {
  const countries = Country.getAllCountries();

  const selectedCountry = countries.find(
    (country) => country.name === metadata.location.country,
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find(
    (state) => state.name === metadata.location.region,
  );

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];

  const updateLocation = (field, value) => {
    setMetadata((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-4">
      {/* Country */}
      <SearchSelect
        label="Country"
        value={metadata.location.country}
        options={countries.map((country) => country.name)}
        placeholder="Choose country"
        onChange={(country) => {
          setMetadata((prev) => ({
            ...prev,
            location: {
              country,
              region: "",
              district: "",
            },
          }));
        }}
      />

      {/* State / Region */}
      <SearchSelect
        label="State / Region"
        value={metadata.location.region}
        options={states.map((state) => state.name)}
        placeholder={
          selectedCountry ? "Choose state / region" : "Choose country first"
        }
        onChange={(region) => {
          setMetadata((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              region,
              district: "",
            },
          }));
        }}
      />

      {/* City / District */}
      <SearchSelect
        label="City / District"
        value={metadata.location.district}
        options={cities.map((city) => city.name)}
        placeholder={
          selectedState ? "Choose city" : "Choose state / region first"
        }
        onChange={(district) => {
          updateLocation("district", district);
        }}
      />
    </div>
  );
};

export default LocationSelector;
