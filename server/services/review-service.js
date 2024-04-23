const pool = require('../database');

class ReviewService{
    async getAllReviewsByRecipientId(id){
        const reviews = await pool.query(`SELECT stars, date, account_name AS from, topic, text, price
                                            FROM reviews INNER JOIN accounts ON reviews.id_from = accounts.id_account
                                                WHERE id_to = '${id}'`);
        
        return reviews.rows;
    }

    async countStat(){
        return {'total_star': '4,8',
                    'count': 297};
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