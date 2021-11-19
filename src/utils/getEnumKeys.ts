const getEnumKeys = <T>(myEnum: T): string[] => {
  return Object.keys(myEnum).filter(
    (key) => !isNaN(Number(myEnum[key as keyof typeof myEnum]))
  );
};

export default getEnumKeys;
