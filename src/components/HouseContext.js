import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    //remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    setCountries(uniqueCountries);
  }, [houses]);

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    //remove duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];

    setProperties(uniqueProperties);
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setLoading(true);
    //create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return (
        str.split(' ').includes('(any)')
      )
    };
      //get first value of price and parse it into numbers
    const minPrice = parseInt(price.split(' ')[0]);
    //get second value (max Price) and parse it into numbers
    const maxPrice = parseInt(price.split(' ')[2]);

// eslint-disable-next-line
    const newHouses = housesData.filter((house) => {
       const housePrice = parseInt(house.price);

       // if all values are selected
       if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice){
        return house;
       }

       //if all values are default
       if (isDefault(country) && isDefault(property) && isDefault(price)){
        return house;
       }

       // if country is not default
       if (!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country;
       }

       // if property is not default
       if (!isDefault(property) && isDefault(country) && isDefault(price)){
        return house.type === property;
       }

       // if price is not default
       if (!isDefault(price) && isDefault(country) && isDefault(property)){
        if (housePrice >= minPrice && housePrice <= maxPrice){
          return house;
        }
       }

        // if country & property is not default
        if (!isDefault(country) && !isDefault(property) && isDefault(price)){
          return house.country === country && house.type === property;
        }

        // if country and price is not default
        if (!isDefault(country) && isDefault(property) && !isDefault(price)){
          if (housePrice >= minPrice && housePrice <= maxPrice){
            return house.country === country;
          }
        }

        // if property and price is not default
          if(!isDefault(country) && !isDefault(property) && !isDefault(price)){
            if (housePrice >= minPrice && housePrice <= maxPrice){
              return house.type === property;
            }
          }
    });
// eslint-disable-next-line
    setTimeout(() =>{
      // eslint-disable-next-line
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses), 
      setLoading(false)
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        handleClick,
        loading
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
