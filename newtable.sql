DROP TABLE IF EXISTS `nideshop_plan`;
CREATE TABLE `nideshop_plan` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `stylist_id` mediumint(5) unsigned NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `style` varchar(20) NOT NULL DEFAULT '',
  `v` smallint(5) unsigned NOT NULL DEFAULT 1,
  `fit_group` text NOT NULL,
  `fit_scene` text NOT NULL,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `add_time` timestamp NOT NULL,
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `nideshop_plan_item`;
CREATE TABLE `nideshop_plan_item` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` mediumint(8) unsigned NOT NULL,
  `goods_id` mediumint(8) unsigned NOT NULL,
  `x` smallint(5) unsigned NOT NULL,
  `y` smallint(5) unsigned NOT NULL,
  `z` smallint(5) unsigned NOT NULL,
  `w` smallint(5) unsigned NOT NULL,
  `h` smallint(5) unsigned NOT NULL,
  `enabled` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `nideshop_stylist`;
CREATE TABLE `nideshop_stylist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `style` varchar(255) NOT NULL,
  `adoption_rate` int(11) NOT NULL DEFAULT '0',
  `goodat` varchar(255) NOT NULL,
  `experience` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `nideshop_style_name`;
CREATE TABLE `nideshop_style_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for nideshop_user
-- ----------------------------
DROP TABLE IF EXISTS `nideshop_user`;
CREATE TABLE `nideshop_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `gender` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `birthday` int(11) unsigned NOT NULL DEFAULT '0',
  `register_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_ip` varchar(15) NOT NULL DEFAULT '',
  `user_level_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `nickname` varchar(60) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `register_ip` varchar(45) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `weixin_openid` varchar(50) NOT NULL DEFAULT '',
  `stylist_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `nideshop_style_name`
-- ----------------------------
BEGIN;
INSERT INTO `nideshop_style_name` VALUES ('1', '简约'), ('2', '休闲'), ('3', '轻时尚');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;