import styled from "styled-components";

const MONTH_STRINGS = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fir', 'Sat'] as const;

type Props = {
  date: Date;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const Header = ({ date, onClickLeft, onClickRight }: Props) => {

  const year = (date.getFullYear()).toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return (
    <thead>
      <tr>
        <th>
          <SpinButton onClick={onClickLeft}>
            «
          </SpinButton>
        </th>
        <th colSpan={5}>{`${year}/${month}`}</th>
        <th>
          <SpinButton onClick={onClickRight}>
            »
          </SpinButton>
        </th>
      </tr>
      <tr>
        {MONTH_STRINGS.map((monthString) => {
          return <th>{monthString}</th>
        })}
      </tr>
    </thead>
  );
}

export default Header;

const SpinButton = styled.button({
  all: 'unset',
  '&:hover': {
    cursor: 'pointer'
  }
});
