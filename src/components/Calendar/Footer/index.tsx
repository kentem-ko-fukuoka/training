import styled from "styled-components";

type Props = {
  onClick: () => void;
}

const Footer = ({ onClick }: Props) => {
  return (
    <StyledTFoot onClick={onClick}>
      <tr>
        <td colSpan={7}>Today</td>
      </tr>
    </StyledTFoot>
  );
}

const StyledTFoot = styled.tfoot({
  fontWeight: 'bold',
  textAlign: 'center',
  '&:hover': {
    cursor: 'pointer'
  }
});

export default Footer;
