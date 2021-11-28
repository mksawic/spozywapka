import { useState } from "react";

const usePriceValidation = () => {
  const [isPriceValid, setIsPriceValid] = useState(true);

  const validatePrice = (price) => {
    const value = Number(price);

    setIsPriceValid(
      !isNaN(value) && value > 0 && /^[0-9]*(\.[0-9]{0,2})?$/.test(price)
    );
  };

  return [isPriceValid, validatePrice];
};

export default usePriceValidation;
