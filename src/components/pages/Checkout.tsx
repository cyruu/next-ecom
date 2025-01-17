"use client";
import React, { useEffect, useState } from "react";
import { OrderSummary, ContactInformation, notify } from "@/index";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const query = useSearchParams();
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [total, settotal] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [finalTotal, setfinalTotal] = useState(0);
  //payment method
  const [paymentmethod, setpaymentmethod] = useState("cod");
  const { register, handleSubmit, setValue, getValues, reset, formState } =
    useForm<any>();

  const { errors } = formState;
  // esewa
  const [formData, setFormData] = useState<any>({
    amount: "0",
    tax_amount: "0", // Adjust based on your tax calculation
    total_amount: "0", // Ensure this matches the amount breakdown
    transaction_uuid: "", // Use the generated order ID as the transaction ID
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `/esewapaymentsuccess`,
    failure_url: `/paymentfailed`,
    signed_field_names: "total_amount,transaction_uuid,product_code",

    signature: "",
    secret: "8gBm/:&EnhH.1/q", // Use your secret key from eSewa
  });
  const [checkoutCartList, setcheckoutCartList] = useState([]);
  const uid = query ? query.get("uid") : null;
  const [profileDataObject, setprofileDataObject] = useState({
    uid,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Nepal",
  });
  async function getProfileData() {
    setloading(true);
    const { data: resData } = await axios.post("api/users/getprofiledata", {
      uid,
    });
    if (resData.statusCode == 200) {
      const { uid, firstName, lastName, email, phone, address, city } =
        resData.profileData;
      setprofileDataObject({
        uid,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        country: "Nepal",
      });
    }
    setloading(false);
  }
  // generate signature
  const generateSignature = (
    total_amount: any,
    transaction_uuid: any,
    product_code: any,
    secret: any
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

  // main submit function
  async function submit(data: any) {
    let country = "Nepal";
    const { firstName, lastName, email, phone, address, city } = data;

    // checkoutCartList and finalTotal available here
    const { data: resData }: any = await axios.post(`api/order`, {
      uid,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      finalTotal,
      paymentmethod,
      checkoutCartList,
    });
    // order added to database successfull
    if (resData.statusCode == 200) {
      console.log("order placed: ", resData);
      // get order id
      const orderId = resData.savedNewOrder._id;

      // cash on delivery
      if (paymentmethod == "cod") {
        router.push(`/paymentsuccess?oid=${orderId}&t=${finalTotal}`);
        return;
      }
      // esewa code start in submit function
      // generate signature and update state
      const hashedSignature = generateSignature(
        finalTotal,
        orderId,
        formData.product_code,
        formData.secret
      );
      // create a new updated form data
      const updatedFormData = {
        ...formData,
        transaction_uuid: orderId,
        signature: hashedSignature,
        amount: String(finalTotal),
        total_amount: String(finalTotal),
      };
      // console.log("final updated form", updatedFormData);

      // crate a form element and submit it to esewa endpoint
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.npapi/epay/main/v2/form";
      // form.target = "_blank"; // Open in a new tab

      Object.keys(updatedFormData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = updatedFormData[key];
        form.appendChild(input);
      });
      // console.log(form);

      document.body.appendChild(form);
      form.submit();
    } else {
      console.log("failed to add order", resData);
    }
  }

  // pull cart items
  async function pullCartItems(userid: string) {
    // console.log(userid);

    const { data: resData }: any = await axios.post(
      `api/products/getcartitems`,
      {
        msg: "sending user id",
        userId: userid,
      }
    );
    // console.log(resData.cartItemsList);
    setcheckoutCartList(resData.cartItemsList);
    console.log(resData.msg);
  }
  useEffect(() => {
    getProfileData();
    if (uid) {
      pullCartItems(uid); // Pass userid as a parameter
    }
  }, [uid]);

  // caclulate price
  useEffect(() => {
    let subtotal = 0;
    checkoutCartList.map((eachItem: any) => {
      subtotal += eachItem.quantity * eachItem.price;
      settotal(subtotal);
    });
    let tempVAT = (13 / 100) * subtotal;
    setVAT(Math.floor(tempVAT));
    setfinalTotal(Math.floor(subtotal + tempVAT));
  }, [checkoutCartList]);

  return (
    <div className="w-[80%] mt-10 mx-auto flex">
      <form
        onSubmit={handleSubmit(submit)}
        // action="https://rc-epay.esewa.com.npapi/epay/main/v2/form"
        // method="POST"
        // target="_blank"
        className="w-[100%] flex"
      >
        <ContactInformation
          profileDataObject={profileDataObject}
          register={register}
          errors={errors}
          reset={reset}
          setValue={setValue}
          loading={loading}
          paymentmethod={paymentmethod}
          setpaymentmethod={setpaymentmethod}
        />
      </form>
      <OrderSummary
        uid={uid}
        checkoutCartList={checkoutCartList}
        total={total}
        VAT={VAT}
        finalTotal={finalTotal}
        loading={loading}
      />
    </div>
  );
};

export default Checkout;
