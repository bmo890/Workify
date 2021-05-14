CREATE TABLE IF NOT EXISTS jobs (
  id            VARCHAR(36) DEFAULT (UUID()),
  user_id       VARCHAR(36) NOT NULL,
  picture_url   VARCHAR(200) NOT NULL,
  title         VARCHAR(50) NOT NULL,
  category      VARCHAR(50) NOT NULL,
  description   VARCHAR(255) NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
)