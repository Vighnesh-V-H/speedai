-- +goose Up
-- +goose StatementBegin
CREATE TABLE writing_style (
	user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
	style JSONB NOT NULL DEFAULT '{}'::jsonb,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS writing_style;
-- +goose StatementEnd
