DROP TABLE sessions;
ALTER TABLE users DROP COLUMN password_hash;
ALTER TABLE users DROP COLUMN password_salt;

