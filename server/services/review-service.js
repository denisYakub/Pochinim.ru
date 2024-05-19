const pool = require('../database');

class ReviewService{
    async getAllReviewsByRecipientId(id){
        const reviews = (await pool.query(`SELECT * FROM reviews WHERE id_master = ${id}`)).rows;


        var current = 0;

        for (const review of reviews){

            reviews[current].id_client = (await pool.query(`SELECT account_name FROM accounts
                                                                WHERE id_account = ${review.id_client}`)).rows[0].account_name;

            current = current + 1;
        }
        
        return reviews;
    }

    async countMasterStat(id){

        const total_stars = (await pool.query(`SELECT SUM(stars), COUNT(stars) FROM reviews WHERE id_master = ${id}`)).rows[0];

        return {'total_star': (total_stars.sum / total_stars.count),
                    'count': total_stars.count};
    }

    async leaveReview(id_topic, stars, head, comment, final_price, id_master, id_client){
        try {

            const today = new Date();
            
           await pool.query(`INSERT INTO reviews (stars, date, id_master, id_client, price, head, text, id_topic)
                                VALUES (${stars}, '${today.getDate()}-${today.getMonth()}-${today.getFullYear()}',
                                    ${id_master}, ${id_client}, ${final_price}, '${head}', '${comment}', ${id_topic})`);

            return true;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new ReviewService();
/*CREATE TABLE IF NOT EXISTS public.reviews
(
    id_review integer NOT NULL DEFAULT 'nextval('reviews_id_review_seq'::regclass)',
    stars integer NOT NULL,
    date date NOT NULL,
    id_master integer NOT NULL,
    id_client integer NOT NULL,
    price money NOT NULL,
    head character varying(100) COLLATE pg_catalog."default" NOT NULL,
    text character varying(500) COLLATE pg_catalog."default" NOT NULL,
    id_topic integer NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (id_review),
    CONSTRAINT reviews_id_client_fkey FOREIGN KEY (id_client)
        REFERENCES public.accounts (id_account) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT reviews_id_master_fkey FOREIGN KEY (id_master)
        REFERENCES public.masters (id_master) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT reviews_id_topic_fkey FOREIGN KEY (id_topic)
        REFERENCES public.topics (id_topic) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)*/