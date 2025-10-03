-- +goose Up
-- +goose StatementBegin
ALTER TABLE session ADD COLUMN token TEXT NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE session DROP COLUMN token;
-- +goose StatementEnd
