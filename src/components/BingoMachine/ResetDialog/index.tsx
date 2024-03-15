import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef
} from "react";
import styled from "styled-components";
import Button from "../Button";
import ResetDialogState from "../state/resetDialogState";

type Props = {
  thisState: ResetDialogState;
  setThisState: (
    callbackFnOrNewState:
      | ((prevState: ResetDialogState) => ResetDialogState)
      | ResetDialogState
  ) => void;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
  onReset: () => void;
  onClose: () => void;
};

const ResetDialog = ({
  thisState,
  setThisState,
  onChangePassword,
  onReset,
  onClose
}: Props) => {

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!thisState.isOpen) {
      dialog.close();
      return;
    }

    dialog.showModal();
  }, [thisState.isOpen]);

  const handleClickReset = () => {

    if (thisState.password !== 'KENTEM') {
      setThisState({ ...thisState, isUnmatchPassword: true });
      return;
    };

    onReset();
  }

  const handleMouseDown: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.button === 0) {
      onClose();
    }
  };

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      ref={dialogRef}
      onMouseDown={handleMouseDown}
      onClose={onClose}
    >
      <Content onMouseDown={stopPropagation}>
        <Body>
          <Message>パスワードを入力してください</Message>
          <StyledInput
            type='password'
            value={thisState.password}
            onChange={onChangePassword}
          />
        </Body>
        <Footer>
          <ErrorMessage
            className={thisState.isUnmatchPassword ? 'unmatch-password' : ''}
          >
            パスワードが一致しません
          </ErrorMessage>
          <Button
            text='RESET'
            isDisabled={thisState.password.length === 0}
            onClick={handleClickReset}
          />
          <Button
            text='CANCEL'
            isSecondary={true}
            onClick={onClose}
          />
        </Footer>
      </Content>
    </Dialog>
  );
};

export default ResetDialog;

const Dialog = styled.dialog({
  border: '4px solid #fecc00',
  borderRadius: '.5rem',
  boxSizing: 'border-box',
  outline: 'none',
  width: '25dvw',
  height: '25dvh',
  padding: '0',
  '&:modal': {
    opacity: '1'
  },
  '&::backdrop': {
    backdropFilter: 'blur(10px) brightness(80%)',
  }
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%'
});

const Body = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1'
});

const Message = styled.p({
  width: '15dvw',
});

const StyledInput = styled.input({
  fontSize: '24px',
  border: '4px solid #fecc00',
  borderRadius: '.5rem',
  outline: 'none',
  width: '15dvw',
  height: '3dvh'
});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  padding: '1rem'
});

const ErrorMessage = styled.p({
  display: 'flex',
  alignItems: 'center',
  color: 'red',
  fontWeight: 'bold',
  opacity: '0',
  transition: 'opacity 400ms',
  margin: '0',
  marginRight: 'auto',
  '&.unmatch-password': {
    opacity: '1'
  }
});
