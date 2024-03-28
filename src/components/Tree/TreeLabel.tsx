/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { EditInfo } from "./Tree";

export type TreeLabelProps = {
  iconType?: IconType;
  text: string;
};

type Props = {
  nodeId: string;
  isChecked?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleCheck?: () => void;
  onDragStart: () => void;
  onClick: () => void;
  editInfo: EditInfo;
  onEdit: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
} & TreeLabelProps;

const TreeLabel = ({
  nodeId,
  iconType,
  text,
  isChecked,
  isSelected,
  onSelect,
  onToggleCheck,
  onDragStart,
  onClick,
  editInfo,
  onEdit,
  onKeyDown
}: Props) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, [editInfo.id]);

  const handleClick = () => {

    if (!isSelected) {
      onSelect();
      return;
    }

    onClick();
  };

  return (
    <div css={style.container(isSelected)} onClick={handleClick}>
      {typeof isChecked === 'boolean' &&
        <div
          css={style.areaCheckbox}
          onClick={onToggleCheck}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type='checkbox'
            css={style.checkbox}
            checked={isChecked}
            onChange={(e) => {
              e.stopPropagation();
              onToggleCheck && onToggleCheck();
            }}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
      }
      {iconType && iconType({ size: '1.5rem' })}
      {editInfo.id === nodeId
        ? <input
            css={style.input}
            type='text'
            value={editInfo.text}
            onClick={(e) => e.stopPropagation()}
            onChange={onEdit}
            onKeyDown={onKeyDown}
            ref={inputRef}
          />
        : <span
            css={style.label}
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={(e) => e.preventDefault()}
          >
            {text}
          </span>
      }
    </div>
  );
};

export default TreeLabel;

const style = {
  container: (isSelected: boolean) =>  css({
    display: 'flex',
    gap: '.5rem',
    flexGrow: '1',
    backgroundColor: isSelected ? 'palegreen' : 'undefined'
  }),
  areaCheckbox: css({
    width: '1.5rem',
    height: '1.5rem'
  }),
  checkbox: css({
    all: 'unset',
    width: '1.5rem',
    height: '1.5rem',
    border: '2px solid black',
    boxSizing: 'border-box',
    transition: 'transform .1s',
    ':checked': {
      width: '1.25rem',
      height: '.75rem',
      border: '2px solid limegreen',
      borderTop: 'none',
      borderRight: 'none',
      transform: 'rotate(-45deg)'
    }
  }),
  input: css({
    all: 'unset'
  }),
  label: css({
    userSelect: 'none',
    borderRadius: '.25rem',
    minWidth: '1.5rem',
    height: '1.5rem',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'palegreen'
    }
  })
};
