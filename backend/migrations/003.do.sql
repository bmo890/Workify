CREATE TABLE IF NOT EXISTS offers (
  id            VARCHAR(36) DEFAULT (UUID()),
  job_id        VARCHAR(36) NOT NULL,
  user_id       VARCHAR(200) NOT NULL,
  price         INT NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
)