import styled from "@emotion/styled";
import { TextInput } from "@mantine/core";

const StyledInput = styled(TextInput)`
  & .mantine-TextInput-wrapper {
    text-align: center;
    margin: 0 auto;
  }
  & .mantine-TextInput-input {
    width: 265px;
    @media (min-width: 1024px) {
      width: 550px;
    }
    @media (min-width: 1440px) {
      width: 750px;
    }
  }

`;
export default StyledInput;