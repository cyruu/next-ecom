const generateSignature = (checkoutFormData: any) => {
  const { total_amount, transaction_uuid, product_code, secret } =
    checkoutFormData;
  const hash = CryptoJS.HmacSHA256(
    `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
    secret
  );
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  console.log("hash signature: ", hashInBase64);

  //   setFormData((prev) => ({ ...prev, signature: hashInBase64 }));
};
