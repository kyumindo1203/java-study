import { useState } from 'react';
import '../App.css';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    affiliation: '0',
    rank: '0',
    password: '',
    confirmPassword: '',
  });

  const rankList = 
    ['이등병', '일등병', '상등병', '병장', '하사', '중사', '상사', '원사', '준위', '소위', '중위', '대위'].map((i, index)=>{
      return({
        id : index,
        name : i
      })
    });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm ={
      ...form,
      [name]: value,
    }
    console.log(nextForm)
    setForm(nextForm);
  };

  async const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호와 비밀번호 재입력이 일치하지 않습니다.');
      return;
    }
    else{
      try {
        const response = await fetch("https://miniature-space-engine-9wwjw6pq7jvc9v9v-8080.app.github.dev/api/users",{
        method : 'POST',
        header : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(form)
      })
      } catch (error) {
        
      }

      console.log('회원가입 데이터:', form);
      alert('회원가입 요청이 접수되었습니다.');
    }


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
                <select name="affiliation" className="text-input" onChange = {handleChange}>
                  <option className="text-input" value = "0">육군</option>
                  <option className="text-input" value = "1">해군</option>
                  <option className="text-input" value = "2">공군</option>
                </select>
              </label>

              <label className="input-group">
                <span className="input-label">계급</span>
                <select name="rank" className="text-input" onChange = {handleChange}>
                  {
                    rankList.map((i)=>{
                      return(
                       <option value={i.id} key = {i.id}>{i.name}</option>
                      )
                    })
                  }
                </select>

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
