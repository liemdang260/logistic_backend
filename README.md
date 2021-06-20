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
/auth/login

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
/auth/refresh
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

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
+Lấy tất cả order của user nào đó
/order
GET
headers:
{
	"x_authorization":"access token"
}

-------------------------------------------------------------------------------
+Tạo một order mới
/order/create
POST
headers:
{
	"x_authorization":"access token"
}

body:
{
    "order":{
        "chieucao": "aaa",
        "cannang": 2.5,
        "diachidi": "fdfsd",
        "diachiden": "sdfs",
        "loaigiaohang": "1",
        "loaidonhang": "1",
        "phi": "250000.00"
    }
    
}

-------------------------------------------------------------------------------
+xóa 1 order bằng id
/order/id
vd:/order/13

DELETE
headers:
{
	"x_authorization":"access token"
}

