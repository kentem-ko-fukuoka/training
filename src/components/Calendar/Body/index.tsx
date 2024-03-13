import styled from "styled-components";
import DateUtil from "../util/dateUtil";

type DateType = 'normal' | 'sunday' | 'saturday';

type DisplayDate = {
  date: number;
  isThisMonth: boolean;
}

type Props = {
  date: Date;
}

const Body = ({ date }: Props) => {

  const displayDays = (() => {

    const days: DisplayDate[] = [];

    const prevMonthLastWeekDayCount = DateUtil.getFirstDay(date);
    let prevMonthLastDate = DateUtil.getPrevMonthLastDate(date);

    for (let i = 0; i < prevMonthLastWeekDayCount; i++) {
      days.unshift({
        date: prevMonthLastDate--,
        isThisMonth: false
      });
    }

    const thisMonthLastDate = DateUtil.getLastDate(date);

    for (let i = 0; i < thisMonthLastDate; i++) {
      days.push({
        date: i + 1,
        isThisMonth: true
      });
    }

    const nextMonthFirstWeekDayCount = DateUtil.DAY_COUNT_PER_WEEK - DateUtil.getLastDay(date) - 1;
    let nextMonthFirstDate = DateUtil.FIRST_DATE_OF_MONTH;

    for (let i = 0; i < nextMonthFirstWeekDayCount; i++) {
      days.push({
        date: nextMonthFirstDate++,
        isThisMonth: false
      });
    }

    return days;
  })();

  const trs = (() => {

    const trs = [];

    let count = 0;

    let tdItems: DisplayDate[] = [];

    while (count < displayDays.length) {

      tdItems.push(displayDays[count++]);

      if (count % DateUtil.DAY_COUNT_PER_WEEK !== 0) {
        continue;
      }

      trs.push(
        <tr key={count}>
          {tdItems.map((tdItem, index) => {

            const now = new Date();

            const isToday =
              (date.getFullYear() === now.getFullYear()) &&
              (date.getMonth() === now.getMonth()) &&
              (tdItem.date === now.getDate());

            return (
              <StyledTd
                $isThisMonth={tdItem.isThisMonth}
                $dateType={index === 0 ?
                  'sunday' : (index === 6 ? 'saturday' : 'normal')}
                $isToday={isToday}
                key={tdItem.date}
              >
                {tdItem.date}
              </StyledTd>
            );
          })}
        </tr>
      );

      tdItems = [];
    }

    return trs;
  })();

  return (
    <StyledTbody>
      {trs}
    </StyledTbody>
  );
}

export default Body;

const StyledTbody = styled.tbody({
  backgroundColor: 'white',
});

const StyledTd = styled.td<{
  $isThisMonth: boolean,
  $dateType: DateType,
  $isToday: boolean
}>`
  opacity: ${(props) => props.$isThisMonth ? '1' : '.4'};
  font-weight: ${(props) => props.$isToday ? 'bold' : 'normal'};
  color: ${(props) => props.$dateType === 'normal' ?
    'black' : (props.$dateType === 'sunday' ? 'red' : 'blue')};
`;
