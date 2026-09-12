
### 26.09.09 로그인/회원가입 구현
- sha256 해시 기능 구현 -> 근데 예외를 어디서 처리 할지 고민 -> login에서 예외 처리 할때 할 예정 => '예기치 못한 에러'로 리턴할듯
- 로그인 예외 처리 -> 군번 존재 X, 틀린 비번 모두 예외가 아니라 결과중 하나임 -> **Enum**으로 결과 코드 만들 예정
- 결과와 결과값을 동시에 리턴하고 싶어서 UserResponse객체를 새로 만듬 -> UserResponse에는 결과 코드, 유저 객체, 결과 메시지 등 로그인에 관한 결과를 다룸
- UserResponse 객체에서 Message는 다른 계층에서 따로 처리할 수도 있어서 생성자 형식을 두개 만들었음.
- 대충 로그인 백앤드 틀은 만든것 같아서 리엑트로 넘어가서 공부할 예정 -> react-app에 리엑트 서버 만듬

### 26.09.10 
- npm run dev해도 
> react-app@0.0.0 dev

> vite

> sh: 1: vite: not found 

로 안되는 현상 => npm install해야함

### 26.09.12
로그인 구현 UI는 AI 에이전트에게 맡김 근데 API설계를 몰라서 공부해야함.
- API예제로 spring boots 사용할 예정
- 우선 api는 api/login처럼 동작으로 작성하는게 아니라 api/user 같은 자원 위주로 작성하는게 좋다고 함.
- 그래서 Server에 spring boots 깔고 기존 Server 코드들은 참고만 하는 식으로 해야겠음.
- ~~아직 Repository DB도 못했어...~~
- 일단 지금은 프론트앤드에서 fetch를 통해 HTTP request 보내는 것 까진 만들었는데 백엔드의 API 주소? 와 매핑? 매칭 하는걸 이해 못하겠음.

gredlew? ㅡ 를 통해 의존성을 추가하는 방식이라고 함
- spring boots는 JSON을 우리가 직접 안만들어도 자동으로 자바 객체를 JSON으로 변환해서 HTTP Response를 보내준다!!
