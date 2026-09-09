import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.lang.StringBuilder;
public class UserManager {
    Map<String, User> userMap;

    public UserManager(){
        this.userMap = new HashMap<>();
    }

    public UserResponse Login(String serviceNumber, String pwd) {
        User u = this.userMap.get(serviceNumber);
        if(u!=null){
            try{
                if(u.getPwd().equals(hashPwd(pwd))){
                    //로그인 성공
                    //return login successed.
                    return new UserResponse(ResultCodes.SUCCESS, u, "로그인 성공");
                }
                else{
                    //비번 틀림
                    //return unvalid password.
                    return new UserResponse(ResultCodes.UNVALID_PWD, u, "비밀번호가 틀렸습니다.");
                }
            } catch(NoSuchAlgorithmException e){
                return new UserResponse(ResultCodes.UNPREDICTED_ERROR, u, "예기치 못한 오류 발생");
            }

        }else{
            //해당 군번 존재 X
            //service number doesn't exsist.
            return new UserResponse(ResultCodes.USER_NOT_FOUND, u, "해당 군번이 존재하지 않습니다.");
        }
    }

    public UserResponse SignUp(String serviceNumber, String unHashedPwd, String name, String dateOfBirth, String branch, String rank){
        try {
            User u = new User(serviceNumber, hashPwd(unHashedPwd),branch,rank, dateOfBirth);
        } catch (Exception e) {
            return new UserResponse(ResultCodes.UNPREDICTED_ERROR, new User(), "예기치 못한 오류 발생");
        }
        return new UserResponse(ResultCodes.SUCCESS, new User(), "회원가입 성공");
    }

    private String hashPwd(String unHashedPwd) throws NoSuchAlgorithmException {
        String HashedPwd = "";
    
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashedByte = md.digest(unHashedPwd.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for(byte b:hashedByte){
            sb.append(b);
        }
        HashedPwd = sb.toString();
    
        return HashedPwd;
    }

}
