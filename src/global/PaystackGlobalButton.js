import React from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";

const PaystackGlobalButton = ({ amount, text }) => {
  const currentUser = useSelector((state) => state.oauth.user);

  const publicKey = "pk_test_18f4e3dec75530f3ce059ff055ae8556bfead856";

  const componentProps = {
    email: currentUser?.email || "vickblog.com@gmail.com",
    amount,
    metadata: {
      name: currentUser?.fullname || "Victor",
      phone: currentUser?.phone_num || "090865388652",
    },
    publicKey,
    text,

    onSuccess: (res) => {
      alert("Thanks for doing business with us! Come back soon!!");
      console.log(res);
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackGlobalButton;
