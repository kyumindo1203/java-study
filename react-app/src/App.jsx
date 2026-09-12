import { useState } from 'react'
import './App.css'

function App() {
  // React state로 입력값과 체크박스 상태를 관리합니다.
  const [serviceNumber, setServiceNumber] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  // 로그인 폼 제출 이벤트 핸들러입니다.
  // event.preventDefault()로 브라우저 기본 submit 동작을 막고,
  // 그 다음 fetch를 통해 백엔드의 로그인 API로 JSON 데이터를 보냅니다.
  const handleSubmit = async (event) => {
    event.preventDefault()

    // 서버로 보낼 데이터 객체입니다.
    // serviceNumber는 사용자가 입력한 군번,
    // password는 비밀번호,
    // remember는 체크박스 유지 여부입니다.
    const loginPayload = {
      serviceNumber,
      password,
      remember,
    }

    // 백엔드 URL은 Java 서버 혹은 Spring 서버의 로그인 엔드포인트 경로로 맞춰야 합니다.
    // 예시: http://localhost:8080/api/login
    // 실제 프로젝트의 서버 포트와 Controller 매핑 방식에 맞춰 변경하면 됩니다.
    try {
      const response = await fetch('http://localhost:5173/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      })

      // HTTP 응답이 정상인지 확인합니다.
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`)
      }

      // 백엔드가 JSON 형태로 응답했을 때 읽어옵니다.
      const result = await response.json()
      console.log('로그인 성공 응답:', result)
    } catch (error) {
      // 네트워크 문제나 서버 오류가 발생하면 여기서 처리합니다.
      console.error('로그인 요청 중 오류 발생:', error)
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="login-card__left">
          <div className="brand-wrap">
            <span className="brand-mark">
              <span className="brand-mark__inner">S</span>
            </span>
            <span className="brand-name">StudyBoard</span>
          </div>

          <div className="login-copy">
            <span className="login-copy__label">Welcome back</span>
            <h1>로그인</h1>
            <p>학습 관리 시스템에 다시 오신 것을 환영합니다.</p>
          </div>

          <div className="login-feature">
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>학습 진도 확인</span>
            </div>
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>개인별 과제 관리</span>
            </div>
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>실시간 알림</span>
            </div>
          </div>
        </div>

        <div className="login-card__right">
          <div className="login-panel">
            <div className="login-panel__header">
              <span className="login-panel__kicker">Account Access</span>
              <h2>Sign In</h2>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="input-group">
                <span className="input-label">군번</span>
                <input
                  type="text"
                  className="text-input"
                  placeholder="25-XXXXXXXX"
                  value={serviceNumber}
                  onChange={(event) => {
                    setServiceNumber(event.target.value)
                  }}
                />
              </label>

              <label className="input-group">
                <span className="input-label">비밀번호</span>
                <input
                  type="password"
                  className="text-input"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <div className="login-options">
                <label className="remember-row">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                  />
                  <span>로그인 상태 유지</span>
                </label>
                <a className="forgot-link" href="#">비밀번호 찾기</a>
              </div>

              <button type="submit" className="login-button">
                로그인
              </button>
            </form>

            <div className="divider">
              <span>또는</span>
            </div>

            <button type="button" className="guest-button">
              학습자 체험 시작
            </button>

            <p className="signup-text">
              아직 계정이 없으신가요?
              <a href="#">회원가입</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
