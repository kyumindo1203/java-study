
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


- **문제 발생**
Access to fetch at 'https://miniature-space-engine-9wwjw6pq7jvc9v9v-8080.app.github.dev/api/auth/login' from origin 'https://miniature-space-engine-9wwjw6pq7jvc9v9v-5173.app.github.dev' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
App.jsx:29  POST https://miniature-space-engine-9wwjw6pq7jvc9v9v-8080.app.github.dev/api/auth/login net::ERR_FAILED
라는 에러가 떴음..

- 지피티는 포트가 다른 서버가 API요청을 하면 보안상의 이유로 백엔드 서버에서 막는다고 하던데, 그걸 고치기 위해서
1. 일단 @CrossOrigin(origins = "https://miniature-space-engine-9wwjw6pq7jvc9v9v-5173.app.github.dev") 어노테이션을 붙여줘서 브라우저에서 HTTP 요청 보내기전 자동으로 보내는 OPTION이라는 메서드의 요청을 보고 백엔드에서 예외적으로 허용을 한다... 라는 느낌의 솔루션을 시험해봄.
- 개같이 실패
2. **해결** : 알고보니 다른 문제였음. github codespace를 통해 개발 중인데, 깃허브 tunnel이 외부 사용자로부터 접속을 차단했기 때문에 (Private 환경이었음) localhost:8080이 다른 사용자인 localhost:5173을 인식조차 못하고 github tunnel 수준에서 막혀버린 것이 원인이 되었다.
그러니까 순서가 깃허브의 private 인증된 브라우저 -> 코드스페이스 -> 5173으로의 tunnel(private 인증됨) -> 클라이언트가 5173으로 변경(fetch로 인해) -> 코드스페이스 -> 8080으로의 tunnel(인증 실패, 여기서 막혀서 401오류 뜬거임) -> 만약 public이어서 성공했다면 -> 8080의 CrossOrigin 필터(?) -> ... 이런 느낌이지 않을까 짐작중.

- **또 알게 된 것**
- 프론트앤드에서 fetch()를 할 때 만약 origin(schma, ip, port)가 Client와 Server이 다르다면 브라우저에서 CORS요청을 추가로 보낸다.
- HTTP OPTION 메서드를 통해 CORS요청 (<- 이걸 perflight요청 이라고함 )을 fetch()의 HTTP (GET/Post/PUT/PATCH/DELETE)전에 받은 백엔드에서 CORS요청 헤더를 분석한다.
- 분석 후 요청 별로 내부에서 처리한 CORS응답을 클라이언트로 보내고, 클라이언트인 브라우저에서 CORS에러를 띄우면 fetch()는 block되게 된다. -> 정확히는 브라우저가 fetch()에 응답을 전달하지 않는다.