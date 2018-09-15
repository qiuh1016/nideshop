CREATE TABLE `nideshop_plan` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `stylist_id` mediumint(5) unsigned NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `style` varchar(20) NOT NULL DEFAULT '',
  `image_url` text,
  `fit_group` text NOT NULL,
  `fit_scene` text NOT NULL,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `add_time` timestamp NOT NULL,
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `nideshop_stylist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `headimgurl` varchar(255) NOT NULL,
  `style` varchar(255) NOT NULL,
  `adoption_rate` int(11) NOT NULL DEFAULT '0',
  `goodat` varchar(255) NOT NULL,
  `experience` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `nideshop_style_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `nideshop_style_name`
-- ----------------------------
BEGIN;
INSERT INTO `nideshop_style_name` VALUES ('1', '简约'), ('2', '休闲'), ('3', '轻时尚');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;