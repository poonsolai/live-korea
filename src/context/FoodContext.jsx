import axios from "axios";
import API from "../api";
import { createContext, useContext, useEffect, useState } from "react";

// DEFAULT IMAGE
// API la image kidaikala na indha image use agum
import kimg1 from "../assets/homepage-image/south-korea.png";

// CONTEXT CREATE
const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  // ALL FOOD ITEMS STORE
  const [fooditems, setFoodItems] = useState([]);

  // =========================================
  // DELAY FUNCTION
  // =========================================
  // API overload avoid panna use agum
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // =========================================
  // SINGLE IMAGE FETCH FUNCTION
  // =========================================
  const getImage = async (name) => {
    try {
      // RANDOM PAGE
      // Small range = fast response
      const randomPage = Math.floor(Math.random() * 10) + 1;

      // PEXELS API REQUEST
      const res = await axios.get(
        "https://api.pexels.com/v1/search",

        {
          // QUERY PARAMS
          params: {
            // SEARCH KEYWORD
            query: `${name} southKorean food`,

            // ONLY 1 IMAGE
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

          // TIMEOUT
          // Long loading avoid agum
          timeout: 5000,
        },
      );

      // IMAGE EXISTS CHECK
      if (res.data.photos.length > 0) {
        // FIRST IMAGE RETURN
        return res.data.photos[0].src.landscape;
      }

      // NO IMAGE -> DEFAULT IMAGE
      return kimg1;
    } catch (err) {
      console.log("IMAGE FETCH ERROR:", name);
      // ERROR VANDA DEFAULT IMAGE
      return kimg1;
    }
  };

  // FETCH ALL FOOD ITEMS
  const fetchAllFoods = async () => {
    console.log("FETCHING FOOD IMAGES...");

    try {
      // BACKEND API
      const res = await axios.get(`${API}/api/foods`);
      // FOOD ARRAY
      const foodData = res.data.foods;

      // FINAL UPDATED DATA
      let updatedFoods = [];

      // BATCH FETCH METHOD
      // 5 REQUESTS ONLY SAME TIME
      // Browser lag agathu
      // API overload agathu

      for (let i = 0; i < foodData.length; i += 5) {
        // CURRENT 5 ITEMS
        const batch = foodData.slice(i, i + 5);

        // FETCH IMAGE FOR CURRENT BATCH
        const batchResults = await Promise.all(
          batch.map(async (item) => {
            // FETCH IMAGE
            const image = await getImage(item.image_search_keyword);

            // RETURN UPDATED OBJECT
            return {
              ...item,
              image,
            };
          }),
        );

        // ADD NEW DATA
        updatedFoods = [...updatedFoods, ...batchResults];

        // LIVE UI UPDATE
        // User ku immediate data display agum
        setFoodItems([...updatedFoods]);

        // SMALL DELAY
        // API overload avoid agum
        await delay(300);
      }

      console.log("ALL FOOD IMAGES FETCHED");
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // AUTO FETCH ON PAGE LOAD
  useEffect(() => {
    fetchAllFoods();
  }, []);

  // CONTEXT PROVIDER
  return (
    <FoodContext.Provider
      value={{
        // ALL FOOD DATA
        fooditems,
        // REFETCH FUNCTION
        fetchAllFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

// CUSTOM HOOK
export const useFoodContext = () => {
  return useContext(FoodContext);
};
