import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Card from "./components/Card";
import Cartitem from "@/components/Cartitem";
import Plusminus from "@/components/Plusminus";
import Cartbill from "@/components/Cartbill";
import ContactInformation from "./pages/checkout/ContactInformation";
import OrderSummary from "./pages/checkout/OrderSummary";
import SummaryCart from "./components/SummaryCart";
import ProductDescription from "./components/ProductDescription";
import CardListOneRow from "./components/CardListOneRow";
import ProductForm from "./components/ProductForm";
import ProductReviews from "./components/ProductReviews";
import SingleProductReview from "./components/SingleProductReview";
import RelatedProducts from "./components/RelatedProducts";
//skeleton
import CardSkeleton from "./components/CardSkeleton";
import OrderListSkeleton from "./components/OrderListSkeleton";
import SearchPageSkeleton from "./components/SearchPageSkeleton";
import ReviewSkeleton from "./components/ReviewSkeleton";
import ProductDetailSkeleton from "./components/ProductDetailSkeleton";
import CartProductSkeleton from "./components/CartProductSkeleton";
import OrderSummarySkeleton from "./components/OrderSummarySkeleton";
import ContactInfoSkeleton from "./components/ContactInfoSkeleton";
import ProfileSkeleton from "./components/ProfileSkeleton";
//array
import { products } from "@/products/products";
// functions
import { removeSidebar } from "./helper/removeSidebar";
import { notify } from "./helper/notify";
// admin
import AdminReviewList from "./adminComponents/AdminReviewList";

export {
  Header,
  SingleProductReview,
  ProductDescription,
  ProductReviews,
  SideMenu,
  CardListOneRow,
  Plusminus,
  ProductForm,
  Cartbill,
  SummaryCart,
  Cartitem,
  ContactInformation,
  RelatedProducts,
  OrderSummary,
  Card,
  // admin
  AdminReviewList,
  //skeleton
  CardSkeleton,
  ProductDetailSkeleton,
  ReviewSkeleton,
  OrderListSkeleton,
  CartProductSkeleton,
  SearchPageSkeleton,
  ProfileSkeleton,
  ContactInfoSkeleton,
  OrderSummarySkeleton,
  //functions
  removeSidebar,
  notify,
  //array
  products,
};
