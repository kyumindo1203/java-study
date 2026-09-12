import { useState } from 'react';
import '../App.css';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    affiliation: '',
    rank: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호와 비밀번호 재입력이 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 데이터:', form);
    alert('회원가입 요청이 접수되었습니다.');
  };

  return (
    <div className="login-page signup-page">
      <section className="login-card signup-card">
        <div className="login-card__left">
          <div className="brand-wrap">
            <span className="brand-mark">
              <span className="brand-mark__inner">S</span>
            </span>
            <span className="brand-name">국방부</span>
          </div>

          <div className="login-copy">
            <span className="login-copy__label">Security Access</span>
            <h1>회원가입</h1>
            <p>국방인사정보체계 계정 생성</p>
          </div>

          <div className="login-feature">
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>신원 확인</span>
            </div>
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>소속 정보 등록</span>
            </div>
            <div className="login-feature__row">
              <span className="feature-icon">✓</span>
              <span>계정 승인 절차</span>
            </div>
          </div>
        </div>

        <div className="login-card__right">
          <div className="login-panel signup-panel">
            <div className="login-panel__header">
              <span className="login-panel__kicker">Create Account</span>
              <h2>Sign Up</h2>
            </div>

            <form className="login-form signup-form" onSubmit={handleSubmit}>
              <label className="input-group">
                <span className="input-label">이름</span>
                <input
                  type="text"
                  className="text-input"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="input-group">
                <span className="input-label">생년월일</span>
                <input
                  type="date"
                  className="text-input"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="input-group">
                <span className="input-label">소속</span>
                <input
                  type="text"
                  className="text-input"
                  name="affiliation"
                  placeholder="예: 제1작전사령부"
                  value={form.affiliation}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="input-group">
                <span className="input-label">계급</span>
                <input
                  type="text"
                  className="text-input"
                  name="rank"
                  placeholder="예: 중령"
                  value={form.rank}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="input-group">
                <span className="input-label">비밀번호</span>
                <input
                  type="password"
                  className="text-input"
                  name="password"
                  placeholder="비밀번호 입력"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="input-group">
                <span className="input-label">비밀번호 재입력</span>
                <input
                  type="password"
                  className="text-input"
                  name="confirmPassword"
                  placeholder="비밀번호 재입력"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" className="login-button sign-button">
                회원가입
              </button>
            </form>

            <p className="signup-text">
              이미 계정이 있으신가요?
              <a href="/login">로그인</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
