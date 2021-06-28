+ đăng kí tài khoản mới -> tự động tạo khách hàng mới
/auth/register

POST
body :
{
    "userName": "khoi@gmail.com",
    "password": "khoi"
}
-------------------------------------------------------------------------------
+ đăng nhập -> trả về access token dùng để xác thực + 1 đối tượng thông tin user
/auth/login

POST
body: 
{
    "userName": "khoi@gmail.com",
    "password": "khoi"
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
    "name": "Bảo",
    "phone": "0000000000",
    "adress": "TPHCM"
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
    "chieucao": "2.5",
    "cannang": 2.5,
    "diachidi": "ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức",
    "diachiden": "122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận",
    "loaigiaohang": "1",
    "loaidonhang": "1",
    "phi": "250000.00",
    "nguoinhan": "liem",
    "sdt": "0000000001"
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
-------------------------------------------------------------------------------
+lấy chi tiết order : lấy order theo id
/order/id
vd: order/2

GET
-------------------------------------------------------------------------------

+lấy order nhận theo mã khách hàng
/order/receive

GET
headers:
{
	"x_authorization":"access token"
}
-------------------------------------------------------------------------------


+Lấy order gửi theo mã khách hàng
/order/send

GET
{
	"x_authorization":"access token"
}
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
+Lấy Tất cả kho hàng
/warehouse

GET

