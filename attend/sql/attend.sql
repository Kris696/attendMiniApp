-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： localhost:3306
-- 生成日期： 2021-06-08 16:48:20
-- 服务器版本： 5.7.26-log
-- PHP 版本： 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `attend`
--

-- --------------------------------------------------------

--
-- 表的结构 `checkinfo`
--

CREATE TABLE `checkinfo` (
  `checkDate` date NOT NULL COMMENT '检查日期',
  `id` int(11) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `checkTime` tinyint(4) NOT NULL COMMENT '上午=1，下午=2',
  `status` int(11) NOT NULL COMMENT '0未到，1已到，2请假',
  `checkDesc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `checkinfo`
--

INSERT INTO `checkinfo` (`checkDate`, `id`, `teacherName`, `checkTime`, `status`, `checkDesc`) VALUES
('2021-06-08', 2, '狄仁杰', 1, 1, ''),
('2021-06-08', 3, '成吉思汗', 2, 2, '');

-- --------------------------------------------------------

--
-- 表的结构 `classinfo`
--

CREATE TABLE `classinfo` (
  `id` int(11) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `haveClass` tinyint(4) NOT NULL COMMENT '0=没课，1=上午有课，2=下午有课，12等于上下午都有课'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `classinfo`
--

INSERT INTO `classinfo` (`id`, `teacherName`, `haveClass`) VALUES
(2, '狄仁杰', 12),
(3, '成吉思汗', 1),
(4, '张山', 2),
(27, '磊磊', 1),
(28, '谢谢', 2),
(29, '大大', 12);

--
-- 转储表的索引
--

--
-- 表的索引 `checkinfo`
--
ALTER TABLE `checkinfo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `classinfo`
--
ALTER TABLE `classinfo`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `checkinfo`
--
ALTER TABLE `checkinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `classinfo`
--
ALTER TABLE `classinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
