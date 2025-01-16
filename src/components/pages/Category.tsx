"use client";
import { Card, removeSidebar, SearchPageSkeleton } from "@/index";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
} from "@mui/material";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AllCategoryLists from "@/components/AllCategoryLists";
const Category = () => {
  // const [categoryProducts, setCategoryProducts] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [OriginalCatProducts, setOriginalCatProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const category = useSearchParams();
  const cid = category ? category.get("cid") : null;
  const cname = category ? category.get("cname") : null;
  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  // price high to low vice versa
  const [lowHigh, setLowHigh] = useState<String | null>(null);

  const handleLowHighChage = (option: String | null) => {
    // Toggle the selected option or deselect if already selected
    setLowHigh((prev) => (prev == option ? null : option));
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeValues(newValue as number[]);
  };

  const handleInputValueChange = (inp: any) => {
    return function (e: any) {
      if (inp == "inp0") setRangeValues((prev) => [e.target.value, prev[1]]);
      else if (inp == "inp1")
        setRangeValues((prev) => [prev[0], e.target.value]);
    };
  };
  // sort product by range
  function sortProductByRange() {
    let updatedCatProducts = OriginalCatProducts.filter(
      (product: any) =>
        product.price >= rangeValues[0] && product.price <= rangeValues[1]
    );
    setCatProducts(updatedCatProducts);
    setLowHigh(null);
  }

  // sort high low
  function updateLowHighProducts() {
    let updatedCatProducts = [...catProducts];
    if (lowHigh === "lowToHigh") {
      updatedCatProducts.sort((a: any, b: any) => a.price - b.price);
    } else if (lowHigh === "highToLow") {
      updatedCatProducts.sort((a: any, b: any) => b.price - a.price);
    }
    setCatProducts(updatedCatProducts);
  }

  async function getCategoryProducts() {
    try {
      // setLoading(true);
      const { data: resData } = await axios.post("/api/category", { cid });
      console.log("API Response:", resData.CategoryProducts);
      setCatProducts(resData.CategoryProducts);
      setOriginalCatProducts(resData.CategoryProducts);

      // Immediately sort products after fetching
      sortProductByRange();

      // setLoading(false);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  }

  //initial
  useEffect(() => {
    getCategoryProducts();
    removeSidebar();
    setRangeValues([0, 200000]);
  }, [cid]);
  //range values
  useEffect(() => {
    let timeout = setTimeout(() => {
      sortProductByRange();
      console.log("range changed", catProducts);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [rangeValues, OriginalCatProducts]);

  // high low checkbox
  useEffect(() => {
    updateLowHighProducts();
  }, [lowHigh]);

  return (
    <div>
      <div className="filter-menu fixed-scrollbar w-[300px] h-[90vh] bg-white fixed top-[10vh] overflow-y-auto">
        <>
          {/* filter */}
          <div className="filter-section mt-10">
            {/* menutitle */}
            <div className="side-menu-title ml-7 my-3 flex items-center">
              <TuneIcon className="mr-2" />
              <p className="text-xl font-bold ">Filter</p>
            </div>
            {/* pricerange */}
            <div className="price-range-section">
              <p className="price-text pl-7 py-3 text-md font-bold">Price</p>
              <div className="price-range flex flex-col items-center justify-center">
                <Box sx={{ width: 200 }}>
                  <Slider
                    disableSwap
                    value={rangeValues}
                    onChange={handleChange}
                    min={0}
                    max={200000}
                  />
                </Box>
                <div className="range-text mt-3  w-[80%] flex justify-around items-center">
                  <p className="text-sm">
                    Min
                    <input
                      value={rangeValues[0]}
                      onChange={handleInputValueChange("inp0")}
                      className="border-2 border-gray-200 ml-2 rounded-md outline-none py-1 px-1 w-[60px] text-center"
                    />
                  </p>
                  <p>-</p>
                  <p className="text-sm">
                    Max
                    <input
                      value={rangeValues[1]}
                      onChange={handleInputValueChange("inp1")}
                      className="border-2 border-gray-200 ml-2 rounded-md outline-none py-1 px-1 w-[60px] text-center"
                    />
                  </p>
                </div>
              </div>
            </div>
            {/* <p>
          searchnow {searchRangeValues[0]} - {searchRangeValues[1]}
        </p> */}
          </div>
          {/* price high to low  */}
          <div className="stock-section ml-9 mt-8">
            <FormControlLabel
              control={
                <Checkbox
                  checked={lowHigh === "highToLow"}
                  onChange={() => handleLowHighChage("highToLow")}
                />
              }
              label="High to Low"
              className="cursor-pointer"
            />
          </div>
          {/* price low to high  */}
          <div className="stock-section ml-9">
            <FormControlLabel
              control={
                <Checkbox
                  checked={lowHigh === "lowToHigh"}
                  onChange={() => handleLowHighChage("lowToHigh")}
                />
              }
              label="Low to High"
              className="cursor-pointer"
            />
          </div>{" "}
          <Divider
            sx={{ marginBlock: "1.1rem", width: "90%", marginInline: "auto" }}
          />
          {/* Category list*/}
          <AllCategoryLists />
        </>
      </div>
      {/* category products */}
      <div className="search-container ml-[300px] min-w-[80vw]">
        {loading ? (
          <SearchPageSkeleton />
        ) : (
          <>
            <div className="poppins font-thinner flex my-5 text-3xl justify-center items-center">
              {cname} Products
            </div>
            <div className="cardListRow grid grid-cols-4 items-center pl-12">
              {catProducts.map((product: any) => {
                return <Card key={product._id} product={product} />;
              })}
            </div>
            <div className="cardListRow grid mt-5 mx-10 grid-cols-5 gap-6 items-start"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
