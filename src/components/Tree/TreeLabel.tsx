/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IconType } from "react-icons";

export type TreeLabelProps = {
  iconType?: IconType;
  text: string;
};

type Props = {
  isChecked?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleCheck?: () => void;
  onDragStart: () => void;
} & TreeLabelProps;

const TreeLabel = ({
  iconType,
  text,
  isChecked,
  isSelected,
  onSelect,
  onToggleCheck,
  onDragStart
}: Props) => {

  return (
    <div css={style.container}>
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
      <span
        css={style.label(isSelected)}
        draggable={true}
        onClick={onSelect}
        onDragStart={onDragStart}
        onDragOver={(e) => e.preventDefault()}
      >
        {text}
      </span>
    </div>
  );
};

export default TreeLabel;

const style = {
  container: css({
    display: 'flex',
    gap: '.5rem'
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
  label: (isSelected: boolean) => css({
    userSelect: 'none',
    backgroundColor: isSelected ? 'limegreen' : undefined,
    borderRadius: '.25rem',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: isSelected ? undefined : 'palegreen'
    }
  })
};
