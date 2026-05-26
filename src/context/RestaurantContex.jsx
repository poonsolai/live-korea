import axios from "axios";
import API from "../api";
import { createContext, useContext, useEffect, useState } from "react";

// DEFAULT IMAGE
// API la image kidaikala na indha image use agum
import kimg1 from "../assets/homepage-image/south-korea.png";

// CONTEXT CREATE
const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  // ALL TOURIST PLACE DATA STORE
  const [resplace, setResplace] = useState([]);

  // DELAY FUNCTION
  // API overload avoid panna use agum
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // =========================================
  // SINGLE IMAGE FETCH FUNCTION
  // =========================================
  const getImage = async (name) => {
    try {
      // RANDOM PAGE
      // Small number use pannina fast ah response varum
      const randomPage = Math.floor(Math.random() * 10) + 1;

      // PEXELS API CALL
      const res = await axios.get(
        "https://api.pexels.com/v1/search",

        {
          // QUERY PARAMETERS
          params: {
            // SEARCH KEYWORD
            query: `${name} South Korea`,

            // ONLY 1 IMAGE FETCH
            // Speed improve agum
            per_page: 1,

            // RANDOM PAGE
            page: randomPage,

            // LANDSCAPE IMAGE
            orientation: "landscape",
          },

          // API KEY
          headers: {
            Authorization: "K4FzadQdtMN82iQB6Gz5tytulirVPi5Xq6C2jQK1JaBAxRYyMQDa85EI",
          },

          // 5 SECOND TIMEOUT
          // Long loading avoid agum
          timeout: 5000,
        },
      );

      // IMAGE EXISTS CHECK
      if (res.data.photos.length > 0) {
        // FIRST IMAGE RETURN
        return res.data.photos[0].src.landscape;
      }

      // IMAGE ILLANA DEFAULT IMAGE
      return kimg1;
    } catch (err) {
      console.log("IMAGE FETCH ERROR:", name);

      // ERROR VANDA DEFAULT IMAGE
      return kimg1;
    }
  };

  // =========================================
  // FETCH ALL TOURIST PLACES
  // =========================================
  const fetchAllPlaces = async () => {
    console.log("FETCHING TOURIST PLACES...");

    try {
      // BACKEND API CALL
      const res = await axios.get(`${API}/restaurant`);

      // TOURIST ARRAY
      const touristData = res.data.restaurant;

      // FINAL UPDATED DATA STORE
      let updatedPlaces = [];

      // =====================================
      // BATCH FETCH METHOD
      // =====================================
      // 5 REQUESTS ONLY SAME TIME
      // Browser lag agathu
      // API overload agathu

      for (let i = 0; i < touristData.length; i += 5) {
        // CURRENT 5 ITEMS
        const batch = touristData.slice(i, i + 5);

        // FETCH IMAGES FOR CURRENT BATCH
        const batchResults = await Promise.all(
          batch.map(async (item) => {
            // GET IMAGE
            const image = await getImage(item.imageSearchKeyword);

            // RETURN UPDATED OBJECT
            return {
              ...item,
              image,
            };
          }),
        );

        // ADD NEW DATA
        updatedPlaces = [...updatedPlaces, ...batchResults];

        // LIVE UI UPDATE
        // User ku immediate data theriyum
        setResplace([...updatedPlaces]);

        // SMALL DELAY
        // API crash avoid agum
        await delay(300);
      }

      console.log("ALL IMAGES FETCHED SUCCESSFULLY");
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // AUTO FETCH WHEN APP LOADS
  useEffect(() => {
    fetchAllPlaces();
  }, []);

  // CONTEXT PROVIDER
  return (
    <RestaurantContext.Provider
      value={{
        // ALL PLACE DATA
        resplace,
        // REFETCH FUNCTION
        fetchAllPlaces,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

// CUSTOM HOOK
export const useRestaurantContext = () => {
  return useContext(RestaurantContext);
};
