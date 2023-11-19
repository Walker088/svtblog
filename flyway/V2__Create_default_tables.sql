
CREATE TABLE IF NOT EXISTS users (
    user_id     TEXT PRIMARY KEY,
    user_pass   TEXT NOT NULL,
    totp_secret TEXT NOT NULL,
    profile_bio TEXT,
    profile_img TEXT,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at  TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN users.profile_bio IS 'Home page description of a user in markdown format';
COMMENT ON COLUMN users.created_at IS 'Creation time at utc tz of a user';
COMMENT ON COLUMN users.updated_at IS 'Update time at utc tz of a user';

CREATE TABLE IF NOT EXISTS series (
    serie_id VARCHAR(5),
    serie_name TEXT,
    PRIMARY KEY (serie_id)
);

DO $$ BEGIN
    CREATE TYPE articale_status AS ENUM ('PT', 'DR', 'DL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS articales (
    articale_id VARCHAR(9) PRIMARY KEY,
    articale_title TEXT,
    articale_sub_title TEXT,
    articale_serie VARCHAR(5),
    articale_img TEXT,
    articale_status articale_status, -- DL: Deleted, PT: Posted, DR: Draft
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    created_by TEXT,
    updated_at  TIMESTAMP WITHOUT TIME ZONE,
    updated_by TEXT,
    CONSTRAINT fk_articale_serie FOREIGN KEY(articale_serie) REFERENCES series(serie_id),
    CONSTRAINT fk_created_by FOREIGN KEY(created_by) REFERENCES users(user_id),
    CONSTRAINT fk_updated_by FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

DO $$ BEGIN
    CREATE TYPE articale_langs AS ENUM ('en', 'es', 'zh');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS articale_contents (
    articale_id VARCHAR(9),
    lang articale_langs,
    content TEXT,
    PRIMARY KEY (articale_id, lang),
    CONSTRAINT fk_articale_id FOREIGN KEY(articale_id) REFERENCES articales(articale_id)
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id VARCHAR(5),
    tag_name TEXT,
    PRIMARY KEY (tag_id)
);

CREATE TABLE IF NOT EXISTS articale_tags (
    articale_id VARCHAR(9),
    tag_id VARCHAR(5),
    PRIMARY KEY (articale_id, tag_id),
    CONSTRAINT fk_articale_id FOREIGN KEY(articale_id) REFERENCES articales(articale_id),
    CONSTRAINT fk_tag_id FOREIGN KEY(tag_id) REFERENCES tags(tag_id)
);
