-- Upsert user: molly (이름: 몰리), password: test1234
INSERT INTO "User" ("username","name","passwordHash")
VALUES ('molly','몰리','$2b$10$VS3bxkWTJALMFG9Y8PMmX.aW2qBAWhObHlJ9/Kc62rbAI2MhYYLJu')
ON CONFLICT("username") DO UPDATE SET "name"=excluded.name, "passwordHash"=excluded.passwordHash;

-- Ensure point balance to 15000 for molly
WITH u AS (
  SELECT id FROM "User" WHERE username='molly'
), curr AS (
  SELECT COALESCE(SUM(amount),0) AS current FROM "PointTransaction" WHERE userId=(SELECT id FROM u)
), delta AS (
  SELECT (SELECT id FROM u) AS userId, 15000 - current AS amount FROM curr
)
INSERT INTO "PointTransaction" ("userId","amount","note")
SELECT userId, amount, 'adjust to target (molly)'
FROM delta WHERE amount != 0;

-- Upsert user: sol (이름: 쏠), password: test1234
INSERT INTO "User" ("username","name","passwordHash")
VALUES ('sol','쏠','$2b$10$VS3bxkWTJALMFG9Y8PMmX.aW2qBAWhObHlJ9/Kc62rbAI2MhYYLJu')
ON CONFLICT("username") DO UPDATE SET "name"=excluded.name, "passwordHash"=excluded.passwordHash;

-- Ensure point balance to 1200 for sol
WITH u AS (
  SELECT id FROM "User" WHERE username='sol'
), curr AS (
  SELECT COALESCE(SUM(amount),0) AS current FROM "PointTransaction" WHERE userId=(SELECT id FROM u)
), delta AS (
  SELECT (SELECT id FROM u) AS userId, 1200 - current AS amount FROM curr
)
INSERT INTO "PointTransaction" ("userId","amount","note")
SELECT userId, amount, 'adjust to target (sol)'
FROM delta WHERE amount != 0;


