-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2021 at 11:28 AM
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
  `TenKH` varchar(255) DEFAULT '',
  `SDT` varchar(10) DEFAULT NULL,
  `DiaChi` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `TenKH`, `SDT`, `DiaChi`) VALUES
(39, 'Bảo', '0000000012', 'TPHCM'),
(40, '', NULL, NULL),
(41, 'Bảo', '0000000012', 'TPHCM'),
(43, 'liem', '0000000011', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận');

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
(32, 41, '250000.00', 1, 43, '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận');

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
(31, 32, 2.5, 2.5, 'ktx khu A, Khu phố 6, phường Linh Trung, Thủ Đức', '122 Phạm Ngọc Thạch, Thị Trấn Ma Lâm, Hàm Thuận Bắc, Bình Thuận', 1, 1);

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
  `username` varchar(50) NOT NULL,
  `password` text DEFAULT NULL,
  `makh` int(11) DEFAULT NULL,
  `refeshtoken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`madn`, `username`, `password`, `makh`, `refeshtoken`) VALUES
(29, 'bao@gmail.com', '$2b$10$IAD7PV08fy6f54nTOb2l2OJhd3/V0Tojown/eU.PVDbZtNql3xOHy', 39, 'fPH9FIIgZfZ6vf69'),
(30, 'bao1@gmail.com', '$2b$10$9efyAv5KI4XqUCyNq33hf.kPSJSVMhjsdPkM6RbfxwLs/k4UTzBq.', 40, '9b0Fq6URQznssS9j'),
(31, 'bao12@gmail.com', '$2b$10$rG0nTtFEdv36DXwy6k0Ny.yx6TefPdCGhgithvYRFNnfFug0CTTsi', 41, '7dwa1I7QfHnFoA0g');

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
  ADD PRIMARY KEY (`MaKH`);

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
  ADD UNIQUE KEY `username_unique` (`username`),
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
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
  MODIFY `madonhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `mact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `trangthai`
--
ALTER TABLE `trangthai`
  MODIFY `matrangthai` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `madn` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
