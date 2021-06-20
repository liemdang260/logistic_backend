# logistic_backend

+ đăng kí tài khoản mới -> tự động tạo khách hàng mới
/auth/register

POST
body :
{
    "user":{
        "userName":"efjff",
        "password":"efjf"
    }
}
-------------------------------------------------------------------------------
+ đăng nhập -> trả về access token dùng để xác thực + 1 đối tượng thông tin user
http://localhost:9999/auth/login
POST
body: 
{
    "user":{
        "userName":"efjff",
        "password":"efjf"
    }
}
------------------------------------------------------------------------------
+refresh access token -> tạo 1 access token mới khi cái cũ hết hạn -> duy trì đăng nhập
POST
headers:
{
	"x_authorization":"access token cũ"
}
body:
{
    "refreshToken":"L7fOe1KDpG9dOqZ9"
}

-----------------------------------------------------------------------------
+lấy thông tin khách hàng
/users/profile
GET
headers:
{
	"x_authorization":"access token"
}

------------------------------------------------------------------------------
+ update thông tin khách hàng
/users/update
POST
headers:
{
	"x_authorization":"access token"
}
body:
{
    "user":{
        "name":"liem",
        "phone":"0000000000",
        "adress":"TPHCM"
    }
}