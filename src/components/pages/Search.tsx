"use client";
import React, { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Card, SearchPageSkeleton } from "@/index";
import {
  Box,
  Checkbox,
  Divider,
  Slider,
  FormControlLabel,
} from "@mui/material";
import AllCategoryLists from "@/components/AllCategoryLists";

const Search = () => {
  const [SearchProducts, setSearchProducts] = useState([]);
  const [OriginalSearchProducts, setOriginalSearchProducts] = useState([]);
  const search = useSearchParams();
  const searchQuery = search?.get("q");
  const [loading, setLoading] = useState(true);
  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  const [lowHigh, setLowHigh] = useState<String | null>(null);

  const handleLowHighChange = (option: String | null) => {
    setLowHigh((prev) => (prev === option ? null : option));
  };

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRangeValues(newValue as number[]);
  };

  const handleInputValueChange =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (input === "min") {
        setRangeValues((prev) => [Number(e.target.value), prev[1]]);
      } else if (input === "max") {
        setRangeValues((prev) => [prev[0], Number(e.target.value)]);
      }
    };

  // Unified useEffect for fetching, filtering, and sorting
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);

      // Fetch products if search query changes
      let fetchedProducts = [];
      if (searchQuery) {
        const { data: resData } = await axios.post("api/search", {
          searchQuery,
        });
        fetchedProducts = resData.SearchProducts;
        setOriginalSearchProducts(fetchedProducts);
      } else {
        fetchedProducts = OriginalSearchProducts;
      }

      // Apply range filter
      let filteredProducts = fetchedProducts.filter(
        (product: any) =>
          product.price >= rangeValues[0] && product.price <= rangeValues[1]
      );

      // Apply sorting
      if (lowHigh === "lowToHigh") {
        filteredProducts.sort((a: any, b: any) => a.price - b.price);
      } else if (lowHigh === "highToLow") {
        filteredProducts.sort((a: any, b: any) => b.price - a.price);
      }

      setSearchProducts(filteredProducts);
      setLoading(false);
    };

    const timeout = setTimeout(fetchAndFilterProducts, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, rangeValues, lowHigh]);

  return (
    <div className="search-page-container flex min-h-[90vh]">
      <div className="filter-menu fixed-scrollbar w-[300px] h-[90vh] bg-white fixed top-[10vh] overflow-y-auto">
        <>
          {/* Filter */}
          <div className="filter-section mt-10">
            <div className="side-menu-title ml-7 my-3 flex items-center">
              <TuneIcon className="mr-2" />
              <p className="text-xl font-bold">Filter</p>
            </div>
            {/* Price Range */}
            <div className="price-range-section">
              <p className="price-text pl-7 py-3 text-md font-bold">Price</p>
              <div className="price-range flex flex-col items-center justify-center">
                <Box sx={{ width: 200 }}>
                  <Slider
                    disableSwap
                    value={rangeValues}
                    onChange={handleRangeChange}
                    min={0}
                    max={200000}
                  />
                </Box>
                <div className="range-text mt-3 w-[80%] flex justify-around items-center">
                  <p className="text-sm">
                    Min
                    <input
                      value={rangeValues[0]}
                      onChange={handleInputValueChange("min")}
                      className="border border-2 border-gray-200 ml-2 rounded-md outline-none py-1 px-1 w-[60px] text-center"
                    />
                  </p>
                  <p>-</p>
                  <p className="text-sm">
                    Max
                    <input
                      value={rangeValues[1]}
                      onChange={handleInputValueChange("max")}
                      className="border border-2 border-gray-200 ml-2 rounded-md outline-none py-1 px-1 w-[60px] text-center"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Sorting Options */}
          <div className="stock-section ml-9 mt-8">
            <FormControlLabel
              control={
                <Checkbox
                  checked={lowHigh === "highToLow"}
                  onChange={() => handleLowHighChange("highToLow")}
                />
              }
              label="High to Low"
              className="cursor-pointer"
            />
          </div>
          <div className="stock-section ml-9">
            <FormControlLabel
              control={
                <Checkbox
                  checked={lowHigh === "lowToHigh"}
                  onChange={() => handleLowHighChange("lowToHigh")}
                />
              }
              label="Low to High"
              className="cursor-pointer"
            />
          </div>
          <Divider
            sx={{ marginBlock: "1.1rem", width: "90%", marginInline: "auto" }}
          />
          <AllCategoryLists />
        </>
      </div>
      {/* Product Cards */}
      <div className="search-container ml-[300px] min-w-[80vw]">
        {loading ? (
          <SearchPageSkeleton />
        ) : (
          <>
            <div className="flex my-5 text-md justify-center items-center">
              Searched items for <b className="ml-2">'{searchQuery}'</b>
            </div>
            {SearchProducts.length === 0 ? (
              <div className="w-full min-h-[60vh] flex items-center justify-center text-gray-400">
                <div className="text flex flex-col items-center">
                  <ProductionQuantityLimitsIcon sx={{ fontSize: "10rem" }} />
                  <p className="text-3xl mt-4">No Products Found</p>
                </div>
              </div>
            ) : (
              <div className="cardListRow grid mt-5 mx-10 grid-cols-4 gap-6 items-start">
                {SearchProducts.map((product: any) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
