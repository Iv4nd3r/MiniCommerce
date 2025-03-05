--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_id_seq OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    "productID" character varying(255),
    "productName" character varying(255),
    amount double precision,
    "customerName" character varying(255),
    status integer,
    "transactionDate" timestamp without time zone,
    "createBy" character varying(255),
    "createOn" timestamp without time zone
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, name) FROM stdin;
0	Pending
1	Completed
2	Failed
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, "productID", "productName", amount, "customerName", status, "transactionDate", "createBy", "createOn") FROM stdin;
1	P12345	Updated Product Name	150.75	Jane Doe	1	2023-10-02 14:30:00	Admin	2025-03-04 18:24:19.47495
4	232123	Zephyr	150	Markkulla	0	2021-06-22 18:34:00	Author	2025-03-04 18:35:19.753302
2	12345	Surface	1500	Bill Woz	1	2025-03-04 18:20:00	Best Seller	2025-03-04 18:29:53.896671
3	54312	Mac and cheese	15	Apple Johnseed	2	2025-03-02 18:31:00	Top Seller	2025-03-04 18:31:52.403432
5	123431	Accura NSX 2005	150000	Sculley Ballmer	0	2022-06-28 18:59:00	Super Seller	2025-03-04 18:59:48.639389
6	23421	Macintosh Mini	500	Lisa 	0	2021-01-19 19:01:00	Seller	2025-03-04 19:01:25.753685
7	234231	Springboot	3000	Paul Broadwell	0	2021-08-17 19:02:00	SoftMicro	2025-03-04 19:02:54.935806
8	12323	Blender	400	Jin	1	2025-01-06 23:44:00	Seller	2025-03-04 23:44:23.507029
9	1231123	Blender	800	Jin Kazuya	2	2023-06-05 00:09:00	New Seller	2025-03-05 00:09:33.028604
10	1231123	Blender	800	Jin Kazuya	0	2025-03-05 00:12:00	New Seller	2025-03-05 00:13:02.351429
\.


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 10, true);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_status_fkey FOREIGN KEY (status) REFERENCES public.status(id);


--
-- PostgreSQL database dump complete
--

