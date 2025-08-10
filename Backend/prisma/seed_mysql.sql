-- Users upsert (password: test1234)
INSERT INTO `User` (`username`,`name`,`passwordHash`)
VALUES 
  ('molly','몰리','$2b$10$VS3bxkWTJALMFG9Y8PMmX.aW2qBAWhObHlJ9/Kc62rbAI2MhYYLJu'),
  ('sol','쏠','$2b$10$VS3bxkWTJALMFG9Y8PMmX.aW2qBAWhObHlJ9/Kc62rbAI2MhYYLJu')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `passwordHash`=VALUES(`passwordHash`);

-- Tokens upsert
INSERT INTO `Token` (`type`,`balance`,`updatedAt`) VALUES ('BANK',1000000,NOW())
ON DUPLICATE KEY UPDATE `balance`=VALUES(`balance`), `updatedAt`=NOW();
INSERT INTO `Token` (`type`,`balance`,`updatedAt`) VALUES ('DONATION',0,NOW())
ON DUPLICATE KEY UPDATE `balance`=VALUES(`balance`), `updatedAt`=NOW();

-- Ensure Molly 15000P (no CTE)
INSERT INTO `PointTransaction` (`userId`,`amount`,`note`)
SELECT u.id,
       (15000 - COALESCE(SUM(p.amount),0)) AS delta,
       'adjust to target (molly)'
FROM `User` u
LEFT JOIN `PointTransaction` p ON p.userId = u.id
WHERE u.username = 'molly'
GROUP BY u.id
HAVING delta <> 0;

-- Ensure Sol 1200P (no CTE)
INSERT INTO `PointTransaction` (`userId`,`amount`,`note`)
SELECT u.id,
       (1200 - COALESCE(SUM(p.amount),0)) AS delta,
       'adjust to target (sol)'
FROM `User` u
LEFT JOIN `PointTransaction` p ON p.userId = u.id
WHERE u.username = 'sol'
GROUP BY u.id
HAVING delta <> 0;


