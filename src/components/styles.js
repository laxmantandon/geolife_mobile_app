import styled from "styled-components/native";
import { Colors, Fonts, Images } from './contants';


export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  /* width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: black; */
  color: black;
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
  color:red;
`;
export const SplitBoxes = styled.View`
  border-color: #e5e5e5;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
  min-width: 50px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: 'black';
  
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #C2C2CB;
  background-color: #C2C2CB;

`;

export const ButtonContainer = styled.TouchableOpacity`
  // background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;