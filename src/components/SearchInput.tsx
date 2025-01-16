"use client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [resultArr, setResultArr]= useState([])

  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() == "") {
      return false;
    }
    // const encodedSearchQuery=encodeURI(searchQuery);
    // setSearchQuery("");
    router.push(`/search?q=${searchQuery}`);

    // console.log("current query", encodedSearchQuery);
  };

  return (
    <div>
      <div className="border rounded-lg overflow-hidden">
        <form onSubmit={onSearch}>
          <input
            id="searchbar"
            autoComplete="off"
            placeholder="Search"
            className="w-[500px] px-3 py-1 border-none outline-none"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit" className="p-1 bg-gray-100 hover:bg-gray-200 ">
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
