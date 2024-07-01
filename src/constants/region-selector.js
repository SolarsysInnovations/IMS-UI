import React, { useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';

const RegionSelector = () => {
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
        <RegionDropdown
          country={country}
          value={region}
          onChange={handleRegionChange}
        />
    </div>
  );
};

export default RegionSelector;