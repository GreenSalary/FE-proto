import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const ContentSection = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftSection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #F8F9FE;
  border-radius: 15px 0 0 15px;
`;

const HeaderBar = styled.div`
  padding: 1rem 1rem 0 1rem;
  background-color: #F8F9FE;
  text-align: left;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const LeftSectionTop = styled.div`
  padding: 1rem 1rem 1rem;
  background-color: #F8F9FE;
`;

const LeftSectionBottom = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 0 1rem;
  background-color: #F8F9FE;
`;

const RightSection = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  border-radius: 0 15px 15px 0;
`;

const RightSectionEmployees = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 1rem;
  background-color: white;
`;

const RightSectionCalendar = styled.div`
  padding: 1rem;
  background-color: #F5F9F8;
  height: auto;
  border-radius: 20px;
  margin: 0 1rem 1rem 1rem;
  flex-shrink: 0; /* 크기 고정 */
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MonthControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MonthText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const ViewControls = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ViewButton = styled.button`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.active ? '#01D3AC' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const WeekDayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  width: 100%;
  max-width: 670px; // 7 * 90 + 40
  margin-left: auto;
  margin-right: auto;
`;

const DayTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 4rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${props => props.active ? '#01D3AC' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4b5563'};
`;

const DayNumber = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
`;

const DayName = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const EmployeeListItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  gap: 0.25rem;
`;

const EmployeeName = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const EmployeeStatus = styled.div`
  display: flex;
  align-items: center;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.status === "근무중" ? '#01D3AC' : '#ef4444'};
  margin-right: 0.25rem;
`;

const StatusText = styled.span`
  font-size: 0.75rem;
  color: #000000;
`;

const PhoneNumber = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const CalendarDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: ${props => props.active ? '#01D3AC' : 'transparent'};
  color: ${props => props.active ? 'white' : props.disabled ? '#d1d5db' : '#4b5563'};
  
  &:hover {
    background-color: ${props => props.active ? '#01D3AC' : '#f3f4f6'};
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(7, 90px);
  width: fit-content;
  margin: 0 auto;
`;

const TimeCell = styled.div`
  height: 40px;
  border-bottom: 1px solid #e5e7eb;
  border-left: ${props => props.hasLeftBorder ? '1px solid #e5e7eb' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const TimeLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #6b7280;
  height: 40px;
  border-bottom: 1px solid #e5e7eb;
`;

// 날짜 포맷 함수
const formatMonth = (date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

const EmployerHome = () => {
  // 현재 날짜 정보 계산
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today); // 오늘 날짜로 시작
  const [selectedDay, setSelectedDay] = useState(today.getDate()); // 오늘 날짜 선택
  const [calendarSelectedDay, setCalendarSelectedDay] = useState(today.getDate()); // 달력 선택 날짜
  const [activeView, setActiveView] = useState('day');
  const [weekDays, setWeekDays] = useState([]);
  const [monthDays, setMonthDays] = useState([]);

  // 특정 년월의 달력 데이터 생성
  const generateCalendarDays = (year, month, selectedDate) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 해당 월의 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const firstDayOfWeek = firstDay.getDay();
    // 월요일부터 시작하는 달력을 위한 조정
    const emptyDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // 이전 달 마지막 날짜들
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < emptyDays; i++) {
      const day = prevMonthLastDay - emptyDays + i + 1;
      days.push({ 
        day: day, 
        month: 'prev', 
        disabled: true,
        active: false,
        fullDate: new Date(year, month - 1, day)
      });
    }
    
    // 현재 월 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        day: i,
        month: 'current',
        disabled: false,
        active: i === selectedDate,
        fullDate: new Date(year, month, i)
      });
    }
    
    // 다음 달 첫 날짜들
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ 
          day: i, 
          month: 'next', 
          disabled: true,
          active: false,
          fullDate: new Date(year, month + 1, i)
        });
      }
    }
    
    return days;
  };

  // 특정 날짜가 포함된 주 생성
  const generateWeekDays = (date, selectedDate) => {
    // 선택된 날짜의 요일 찾기
    const selectedDay = new Date(date.getFullYear(), date.getMonth(), selectedDate);
    const dayOfWeek = selectedDay.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    
    // 해당 주의 월요일 계산
    const diff = selectedDate - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date.getFullYear(), date.getMonth(), diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      
      days.push({
        date: currentDay.getDate(),
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        fullDate: currentDay,
        month: currentDay.getMonth()
      });
    }
    
    return days;
  };

  // 날짜 변경 시 주간 및 달력 데이터 업데이트
  useEffect(() => {
    // 현재 년월과 선택된 날짜 기준으로 달력 및 주간 데이터 생성
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 주간 데이터 설정
    const weekDaysData = generateWeekDays(currentDate, selectedDay);
    setWeekDays(weekDaysData);
    
    // 달력 데이터 설정
    const calendarDaysData = generateCalendarDays(year, month, calendarSelectedDay);
    setMonthDays(calendarDaysData);
  }, [currentDate, selectedDay, calendarSelectedDay]);
  
  // 근로자 목록 데이터
  const employees = [
    { id: 1, name: "이경규", status: "근무중", phone: "010-1234-1234" },
    { id: 2, name: "유재석", status: "근무중", phone: "010-1234-1234" },
    { id: 3, name: "근로자", status: "출근안함", phone: "010-1234-1234" },
    { id: 4, name: "홍길동", status: "근무중", phone: "010-1234-1234" },
    { id: 5, name: "강호동", status: "출근안함", phone: "010-1234-1234" },
    { id: 6, name: "신입사원", status: "근무중", phone: "010-1234-1234" }
  ];
  
  // 뷰 모드 선택 핸들러
  const handleViewSelect = (view) => {
    setActiveView(view);
  };
  
  // 주간 날짜 선택 핸들러
  const handleDaySelect = (date, month) => {
    // 선택한 날짜가 현재 월이 아닌 경우, 해당 월로 변경
    if (month !== undefined && month !== currentDate.getMonth()) {
      const newDate = new Date(currentDate);
      newDate.setMonth(month);
      setCurrentDate(newDate);
    }
    
    setSelectedDay(date);
    setCalendarSelectedDay(date);
  };
  
  // 월 변경 핸들러
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    
    // 같은 날짜 선택 유지 (단, 월의 마지막 날짜를 초과하는 경우 조정)
    const lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const newSelectedDay = selectedDay > lastDayOfMonth ? lastDayOfMonth : selectedDay;
    setSelectedDay(newSelectedDay);
    setCalendarSelectedDay(newSelectedDay);
  };
  
  // 달력 날짜 클릭 핸들러
  const handleCalendarDayClick = (day) => {
    if (!day.disabled) {
      // 다른 월의 날짜인 경우
      if (day.month !== 'current') {
        const newDate = new Date(day.fullDate);
        setCurrentDate(newDate);
        setSelectedDay(day.day);
        setCalendarSelectedDay(day.day);
      } else {
        setSelectedDay(day.day);
        setCalendarSelectedDay(day.day);
      }
    }
  };
  
  // 시간 범위 생성
  const timeRange = Array.from({ length: 14 }, (_, i) => i + 9); // 9시부터 22시까지
  
  return (
    <Container>
      <MainContent>
        <ContentWrapper>
          <ContentSection>
            {/* 왼쪽 섹션 */}
            <LeftSection>
              {/* 상단 헤더 바 - 가게 이름 */}
              <HeaderBar>
                <HeaderTitle>starbucks</HeaderTitle>
              </HeaderBar>
              
              {/* 왼쪽 상단 - 캘린더 헤더 */}
              <LeftSectionTop>
                <CalendarHeader>
                  <MonthControl>
                    <ChevronLeft size={18} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange('prev')} />
                    <MonthText>{formatMonth(currentDate)}</MonthText>
                    <ChevronRight size={18} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange('next')} />
                  </MonthControl>
                  <ViewControls>
                    <ViewButton active={activeView === 'day'} onClick={() => handleViewSelect('day')}>
                      Day
                    </ViewButton>
                    <ViewButton active={activeView === 'week'} onClick={() => handleViewSelect('week')}>
                      Week
                    </ViewButton>
                    <ViewButton active={activeView === 'month'} onClick={() => handleViewSelect('month')}>
                      Month
                    </ViewButton>
                    <ViewButton active={activeView === 'year'} onClick={() => handleViewSelect('year')}>
                      Year
                    </ViewButton>
                  </ViewControls>
                </CalendarHeader>
                
                {/* 일주일 날짜 탭 */}
                <WeekDayContainer>
                  {weekDays.map((day, index) => (
                    <DayTab
                      key={index}
                      active={day.date === selectedDay && day.month === currentDate.getMonth()}
                      onClick={() => handleDaySelect(day.date, day.month)}
                    >
                      <DayNumber>{day.date}</DayNumber>
                      <DayName>{day.day}</DayName>
                    </DayTab>
                  ))}
                </WeekDayContainer>
              </LeftSectionTop>
              
              {/* 왼쪽 하단 - 시간표 */}
              <LeftSectionBottom>
                <TimeGrid>
                  {/* 시간별 행 */}
                  {timeRange.map(hour => (
                    <React.Fragment key={hour}>
                      <TimeLabel>{hour}</TimeLabel>
                      {weekDays.map((day, index) => (
                        <TimeCell key={index} hasLeftBorder={true}></TimeCell>
                      ))}
                    </React.Fragment>
                  ))}
                </TimeGrid>
              </LeftSectionBottom>
            </LeftSection>
            
            {/* 오른쪽 섹션 */}
            <RightSection>
              {/* 오른쪽 상단 - 근로자 목록 */}
              <RightSectionEmployees>
                {employees.map(employee => (
                  <EmployeeListItem key={employee.id}>
                    <EmployeeName>{employee.name}</EmployeeName>
                    <EmployeeStatus>
                      <StatusDot status={employee.status} />
                      <StatusText>{employee.status}</StatusText>
                    </EmployeeStatus>
                    <PhoneNumber>전화번호: {employee.phone}</PhoneNumber>
                  </EmployeeListItem>
                ))}
              </RightSectionEmployees>
              
              {/* 오른쪽 하단 - 달력 */}
              <RightSectionCalendar>
                <CalendarHeader>
                  <MonthControl>
                    <ChevronLeft size={16} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange('prev')} />
                    <MonthText style={{ fontSize: '0.875rem' }}>{formatMonth(currentDate)}</MonthText>
                    <ChevronRight size={16} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange('next')} />
                  </MonthControl>
                </CalendarHeader>
                
                {/* 요일 헤더 */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(7, 1fr)', 
                  textAlign: 'center',
                  marginBottom: '0.5rem' 
                }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} style={{ fontSize: '0.75rem', color: '#6b7280', padding: '0.25rem 0' }}>
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* 달력 날짜 */}
                <CalendarGrid>
                  {monthDays.map((day, index) => (
                    <CalendarDay
                      key={index}
                      active={day.month === 'current' && day.day === calendarSelectedDay}
                      disabled={day.disabled}
                      onClick={() => handleCalendarDayClick(day)}
                    >
                      {day.day}
                    </CalendarDay>
                  ))}
                </CalendarGrid>
              </RightSectionCalendar>
            </RightSection>
          </ContentSection>
        </ContentWrapper>
      </MainContent>
    </Container>
  );
};

export default EmployerHome;