import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Card, CardListOneRow } from "@/index";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import AdsProductGrid from "@/components/AdsProductGrid";
import ProductLIstRow from "@/components/ProductListRow";
import { useRouter } from "next/navigation";
const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart"); // Preloads the 'about' page
  }, [router]);
  return (
    <div className="mx-14">
      {/* landingImage */}
      <div className="landingImageConatiner relative rounded-xl mt-5 mb-7 overflow-hidden">
        <Image src={landingImage} alt="landingimage" />
        <a href="#cardListOneRowContainer1">
          <Button
            variant="contained"
            sx={{ background: "white", color: "black" }}
            className="absolute ml-2 left-80 top-60"
          >
            Shop now
            <KeyboardDoubleArrowRightIcon
              sx={{ fontSize: "1rem", marginLeft: ".3rem" }}
            />
          </Button>
        </a>
      </div>
      {/* first card list */}
      <div
        id="cardListOneRowContainer1"
        className="cardListOneRowContainer1 mb-7"
      >
        <CardListOneRow />
      </div>
      {/* top products and ad grid */}
      <div className="w-full h-[685px] flex justify-between mb-7 ">
        <div
          className={`w-[40%] h-full bg-white rounded-xl shadow-lg flex nmjustify-center flex-col p-4 pb-10`}
        >
          <p className="cardListTitle text-xl mb-3 poppins font-light">
            Top Clothings
          </p>
          <div className="cardListGrid grid grid-cols-2 gap-6">
            <AdsProductGrid />
          </div>
        </div>
        <div className="w-[55%] h-[100%] bg-gray-200 overflow-hidden rounded-xl shadow-xl">
          <img
            src="https://img.freepik.com/premium-vector/black-friday-sale-banner-design-illustration-space-text_41050-2878.jpg"
            alt="sale banner"
            className="object-cover h-[100%] w-[100%] brightness-90 mix-blend-multiply"
          />
        </div>
      </div>
      {/* second card list */}
      <div className="cardListOneRowContainer2 mb-7">
        <ProductLIstRow />
      </div>
    </div>
  );
};

export default LandingPage;
