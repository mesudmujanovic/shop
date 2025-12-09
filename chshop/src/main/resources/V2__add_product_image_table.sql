CREATE TABLE product_image (
                                id BIGSERIAL PRIMARY KEY,
                                image_base64 TEXT NOT NULL,
                                image_type VARCHAR(100),
                                product_id BIGINT REFERENCES product(id) ON DELETE CASCADE
);