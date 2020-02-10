import numeral from "numeral";

export const toNumber = (value: string) => numeral(value)["value"]() || 0;

export const toCash = (value: string) => numeral(value)["format"]("0,0");

export const toPhoneNumber = (value: string) =>
  (value || "")
    .replace(/[^0-9]/g, "")
    .replace(
      /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})/,
      `$1-$2-$3`
    );
