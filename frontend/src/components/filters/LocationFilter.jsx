import React, { useMemo } from "react";
import { Country, State, City } from "country-state-city";

const LocationFilter = ({ filters, onUpdateFilter }) => {
  const countries = useMemo(() => {
    return Country.getAllCountries();
  }, []);

  const states = useMemo(() => {
    if (!filters?.countryCode) return [];

    return State.getStatesOfCountry(filters.countryCode);
  }, [filters?.countryCode]);

  const cities = useMemo(() => {
    if (!filters?.countryCode || !filters?.stateCode) return [];

    return City.getCitiesOfState(filters.countryCode, filters.stateCode);
  }, [filters?.countryCode, filters?.stateCode]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;

    onUpdateFilter("countryCode", countryCode);
    onUpdateFilter("stateCode", "");
    onUpdateFilter("city", "");
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;

    onUpdateFilter("stateCode", stateCode);
    onUpdateFilter("city", "");
  };

  const handleCityChange = (event) => {
    onUpdateFilter("city", event.target.value);
  };

  return (
    <div>
      <h3 className="hidden md:block text-xl font-semibold mb-1">Location</h3>

      <p className="hidden md:block text-sm text-gray-500 mb-6">
        Filter posts by location.
      </p>

      <label className="block text-sm font-medium mb-2 dark:text-white">
        Country
      </label>

      <select
        value={filters?.countryCode || ""}
        onChange={handleCountryChange}
        className="
          w-full
          max-w-75
          h-12
          px-4
          rounded-xl
          border
          dark:text-white
          border-gray-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-800
          outline-none
          mb-5
        "
      >
        <option value="">All countries</option>

        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {/* State */}
      <label className="block text-sm font-medium mb-2">State / Region</label>

      <select
        value={filters?.stateCode || ""}
        onChange={handleStateChange}
        disabled={!filters?.countryCode}
        className="
          w-full
          max-w-75
          h-12
          px-4
          rounded-xl
          border
          dark:text-white
          border-gray-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-800
          outline-none
          mb-5
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <option value="">
          {!filters?.countryCode
            ? "Choose country first"
            : "All states / regions"}
        </option>

        {states.map((state) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City */}
      <label className="block text-sm font-medium mb-2">City</label>

      <select
        value={filters?.city || ""}
        onChange={handleCityChange}
        disabled={!filters?.stateCode}
        className="
         w-full
          max-w-75
          h-12
          px-4
          rounded-xl
          border
          dark:text-white
          border-gray-200
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-800
          mb-5
          outline-none
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <option value="">
          {!filters?.stateCode ? "Choose state first" : "All cities"}
        </option>

        {cities.map((city) => (
          <option
            key={`${city.name}-${city.latitude}-${city.longitude}`}
            value={city.name}
          >
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;
