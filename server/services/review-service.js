const pool = require('../database');

class ReviewService{
    async getReviews(){
        
    }
}
module.exports = new ReviewService();
/*CREATE TABLE IF NOT EXISTS public.reviews
(
    id_review integer NOT NULL DEFAULT 'nextval('reviews_id_review_seq'::regclass)',
    stars integer NOT NULL,
    date date NOT NULL,
    id_from integer NOT NULL,
    id_to integer,
    topic character varying(100)[] COLLATE pg_catalog."default" NOT NULL,
    text character varying(500)[] COLLATE pg_catalog."default" NOT NULL,
    price money,
    CONSTRAINT reviews_pkey PRIMARY KEY (id_review)
)*/