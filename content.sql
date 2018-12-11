--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.activities (
    m_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    firstname character varying(255),
    lastname character varying(255)
);


ALTER TABLE public.activities OWNER TO david_deng;

--
-- Name: activities_m_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.activities_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activities_m_id_seq OWNER TO david_deng;

--
-- Name: activities_m_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.activities_m_id_seq OWNED BY public.activities.m_id;


--
-- Name: commitments; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.commitments (
    c_id integer NOT NULL,
    m_id integer,
    start_time time without time zone,
    end_time time without time zone,
    repeat_unit text,
    terminate_date date,
    CONSTRAINT commitments_repeat_unit_check CHECK ((repeat_unit = ANY (ARRAY['D'::text, 'W'::text, 'M'::text, 'Y'::text])))
);


ALTER TABLE public.commitments OWNER TO david_deng;

--
-- Name: commitments_c_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.commitments_c_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commitments_c_id_seq OWNER TO david_deng;

--
-- Name: commitments_c_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.commitments_c_id_seq OWNED BY public.commitments.c_id;


--
-- Name: core_hours; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.core_hours (
    ch_id integer NOT NULL,
    m_id integer,
    weekday integer,
    start_time time without time zone,
    end_time time without time zone
);


ALTER TABLE public.core_hours OWNER TO david_deng;

--
-- Name: core_hours_ch_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.core_hours_ch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_hours_ch_id_seq OWNER TO david_deng;

--
-- Name: core_hours_ch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.core_hours_ch_id_seq OWNED BY public.core_hours.ch_id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO david_deng;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO david_deng;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO david_deng;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO david_deng;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: member_proposed_times; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.member_proposed_times (
    m_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    firstname character varying(255),
    lastname character varying(255)
);


ALTER TABLE public.member_proposed_times OWNER TO david_deng;

--
-- Name: member_proposed_times_m_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.member_proposed_times_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_proposed_times_m_id_seq OWNER TO david_deng;

--
-- Name: member_proposed_times_m_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.member_proposed_times_m_id_seq OWNED BY public.member_proposed_times.m_id;


--
-- Name: member_team; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.member_team (
    m_id integer,
    t_id integer
);


ALTER TABLE public.member_team OWNER TO david_deng;

--
-- Name: members; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.members (
    m_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    firstname character varying(255),
    lastname character varying(255)
);


ALTER TABLE public.members OWNER TO david_deng;

--
-- Name: members_m_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.members_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.members_m_id_seq OWNER TO david_deng;

--
-- Name: members_m_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.members_m_id_seq OWNED BY public.members.m_id;


--
-- Name: proposed_times; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.proposed_times (
    m_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    firstname character varying(255),
    lastname character varying(255)
);


ALTER TABLE public.proposed_times OWNER TO david_deng;

--
-- Name: proposed_times_m_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.proposed_times_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposed_times_m_id_seq OWNER TO david_deng;

--
-- Name: proposed_times_m_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.proposed_times_m_id_seq OWNED BY public.proposed_times.m_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.teams (
    t_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.teams OWNER TO david_deng;

--
-- Name: teams_t_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.teams_t_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_t_id_seq OWNER TO david_deng;

--
-- Name: teams_t_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.teams_t_id_seq OWNED BY public.teams.t_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: david_deng
--

CREATE TABLE public.users (
    m_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    firstname character varying(255),
    lastname character varying(255)
);


ALTER TABLE public.users OWNER TO david_deng;

--
-- Name: users_m_id_seq; Type: SEQUENCE; Schema: public; Owner: david_deng
--

CREATE SEQUENCE public.users_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_m_id_seq OWNER TO david_deng;

--
-- Name: users_m_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david_deng
--

ALTER SEQUENCE public.users_m_id_seq OWNED BY public.users.m_id;


--
-- Name: activities m_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.activities ALTER COLUMN m_id SET DEFAULT nextval('public.activities_m_id_seq'::regclass);


--
-- Name: commitments c_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.commitments ALTER COLUMN c_id SET DEFAULT nextval('public.commitments_c_id_seq'::regclass);


--
-- Name: core_hours ch_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.core_hours ALTER COLUMN ch_id SET DEFAULT nextval('public.core_hours_ch_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: member_proposed_times m_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.member_proposed_times ALTER COLUMN m_id SET DEFAULT nextval('public.member_proposed_times_m_id_seq'::regclass);


--
-- Name: members m_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.members ALTER COLUMN m_id SET DEFAULT nextval('public.members_m_id_seq'::regclass);


--
-- Name: proposed_times m_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.proposed_times ALTER COLUMN m_id SET DEFAULT nextval('public.proposed_times_m_id_seq'::regclass);


--
-- Name: teams t_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.teams ALTER COLUMN t_id SET DEFAULT nextval('public.teams_t_id_seq'::regclass);


--
-- Name: users m_id; Type: DEFAULT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.users ALTER COLUMN m_id SET DEFAULT nextval('public.users_m_id_seq'::regclass);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.activities (m_id, email, password, firstname, lastname) FROM stdin;
\.


--
-- Data for Name: commitments; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.commitments (c_id, m_id, start_time, end_time, repeat_unit, terminate_date) FROM stdin;
40	1	05:00:00	08:00:00	D	2010-04-27
30	1	06:00:00	09:00:00	W	2010-04-27
\.


--
-- Data for Name: core_hours; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.core_hours (ch_id, m_id, weekday, start_time, end_time) FROM stdin;
1	1	0	05:00:00	09:00:00
2	1	1	05:00:00	09:00:00
3	1	2	05:00:00	09:00:00
4	1	3	05:00:00	09:00:00
5	1	4	05:00:00	09:00:00
6	1	5	05:00:00	09:00:00
7	1	6	05:00:00	09:00:00
8	2	0	05:00:00	09:00:00
9	2	1	05:00:00	09:00:00
10	2	2	05:00:00	09:00:00
12	2	4	05:00:00	09:00:00
13	2	5	05:00:00	09:00:00
14	2	6	05:00:00	09:00:00
11	2	3	07:00:00	10:00:00
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: member_proposed_times; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.member_proposed_times (m_id, email, password, firstname, lastname) FROM stdin;
\.


--
-- Data for Name: member_team; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.member_team (m_id, t_id) FROM stdin;
4	1
\N	\N
\N	\N
\N	\N
1	1
1	3
1	10
2	14
4	2
1	2
1	4
2	12
2	13
2	16
1	17
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.members (m_id, email, password, firstname, lastname) FROM stdin;
1	alice@taylor.edu	pw	fn	ln
2	bob@taylor.edu	pw	bob	ln
3	charlie@taylor.edu	pw	charlie	ln
4	david@taylor.edu	pw	david	ln
5	eve@taylor.edu	pw	eve	ln
\.


--
-- Data for Name: proposed_times; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.proposed_times (m_id, email, password, firstname, lastname) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.teams (t_id, name) FROM stdin;
1	Team Alpha
2	Team Beta
3	Team Cool
4	Team Swag
5	Team E
6	Team Fall
7	Team Gall
8	Team HJall
9	sadf
10	Team Z
11	Team Test
12	Team Rando
13	Sigma
14	Team Celta
15	Team BBB
16	Sig
17	Random Team
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: david_deng
--

COPY public.users (m_id, email, password, firstname, lastname) FROM stdin;
\.


--
-- Name: activities_m_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.activities_m_id_seq', 1, false);


--
-- Name: commitments_c_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.commitments_c_id_seq', 1, false);


--
-- Name: core_hours_ch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.core_hours_ch_id_seq', 1, false);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 1, false);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: member_proposed_times_m_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.member_proposed_times_m_id_seq', 1, false);


--
-- Name: members_m_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.members_m_id_seq', 1, false);


--
-- Name: proposed_times_m_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.proposed_times_m_id_seq', 1, false);


--
-- Name: teams_t_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.teams_t_id_seq', 17, true);


--
-- Name: users_m_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david_deng
--

SELECT pg_catalog.setval('public.users_m_id_seq', 1, false);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (m_id);


--
-- Name: commitments commitments_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.commitments
    ADD CONSTRAINT commitments_pkey PRIMARY KEY (c_id);


--
-- Name: core_hours core_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.core_hours
    ADD CONSTRAINT core_hours_pkey PRIMARY KEY (ch_id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: member_proposed_times member_proposed_times_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.member_proposed_times
    ADD CONSTRAINT member_proposed_times_pkey PRIMARY KEY (m_id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (m_id);


--
-- Name: proposed_times proposed_times_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.proposed_times
    ADD CONSTRAINT proposed_times_pkey PRIMARY KEY (m_id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (t_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (m_id);


--
-- Name: commitments commitments_m_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.commitments
    ADD CONSTRAINT commitments_m_id_foreign FOREIGN KEY (m_id) REFERENCES public.members(m_id);


--
-- Name: core_hours core_hours_m_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.core_hours
    ADD CONSTRAINT core_hours_m_id_foreign FOREIGN KEY (m_id) REFERENCES public.members(m_id);


--
-- Name: member_team member_team_m_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.member_team
    ADD CONSTRAINT member_team_m_id_foreign FOREIGN KEY (m_id) REFERENCES public.members(m_id);


--
-- Name: member_team member_team_t_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: david_deng
--

ALTER TABLE ONLY public.member_team
    ADD CONSTRAINT member_team_t_id_foreign FOREIGN KEY (t_id) REFERENCES public.teams(t_id);


--
-- PostgreSQL database dump complete
--

