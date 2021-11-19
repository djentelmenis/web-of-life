import getEnumKeys from "./getEnumKeys";

const getEnumValues = <T>(myEnum: T): T[keyof T][] => {
  return getEnumKeys(myEnum).map((key) => myEnum[key as keyof typeof myEnum]);
};

export default getEnumValues;
