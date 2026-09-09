public class UserResponse {
    private final ResultCodes resultCode;
    private final User user;
    private final String message; //이거 잘하면 다른 계층에서 처리 할  수도
    public UserResponse(ResultCodes rc, User u, String m){
        this.resultCode = rc;
        this.user = u;
        this.message = m;
    }

    public UserResponse(ResultCodes rc, User u){
        this.resultCode = rc;
        this.user = u;
        this.message = "";
    }

    public User getUser(){
        return this.user;
    }

    public ResultCodes getResultCodes(){
        return this.resultCode;
    }

    public String getMessage(){
        return this.message;
    }
}
