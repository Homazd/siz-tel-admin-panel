import styled from "@emotion/styled";
import { Checkbox } from "@mantine/core";

export const StyledCheckbox = styled(Checkbox)`
  & .mantine-Checkbox-label {
    color: red;
    width: 120px;
    margin-left: 10px;
  }
  &. mantine-checkbox-body {
    place-content: center start;
  }
`;
