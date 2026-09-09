import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class User {
    private String serviceNumber; //군번 형식 : YY-XXXXXXXX
    private String pwd;
    private String branch; //소속 : 육/해/공
    private String rank; //계급 : 이병/ 일병/상사 /...
    private LocalDate dateOfBirth;

    public User(String s, String p, String b, String r, String d){
        this.serviceNumber = s;
        this.pwd = p;
        this.branch = b;
        this.rank = r;
        this.dateOfBirth = toLocalDate(d);
    }
    public User(){
    }


    public String getPwd(){
        return this.pwd;
    }

    private LocalDate toLocalDate(String d){
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(d, df);
    }
    
    
}
