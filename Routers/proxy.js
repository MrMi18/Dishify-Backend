import express from "express";
import fetch from "node-fetch";


const proxyRouter = express.Router();
proxyRouter.get("/api/restaurants", async (req, res) => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.174214&lng=79.0600207";
  
    // console.log("Proxy endpoint hit");
    // console.log("Fetching data from Swiggy API:", url);
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://www.swiggy.com/",
        },
      });
  
      console.log("Swiggy API Response Status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching data from Swiggy API:", error.message);
      res.status(500).json({ error: "Error fetching data from Swiggy API" });
    }
  });
  
  // Proxy route for menu
  proxyRouter.get("/api/menu/:restaurantId", async (req, res) => {
    const { restaurantId } = req.params;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.174214&lng=79.0600207&restaurantId=${restaurantId}`;
  
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://www.swiggy.com/",
        },
      });
  
     
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching menu from Swiggy API:", error.message);
      res.status(500).json({ error: "Error fetching menu from Swiggy API" });
    }
  });
  proxyRouter.get("/api/collection/:collection_id/:tags", async (req, res) => {
      console.log(req.params);
    const { collection_id,tags } = req.params;
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.174214&lng=79.0600207&collection=${collection_id}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  
    
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://www.swiggy.com/",
        },
      });
  
      console.log("Swiggy API Response Status for menu:", response.status);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching menu from Swiggy API:", error.message);
      res.status(500).json({ error: "Error fetching menu from Swiggy API" });
    }
  });

  export default proxyRouter;