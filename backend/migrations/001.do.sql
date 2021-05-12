CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(36) DEFAULT (UUID()),
  email         VARCHAR(200) NOT NULL UNIQUE,
  password      VARCHAR(200) NOT NULL,
  first_name    VARCHAR(20) NOT NULL,
  last_name     VARCHAR(20) NOT NULL,
  phone         VARCHAR(10) NOT NULL,
  location      VARCHAR(255) NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
)