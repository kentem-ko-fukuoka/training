import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Body from "./Body";

const Calendar = () => {

  const [date, setDate] = useState(new Date());

  const jumpMonth = (operation: 'prev' | 'next' | 'this') => {

    if (operation === 'this') {
      setDate(new Date());
      return;
    }

    setDate((month) => {

      const jumpMonth = new Date(month);

      if (operation === 'prev') {
        jumpMonth.setMonth(jumpMonth.getMonth() - 1);
        return jumpMonth;
      }

      jumpMonth.setMonth(jumpMonth.getMonth() + 1);
      return jumpMonth;
    });
  }

  return (
    <StyledTable>
      <Header
        date={date}
        onClickLeft={() => jumpMonth('prev')}
        onClickRight={() => jumpMonth('next')}
      />
      <Body date={date} />
      <Footer onClick={() => jumpMonth('this')} />
    </StyledTable>
  );
}

export default Calendar;

const StyledTable = styled.table({
  fontFamily: 'Courier New',
  fontSize: '14px',
  backgroundColor: '#eee',
  'th, td': {
    width: '36px',
    height: '24px'
  }
});
