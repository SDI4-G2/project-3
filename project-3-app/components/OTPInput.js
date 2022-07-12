import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const OTPInputSection = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const OTPInputContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const OTPInputOne = styled.View`
  border-color: rgba(154, 152, 205, 0.2);
  min-width: 16%;
  border-width: 1px;
  border-radius: 30px;
  padding: 9px;

  background-color: rgba(154, 152, 205, 0.1);
`;

export const OTPInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
`;

export const OTPInputFocused = styled(OTPInputOne)`
  border-color: rgba(154, 152, 205, 0.4);
  background-color: rgba(154, 152, 205, 0.2);
`;

const OTPInput = ({ setPinReady, code, setCode, maxLength }) => {
  const codeDigitsArray = new Array(maxLength).fill(0);

  const textInputRef = useRef(null);

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = "";
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInputOne;

    return (
      <StyledOTPInput>
        <OTPInputText key={index}>{digit}</OTPInputText>
      </StyledOTPInput>
    );
  };

  return (
    <OTPInputSection>
      <OTPInputContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </OTPInputContainer>
      <HiddenTextInput
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        autoFocus={true}
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </OTPInputSection>
  );
};

export default OTPInput;
