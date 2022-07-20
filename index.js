import React from "react";
import { useEffect, useState } from "react";

const numberRegex = /[^0-9]/g;
const replaceString = (str, replacer) =>
  typeof str === "string" ? str.replace(replacer, "") : "";
const numberFilter = (str) => replaceString(str, numberRegex);

const SecondRegistrationNumber = (props) => {
  const MASK_WORD = "$";
  const maskWordRegex = new RegExp(`[^${MASK_WORD}]`);
  const replaceAllToMaskWord = (str) => {
    return str.replace(/./gi, MASK_WORD);
  };
  const [realNumber, setRealNumber] = useState("");
  const [fakeNumber, setFakeNumber] = useState("");

  const resetValue = () => {
    setRealNumber("");
    setFakeNumber("");
  };

  const setValue = (newRealNumber) => {
    setRealNumber(newRealNumber);
    setFakeNumber(replaceAllToMaskWord(newRealNumber));
  };

  const handleChangeRealNumber = () => {};

  const handleChangeFakeNumber = (e) => {
    const originalValue = e.target.value;
    const filteredValue = numberFilter(originalValue);

    // 중간에서 입력했다면 초기화
    if (e.target.selectionStart !== e.target.value.length) {
      return resetValue();
    }
    // 글자수가 같다면 초기화
    if (originalValue.length === realNumber.length) {
      return resetValue();
    }
    // 새롭게 입력한 경우
    if (originalValue.length > realNumber.length) {
      const newPutedWord = originalValue.slice(originalValue.length - 1); // 새로 입력된 글자
      const beforePutedWords = originalValue.slice(0, originalValue.length - 1); // 이전 마스크 처리된 글자

      // 새로 들어온 숫자 값이 한 글자가 아니라면 초기화
      if (filteredValue.length !== 1) {
        return resetValue();
      }
      // 숫자가 아닌 값이 마지막으로 들어왔다면 초기화
      if (filteredValue !== newPutedWord) {
        return resetValue();
      }
      // 리얼값과 한글자 이상 차이나는 경우 초기화
      if (originalValue.length !== realNumber.length + 1) {
        return resetValue();
      }
      // 이전 마스크 값에 MASK_WORD 이외의 값이 있는 경우 초기화
      if (maskWordRegex.test(beforePutedWords)) {
        return resetValue();
      }
      const newRealNumber = `${realNumber}${newPutedWord}`;
      return setValue(newRealNumber);
    }
    // 지운 경우
    if (originalValue.length < realNumber.length) {
      // 한 글자이상 삭제된 경우
      if (originalValue.length !== realNumber.length - 1) {
        return resetValue();
      }
      const newRealNumber = realNumber.slice(0, originalValue.length);
      return setValue(newRealNumber);
    }
  };

  return (
    <>
      <input type="text" value={realNumber} onChange={handleChangeRealNumber} />
      <input type="text" value={fakeNumber} onChange={handleChangeFakeNumber} />
    </>
  );
};

export default SecondRegistrationNumber;
