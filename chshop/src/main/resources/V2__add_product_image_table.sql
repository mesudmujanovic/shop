CREATE TABLE product_image (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY,    -- ili SERIAL / odgovarajući tip za tvoju DB
                               product_id BIGINT NOT NULL,
                               image_data LONGBLOB NOT NULL,            -- ili BLOB / bytea zavisno od DB
                               image_type VARCHAR(255),
                               FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);