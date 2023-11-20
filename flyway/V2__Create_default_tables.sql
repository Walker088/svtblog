
CREATE TABLE IF NOT EXISTS users (
    user_id     TEXT PRIMARY KEY,
    user_pass   TEXT NOT NULL,
    totp_secret TEXT NOT NULL,
    profile_bio TEXT,
    profile_img TEXT,
    cv_path     TEXT,
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
    CREATE TYPE article_status AS ENUM ('PT', 'DR', 'DL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS articles (
    article_id VARCHAR(9) PRIMARY KEY,
    article_title TEXT,
    article_sub_title TEXT,
    article_serie VARCHAR(5),
    article_img TEXT,
    article_status article_status, -- DL: Deleted, PT: Posted, DR: Draft
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    created_by TEXT,
    updated_at  TIMESTAMP WITHOUT TIME ZONE,
    updated_by TEXT,
    CONSTRAINT fk_article_serie FOREIGN KEY(article_serie) REFERENCES series(serie_id),
    CONSTRAINT fk_created_by FOREIGN KEY(created_by) REFERENCES users(user_id),
    CONSTRAINT fk_updated_by FOREIGN KEY(updated_by) REFERENCES users(user_id)
);

DO $$ BEGIN
    CREATE TYPE article_langs AS ENUM ('en', 'es', 'zh');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS article_contents (
    article_id VARCHAR(9),
    article_lang article_langs,
    article_content TEXT,
    PRIMARY KEY (article_id, article_lang),
    CONSTRAINT fk_article_id FOREIGN KEY(article_id) REFERENCES articles(article_id)
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id VARCHAR(5),
    tag_name TEXT,
    PRIMARY KEY (tag_id)
);

CREATE TABLE IF NOT EXISTS article_tags (
    article_id VARCHAR(9),
    tag_id VARCHAR(5),
    PRIMARY KEY (article_id, tag_id),
    CONSTRAINT fk_article_id FOREIGN KEY(article_id) REFERENCES articles(article_id),
    CONSTRAINT fk_tag_id FOREIGN KEY(tag_id) REFERENCES tags(tag_id)
);
