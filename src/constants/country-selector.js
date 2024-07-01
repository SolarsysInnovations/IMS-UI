import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';

const CountrySelector = () => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const handleCountryChange = (val) => {
    setCountry(val);
    setRegion(''); // Reset region when country changes
  };

  const handleRegionChange = (val) => {
    setRegion(val);
  };

  return (
    <div>
      <div>
        <CountryDropdown
          value={country}
          onChange={handleCountryChange}
        />
      </div>
    </div>
  );
};

export default CountrySelector;