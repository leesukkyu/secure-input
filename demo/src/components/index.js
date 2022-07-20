import React from "react";
import { useEffect, useState } from "react";

const SecondRegistrationNumber = ({maskCharacter}) => {
  const MASK_WORD = maskCharacter || '$';
  const maskWordRegex = new RegExp(`[^${MASK_WORD}]`);
  const replaceAllToMaskWord = (str) => {
    return str.replace(/./gi, MASK_WORD);
  };
  const [realStr, setRealStr] = useState("");
  const [fakeStr, setFakeStr] = useState("");

  const resetValue = () => {
    setRealStr("");
    setFakeStr("");
  };

  const setValue = (newRealStr) => {
    setRealStr(newRealStr);
    setFakeStr(replaceAllToMaskWord(newRealStr));
  };

  const handleChangeFakeNumber = (e) => {
    const originalValue = e.target.value;

    // 중간에서 입력했다면 초기화
    if (e.target.selectionStart !== e.target.value.length) {
      return resetValue();
    }
    // 글자수가 같다면 초기화
    if (originalValue.length === realStr.length) {
      return resetValue();
    }
    // 새롭게 입력한 경우
    if (originalValue.length > realStr.length) {
      const newPutedWord = originalValue.slice(originalValue.length - 1); // 새로 입력된 글자
      const beforePutedWords = originalValue.slice(0, originalValue.length - 1); // 이전 마스크 처리된 글자

      // 리얼값과 한글자 이상 차이나는 경우 초기화
      if (originalValue.length !== realStr.length + 1) {
        return resetValue();
      }
      // 이전 마스크 값에 MASK_WORD 이외의 값이 있는 경우 초기화
      if (maskWordRegex.test(beforePutedWords)) {
        return resetValue();
      }
      const newRealStr = `${realStr}${newPutedWord}`;
      return setValue(newRealStr);
    }
    // 지운 경우
    if (originalValue.length < realStr.length) {
      // 한 글자이상 삭제된 경우
      if (originalValue.length !== realStr.length - 1) {
        return resetValue();
      }
      const newRealStr = realStr.slice(0, originalValue.length);
      return setValue(newRealStr);
    }
  };

  console.log(realStr)

  return (
    <>
      <input type="text" value={fakeStr} onChange={handleChangeFakeNumber} />
    </>
  );
};

export default SecondRegistrationNumber;
