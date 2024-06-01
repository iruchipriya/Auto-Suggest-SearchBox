import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const url = 'https://testapi.devtoolsdaily.com/users';

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData, 'datadata');
      setData(jsonData);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const filteredSuggestions = data.filter((item) => {
        return item.firstName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleSuggestion = (suggestion) => {
    setSearchValue(suggestion.firstName);
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Autosuggest Input Box</h1>
      <input
        type="text"
        value={searchValue}
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      {suggestions.map((suggestion, index) => (
        <div key={index} onClick={() => handleSuggestion(suggestion)}>
          {suggestion.firstName}
        </div>
      ))}
    </div>
  );
}
