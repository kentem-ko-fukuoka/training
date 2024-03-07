import styled, { createGlobalStyle } from "styled-components";
import Footer from "./Footer";
import { ChangeEvent, useState } from "react";

const MILLISECONDS_PER_SECOND = 1000;

const IS_DISPLAY_SAVED_MESSAGE_INITIAL = false;
const MEMO_TEXT_INITIAL = '';

const KEY_MEMO_TEXT = 'memo';

const MemoApp = () => {

  const [isDisplaySavedMessage, setIsDisplaySavedMessage] = useState(
    IS_DISPLAY_SAVED_MESSAGE_INITIAL);

  const [memoText, setMemoText] = useState(MEMO_TEXT_INITIAL);

  const handleChangeMemoText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(e.target.value);
  }

  const onDelete = () => {

    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    localStorage.removeItem(KEY_MEMO_TEXT);
    setMemoText(MEMO_TEXT_INITIAL);
  }

  const onSave = () => {

    if (!memoText) {
      return;
    }

    setIsDisplaySavedMessage(true);

    setTimeout(() => {
      setIsDisplaySavedMessage(false);
    }, MILLISECONDS_PER_SECOND);

    localStorage.setItem(KEY_MEMO_TEXT, memoText);
  }

  const onRestore = () => {
    
    const storedMemoText = localStorage.getItem(KEY_MEMO_TEXT);
    
    if (!storedMemoText) {
      return;
    }

    setMemoText(storedMemoText);
  }

  return (
    <>
      <Global />
      <StyledMain>
        <Title>メモ帳</Title>
        <StyledTextarea
          value={memoText}
          onChange={handleChangeMemoText}
        />
        <StyledFooter
          isDisplaySavedMessage={isDisplaySavedMessage}
          onDelete={onDelete}
          onSave={onSave}
          onRestore={onRestore}
        />
      </StyledMain>
    </>
  );
}

export default MemoApp;

const Global = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledMain = styled.main`
  width: 360px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 22px;
  text-align: center;
`;

const StyledTextarea = styled.textarea`
  font-size: 16px;
  vertical-align: bottom;
  width: 100%;
  height: 160px;
  box-sizing: border-box;
  padding: 8px;
  margin-top: 4px;
`;

const StyledFooter = styled(Footer)`
  margin-top: 12px;
`;