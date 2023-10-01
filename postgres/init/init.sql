CREATE TABLE IF NOT EXISTS tracks (
  id varchar(22) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  album varchar(255) NOT NULL,
  images jsonb NOT NULL,
  artists jsonb NOT NULL,
  lyrics text[] NOT NULL,
  gathered_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);