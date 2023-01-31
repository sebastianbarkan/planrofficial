import React from "react";
import styles from "./LocationDropdown.module.css";

interface Props {
  cityData: Object;
  questionCount: number;
  setAnswer: Function;
}

function LocationDropdown({ cityData, questionCount, setAnswer }: Props) {
  const handleSelectOption = (city: string, country: string) => {
    setAnswer(`${city}, ${country}`);
  };
  return (
    <div className={styles.wrapper}>
      {questionCount === 0 && cityData !== undefined ? (
        <div className={styles.dropdownWrap}>
          {cityData.cities.data.map((e, i) => {
            return (
              <div
                className={styles.itemWrap}
                key={e.id}
                onClick={() => handleSelectOption(e.city, e.country)}
              >
                <h1>{e.city}</h1>
                <p>{e.country}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default LocationDropdown;
