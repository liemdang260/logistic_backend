-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2021 at 07:16 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistic`
--

-- --------------------------------------------------------

--
-- Table structure for table `chiphi`
--

CREATE TABLE `chiphi` (
  `machiphi` int(11) NOT NULL,
  `loaigiaohang` int(11) DEFAULT NULL,
  `loaidonhang` int(11) DEFAULT NULL,
  `trongluong` float DEFAULT NULL,
  `khoangcach` float DEFAULT NULL,
  `chiphi` decimal(15,2) DEFAULT NULL,
  `noitinh` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chiphi`
--

INSERT INTO `chiphi` (`machiphi`, `loaigiaohang`, `loaidonhang`, `trongluong`, `khoangcach`, `chiphi`, `noitinh`) VALUES
(1, 3, 1, 50, NULL, '8000.00', 1),
(2, 3, 1, 100, NULL, '8000.00', 1),
(3, 3, 1, 250, NULL, '10000.00', 1),
(4, 3, 1, 500, NULL, '12500.00', 1),
(5, 3, 1, 1000, NULL, '16000.00', 1),
(6, 3, 1, 1500, NULL, '19000.00', 1),
(7, 3, 1, 20000, NULL, '21000.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chitietkho`
--

CREATE TABLE `chitietkho` (
  `machitiet` int(11) NOT NULL,
  `madonhang` int(11) DEFAULT NULL,
  `makho` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` int(11) NOT NULL,
  `TenKH` varchar(255) NOT NULL,
  `SDT` varchar(10) NOT NULL,
  `DiaChi` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `TenKH`, `SDT`, `DiaChi`) VALUES
(13, 'liem', '0000000000', 'TPHCM'),
(15, 'liem', '0000000001', 'fdfsd'),
(18, 'liem', '0000000002', 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức'),
(19, 'liem', '000000001', 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức'),
(24, 'liem', '000000003', 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức'),
(25, 'liem', '000000005', 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức'),
(26, 'bảo', '0000000010', 'TPHCM');

-- --------------------------------------------------------

--
-- Table structure for table `kho`
--

CREATE TABLE `kho` (
  `makho` int(11) NOT NULL,
  `tenkho` varchar(250) NOT NULL,
  `diachi` varchar(250) NOT NULL,
  `tinh` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kho`
--

INSERT INTO `kho` (`makho`, `tenkho`, `diachi`, `tinh`) VALUES
(1, 'Hàm Thuận Bắc', 'Hàm Thuận Bắc, Bình Thuận', 'Bình Thuận'),
(2, 'Hàm Thuận Nam', 'Hàm Thuận Nam, Bình Thuận', 'Bình Thuận'),
(3, 'Bắc Bình', 'Bắc Bình, Bình Thuận', 'Bình Thuận'),
(4, 'Tánh Linh', 'Tánh Linh, Bình Thuận', 'Bình Thuận'),
(5, 'Đức Linh', 'Đức Linh, Bình Thuận', 'Bình Thuận');

-- --------------------------------------------------------

--
-- Table structure for table `loaidonhang`
--

CREATE TABLE `loaidonhang` (
  `maloai` int(11) NOT NULL,
  `tenloai` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaidonhang`
--

INSERT INTO `loaidonhang` (`maloai`, `tenloai`) VALUES
(1, 'tài liệu giấy'),
(2, 'hàng dễ vỡ'),
(3, 'thực phẩm');

-- --------------------------------------------------------

--
-- Table structure for table `loaigiaohang`
--

CREATE TABLE `loaigiaohang` (
  `maloai` int(11) NOT NULL,
  `tenloai` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaigiaohang`
--

INSERT INTO `loaigiaohang` (`maloai`, `tenloai`) VALUES
(1, 'giao hàng tiết kiệm'),
(2, 'giao hàng hỏa tốc'),
(3, 'giao hàng nhanh');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `madonhang` int(11) NOT NULL,
  `makh` int(11) NOT NULL,
  `phi` decimal(15,2) DEFAULT NULL,
  `trangthai` int(4) DEFAULT 1,
  `nguoinhan` int(11) DEFAULT NULL,
  `diachinhan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`madonhang`, `makh`, `phi`, `trangthai`, `nguoinhan`, `diachinhan`) VALUES
(17, 13, '250000.00', 1, 25, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận'),
(18, 13, '250000.00', 1, 25, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận'),
(19, 13, '250000.00', 1, 24, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận'),
(20, 26, '250000.00', 1, 25, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận'),
(21, 26, '250000.00', 1, 24, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận'),
(22, 26, '250000.00', 1, 13, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận');

--
-- Triggers `order`
--
DELIMITER $$
CREATE TRIGGER `DELETEORDER_TRG` BEFORE DELETE ON `order` FOR EACH ROW delete from orderdetail where madonhang = OLD.madonhang
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `mact` int(11) NOT NULL,
  `madonhang` int(11) NOT NULL,
  `chieucao` float DEFAULT NULL,
  `cannang` float DEFAULT NULL,
  `diachidi` varchar(250) DEFAULT NULL,
  `diachiden` varchar(250) DEFAULT NULL,
  `loaidonhang` int(11) DEFAULT NULL,
  `loaigiaohang` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`mact`, `madonhang`, `chieucao`, `cannang`, `diachidi`, `diachiden`, `loaidonhang`, `loaigiaohang`) VALUES
(16, 17, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1),
(17, 18, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1),
(18, 19, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1),
(19, 20, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1),
(20, 21, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1),
(21, 22, 0, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trangthai`
--

CREATE TABLE `trangthai` (
  `matrangthai` int(4) NOT NULL,
  `tentrangthai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trangthai`
--

INSERT INTO `trangthai` (`matrangthai`, `tentrangthai`) VALUES
(1, 'chưa nhận hàng'),
(2, 'đang giao hàng'),
(3, 'đã giao hàng'),
(4, 'đang hoàn trả'),
(5, 'đã hoàn trả');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `madn` int(10) NOT NULL,
  `tendangnhap` varchar(50) NOT NULL,
  `matkhau` text DEFAULT NULL,
  `makh` int(11) DEFAULT NULL,
  `refeshtoken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`madn`, `tendangnhap`, `matkhau`, `makh`, `refeshtoken`) VALUES
(20, 'liem', '$2b$10$WmI8mFZgpnEDe8LNlNH6GuyD1c0dBg33VID4oCS6c76qhzirXcCpO', 13, 'Mf0Co6hSyZoLpqtv'),
(21, 'liem1', '$2b$10$DsLPip7sSzwyHTlYMy0SBOUlwmDqgcCUsvGlXCucBjSqsRwC4ofVi', 26, 'WC8nrk9XkA9XF1WQ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chiphi`
--
ALTER TABLE `chiphi`
  ADD PRIMARY KEY (`machiphi`),
  ADD KEY `fk_chiphi_loaigiaohang` (`loaigiaohang`),
  ADD KEY `fk_chiphi_loaidonhang` (`loaidonhang`);

--
-- Indexes for table `chitietkho`
--
ALTER TABLE `chitietkho`
  ADD PRIMARY KEY (`machitiet`),
  ADD KEY `fk_chitietkho_donhang` (`madonhang`),
  ADD KEY `fk_chitietkho_kho` (`makho`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD UNIQUE KEY `SDT_unique` (`SDT`);

--
-- Indexes for table `kho`
--
ALTER TABLE `kho`
  ADD PRIMARY KEY (`makho`);

--
-- Indexes for table `loaidonhang`
--
ALTER TABLE `loaidonhang`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `loaigiaohang`
--
ALTER TABLE `loaigiaohang`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`madonhang`),
  ADD KEY `fk_donhang_khachhang_makh` (`makh`),
  ADD KEY `fk_donhang_trangthai` (`trangthai`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`mact`),
  ADD KEY `fk_chitietdonhang_donhang_madonhang` (`madonhang`),
  ADD KEY `fk_chitietdonhang_loaidonhang` (`loaidonhang`),
  ADD KEY `fk_chitietdonhang_loaigiaohang` (`loaigiaohang`);

--
-- Indexes for table `trangthai`
--
ALTER TABLE `trangthai`
  ADD PRIMARY KEY (`matrangthai`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`madn`),
  ADD UNIQUE KEY `username_unique` (`tendangnhap`),
  ADD KEY `fk_dangnhap_khachhang_makh` (`makh`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chiphi`
--
ALTER TABLE `chiphi`
  MODIFY `machiphi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chitietkho`
--
ALTER TABLE `chitietkho`
  MODIFY `machitiet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `kho`
--
ALTER TABLE `kho`
  MODIFY `makho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `loaidonhang`
--
ALTER TABLE `loaidonhang`
  MODIFY `maloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `loaigiaohang`
--
ALTER TABLE `loaigiaohang`
  MODIFY `maloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `madonhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `trangthai`
--
ALTER TABLE `trangthai`
  MODIFY `matrangthai` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `madn` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chiphi`
--
ALTER TABLE `chiphi`
  ADD CONSTRAINT `fk_chiphi_loaidonhang` FOREIGN KEY (`loaidonhang`) REFERENCES `loaidonhang` (`maloai`),
  ADD CONSTRAINT `fk_chiphi_loaigiaohang` FOREIGN KEY (`loaigiaohang`) REFERENCES `loaigiaohang` (`maloai`);

--
-- Constraints for table `chitietkho`
--
ALTER TABLE `chitietkho`
  ADD CONSTRAINT `fk_chitietkho_donhang` FOREIGN KEY (`madonhang`) REFERENCES `order` (`madonhang`),
  ADD CONSTRAINT `fk_chitietkho_kho` FOREIGN KEY (`makho`) REFERENCES `kho` (`makho`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_donhang_khachhang_makh` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`MaKH`),
  ADD CONSTRAINT `fk_donhang_trangthai` FOREIGN KEY (`trangthai`) REFERENCES `trangthai` (`matrangthai`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `fk_chitietdonhang_donhang_madonhang` FOREIGN KEY (`madonhang`) REFERENCES `order` (`madonhang`),
  ADD CONSTRAINT `fk_chitietdonhang_loaidonhang` FOREIGN KEY (`loaidonhang`) REFERENCES `loaidonhang` (`maloai`),
  ADD CONSTRAINT `fk_chitietdonhang_loaigiaohang` FOREIGN KEY (`loaigiaohang`) REFERENCES `loaigiaohang` (`maloai`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_dangnhap_khachhang_makh` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`MaKH`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
