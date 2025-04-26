import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  width: 800px;
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  margin: 50px auto;
  background-color: white;
  
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모바일 화면에서 너비 조정 */
  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: auto;
    box-shadow: none;
    min-height: 500px;
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
  z-index: 1;
  
  /* 모바일 화면에서 전체 너비 차지 */
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    right: 0;
  }
`;

// 로그인 폼 컨테이너
const SignInContainer = styled(FormContainer)`
  right: 0;
  opacity: ${props => props.isSignUp ? 0 : 1};
  visibility: ${props => props.isSignUp ? 'hidden' : 'visible'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  transition-delay: ${props => props.isSignUp ? '0s' : '0.5s'};
`;

// 회원가입 폼 컨테이너
const SignUpContainer = styled(FormContainer)`
  left: 0;
  opacity: ${props => props.isSignUp ? 1 : 0};
  visibility: ${props => props.isSignUp ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  transition-delay: ${props => props.isSignUp ? '0.5s' : '0s'};
`;

// 초록색 패널
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.isSignUp ? '50%' : '0'};
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 100;
  
  /* 모바일 화면에서 숨김 */
  @media (max-width: 768px) {
    display: none;
  }
`;

const OverlayPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: var(--color-primary);
  overflow: visible;
`;

// SVG 이미지 컴포넌트
const SVGImage = styled.img`
  position: absolute;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  transform: ${props => props.transform || 'none'};
  opacity: ${props => props.opacity || 1};
  z-index: 0;
`;

// 장식용 도형 컴포넌트
const DecorativeShape = styled.div`
  position: absolute;
  width: ${props => props.width || '70%'};
  height: ${props => props.height || '50%'};
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  transform: ${props => props.transform || 'none'};
  background-color: rgba(255, 255, 255, ${props => props.opacity || 0.1});
  border-radius: ${props => props.borderRadius || '10px'};
  z-index: 0;
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${props => props.light ? 'white' : 'var(--color-primary)'};
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.light ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.6)'};
  position: relative;
  z-index: 2;
`;

const Button = styled.button`
  border-radius: 30px;
  border: ${props => props.outline ? '1px solid white' : 'none'};
  background-color: ${props => props.outline ? 'transparent' : 'var(--color-primary)'};
  color: ${props => props.outline ? 'white' : 'white'};
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 10px;
  position: relative;
  z-index: 2;
  
  &:hover {
    opacity: 0.9;
    background-color: ${props => props.outline ? 'rgba(255, 255, 255, 0.2)' : '#00b195'};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SocialIcon = styled.a`
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  color: #333;
  text-decoration: none;
  margin-left: 10px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
`;

const OrText = styled.p`
  margin: 15px 0;
  color: #777;
  font-size: 14px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 5px;
  margin: 8px 0;
  padding: 0 15px;
  
  svg {
    color: #aaa;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  padding: 12px 0;
  width: 100%;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
`;

const RadioInput = styled.input`
  margin-right: 6px;
  accent-color: var(--color-submit-btn);
`;

const ForgotPassword = styled.a`
  text-decoration: none;
  color: #777;
  font-size: 12px;
  margin: 15px 0;
  align-self: flex-end;
  
  &:hover {
    color: var(--color-primary);
  }
`;

// 로고 컴포넌트
const Logo = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; 
  position: relative; 
  
  img {
    width: 120px;
    height: auto;
  }
`;

// 모바일에서만 보이는 모드 전환 버튼
const MobileToggle = styled.button`
  display: none;
  margin-top: 20px;
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &:hover {
    background-color: rgba(0, 203, 164, 0.1);
  }
`;

// Main Component
const AuthForm = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('employee');
  
  // 폼 상태 관리
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // 모드 전환 함수
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };
  
  // 사용자 타입 변경 핸들러
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  
  // 로그인 폼 제출 핸들러
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', loginData);

    if (onLogin) {
      onLogin(userType);  // 로그인 버튼 눌렀을 때 이동
    }
  };

  // 회원가입 폼 제출 핸들러
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 시도:', signupData);

    if (onLogin) {
      onLogin(userType);  // 회원가입 버튼 눌렀을 때도 이동
    }
  };
  
  // 입력 필드 변경 핸들러 - 로그인
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  
  // 입력 필드 변경 핸들러 - 회원가입
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  return (
    <Container>
      {/* 초록색 패널 - 왼쪽/오른쪽으로 이동 (모바일에서는 숨김) */}
      <OverlayContainer isSignUp={isSignUp}>
        <OverlayPanel>
        <SVGImage src="/shape1.svg" width="700px" top="-120px" left="-300px" style={{ transform: "rotate(0)" }} />
        <SVGImage src="/shape2.svg" width="700px" top="-100px" left="-450px" style={{ transform: "rotate(0)" }} />
        <SVGImage src="/circle.svg" width="200px" bottom="-90px" left="-100px" />
          <Logo>
            <img src="/logo.svg" alt="Green Salary Logo" />
          </Logo>
          
          {isSignUp ? (
            <>
              <Title light>Welcome Back!</Title>
              <Subtitle light>
                로그인하고 Green Salary 서비스를<br />
                바로 시작하세요.
              </Subtitle>
              <Button outline onClick={toggleMode}>
                SIGN IN
              </Button>
            </>
          ) : (
            <>
              <Title light>Welcome</Title>
              <Subtitle light>
                Green Salary는 블록체인과 에스크로를 통해<br />
                근로자의 근무시간을 정확히 기록하고<br />
                고용주와 근로자 간 투명한 임금 지급을 보장합니다.
              </Subtitle>
              <Button outline onClick={toggleMode}>
                SIGN UP
              </Button>
            </>
          )}
        </OverlayPanel>
      </OverlayContainer>

      {/* 로그인 폼 */}
      <SignInContainer isSignUp={isSignUp}>
        <Form onSubmit={handleLoginSubmit}>
          <Title>Sign In</Title>
          
          <RadioGroup>
            <RadioLabel>
              <RadioInput 
                type="radio" 
                name="userType" 
                value="employer"
                checked={userType === 'employer'} 
                onChange={handleUserTypeChange}
              />
              고용주
            </RadioLabel>
            <RadioLabel>
              <RadioInput 
                type="radio" 
                name="userType" 
                value="store"
                checked={userType === 'store'} 
                onChange={handleUserTypeChange}
              />
              매장
            </RadioLabel>
            <RadioLabel>
              <RadioInput 
                type="radio" 
                name="userType" 
                value="employee"
                checked={userType === 'employee'} 
                onChange={handleUserTypeChange}
              />
              근로자
            </RadioLabel>
          </RadioGroup>
          
          <InputContainer>
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 4.5C0.5 3.39543 1.39543 2.5 2.5 2.5H12.5C13.6046 2.5 14.5 3.39543 14.5 4.5V10.5C14.5 11.6046 13.6046 12.5 12.5 12.5H2.5C1.39543 12.5 0.5 11.6046 0.5 10.5V4.5Z" stroke="currentColor"/>
                <path d="M0.5 4.5L7.5 8.5L14.5 4.5" stroke="currentColor"/>
              </svg>
              <Input 
                name="email" 
                placeholder="Email" 
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </InputGroup>
            
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6.5V4.5C4.5 2.84315 5.84315 1.5 7.5 1.5C9.15685 1.5 10.5 2.84315 10.5 4.5V6.5M4.5 6.5H10.5M4.5 6.5H2.5V13.5H12.5V6.5H10.5" stroke="currentColor"/>
              </svg>
              <Input 
                name="password" 
                placeholder="Password" 
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </InputGroup>
          </InputContainer>
          
          {/* <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword> */}
          
          <ButtonContainer>
            <Button type="submit">SIGN IN</Button>
            <SocialIcon href="#">
              <span>G+</span>
            </SocialIcon>
          </ButtonContainer>
          
          {/* 모바일에서만 보이는 회원가입 전환 버튼 */}
          <MobileToggle type="button" onClick={toggleMode}>
            계정이 없으신가요? 회원가입
          </MobileToggle>
        </Form>
      </SignInContainer>

      {/* 회원가입 폼 */}
      <SignUpContainer isSignUp={isSignUp}>
        <Form onSubmit={handleSignupSubmit}>
          <Title>Create Account</Title>
          
          <RadioGroup>
            <RadioLabel>
              <RadioInput 
                type="radio" 
                name="userType" 
                value="employer"
                checked={userType === 'employer'} 
                onChange={handleUserTypeChange}
              />
              고용주
            </RadioLabel>
            <RadioLabel>
              <RadioInput 
                type="radio" 
                name="userType" 
                value="employee"
                checked={userType === 'employee'} 
                onChange={handleUserTypeChange}
              />
              근로자
            </RadioLabel>
          </RadioGroup>
          
          <InputContainer>
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.20284C2.52216 10.0266 2.02502 11.1315 2.02502 12.375V14.125H12.975V12.375C12.975 11.1315 12.4779 10.0266 11.496 9.20284C10.7245 8.55134 9.7003 8.12901 8.50626 7.98351C10.0188 7.54738 11.125 6.15288 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875Z" stroke="currentColor"/>
              </svg>
              <Input 
                name="name" 
                placeholder="Name"
                value={signupData.name}
                onChange={handleSignupChange}
              />
            </InputGroup>
            
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 4.5C0.5 3.39543 1.39543 2.5 2.5 2.5H12.5C13.6046 2.5 14.5 3.39543 14.5 4.5V10.5C14.5 11.6046 13.6046 12.5 12.5 12.5H2.5C1.39543 12.5 0.5 11.6046 0.5 10.5V4.5Z" stroke="currentColor"/>
                <path d="M0.5 4.5L7.5 8.5L14.5 4.5" stroke="currentColor"/>
              </svg>
              <Input 
                name="email" 
                placeholder="Email" 
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
            </InputGroup>
            
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6.5V4.5C4.5 2.84315 5.84315 1.5 7.5 1.5C9.15685 1.5 10.5 2.84315 10.5 4.5V6.5M4.5 6.5H10.5M4.5 6.5H2.5V13.5H12.5V6.5H10.5" stroke="currentColor"/>
              </svg>
              <Input 
                name="password" 
                placeholder="Password" 
                type="password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
            </InputGroup>
            
            <InputGroup>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6.5V4.5C4.5 2.84315 5.84315 1.5 7.5 1.5C9.15685 1.5 10.5 2.84315 10.5 4.5V6.5M4.5 6.5H10.5M4.5 6.5H2.5V13.5H12.5V6.5H10.5" stroke="currentColor"/>
              </svg>
              <Input 
                name="passwordCheck" 
                placeholder="Password check" 
                type="password"
                onChange={handleSignupChange}
              />
            </InputGroup>
          </InputContainer>
          
          <ButtonContainer>
            <Button type="submit">SIGN UP</Button>
            <SocialIcon href="#">
              <span>G+</span>
            </SocialIcon>
          </ButtonContainer>
          
          {/* 모바일에서만 보이는 로그인 전환 버튼 */}
          <MobileToggle type="button" onClick={toggleMode}>
            이미 계정이 있으신가요? 로그인
          </MobileToggle>
        </Form>
      </SignUpContainer>
    </Container>
  );
};

export default AuthForm;