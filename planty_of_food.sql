SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET FOREIGN_KEY_CHECKS = 0;

SET @tables = NULL;
SELECT GROUP_CONCAT(table_name) INTO @tables
  FROM information_schema.tables
  WHERE table_schema = 'planty_of_food';

SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `date_order` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `orders` (`id_order`, `date_order`, `id_user`) VALUES
(1, '2023-05-24 10:34:19', 2),
(2, '2023-05-24 10:35:35', 4);

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name_product` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id_product`, `name_product`) VALUES
(1, 'yogurt'),
(2, 'cocacola'),
(3, 'spaghetti'),
(4, 'pomodoro'),
(5, 'pollo'),
(6, 'riso'),
(7, 'marmellata'),
(8, 'avocado'),
(9, 'noci'),
(10, 'rucola'),
(11, 'peperoni'),
(12, 'noodles'),
(13, 'merluzzo'),
(14, 'gelato');

CREATE TABLE `products_orders` (
  `id_relation` int(11) NOT NULL,
  `id_order` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products_orders` (`id_relation`, `id_order`, `id_product`, `product_name`, `quantity`) VALUES
(3, 5, 1, NULL, 2),
(4, 6, 1, NULL, 2),
(5, 6, 1, NULL, 2),
(6, 6, 1, NULL, 2),
(7, 1, 11, NULL, 2),
(9, 1, 5, NULL, 2),
(10, 1, 9, NULL, 4),
(13, 2, 10, NULL, 1),
(14, 2, 9, NULL, 3),
(16, 1, 2, NULL, 4),
(19, 2, 2, NULL, 4),
(20, 2, 5, NULL, 2),
(21, 2, 8, NULL, 1),
(22, 2, 11, NULL, 2),
(23, 2, 13, NULL, 5);

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` text DEFAULT NULL,
  `surname_user` text DEFAULT NULL,
  `email_user` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id_user`, `name_user`, `surname_user`, `email_user`) VALUES
(1, 'Mario', 'Rossi', 'mrossi@email.mail'),
(2, 'Maria', 'Viola', 'mviola@email.mail'),
(3, 'Luigi', 'Verdi', 'lverdi@email.mail'),
(4, 'Sara', 'Neri', 'sneri@email.mail');

ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `orders_ibfk_2` (`id_user`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD UNIQUE KEY `name_product` (`name_product`) USING HASH;

ALTER TABLE `products_orders`
  ADD PRIMARY KEY (`id_relation`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email_user` (`email_user`) USING HASH;

ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `products_orders`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;
