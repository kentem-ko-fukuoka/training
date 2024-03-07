import styled from "styled-components";
import Button from "../Button";

type Props = {
  className?: string;
  isDisplaySavedMessage: boolean;
  onDelete: () => void;
  onSave: () => void;
  onRestore: () => void;
}

const Footer = ({
  className,
  isDisplaySavedMessage,
  onDelete,
  onSave,
  onRestore
}: Props) => {

  return (
    <StyledDiv className={className}>
      <SavedMessage
        className={isDisplaySavedMessage ? 'is-display' : ''}
      >
        保存しました
      </SavedMessage>
      <StyledButton text='削除' onClick={onDelete} />
      <StyledButton text='保存' onClick={onSave} />
      <StyledButton text='復元' onClick={onRestore} />
    </StyledDiv>
  );
}

export default Footer;

const StyledDiv = styled.div`
  display: flex;
`;

const SavedMessage = styled.p`
  font-size: 14px;
  line-height: 2rem;
  margin: 0;
  margin-right: auto;
  transition: opacity 0.5s;
  opacity: 0;
  &.is-display {
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  &:not(:first-child) {
    margin-left: 4px;
  }
`;