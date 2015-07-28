drop table if exists checkouts;
create table checkouts(
	id serial primary key,
	reference_key uuid not null,
	cart_id varchar(50) not null,
	created_at timestamptz not null default now(),
	email varchar(255) not null,
	name varchar(255) not null,
	ip inet not null default '127.0.0.1',
	country_code varchar(2) not null default 'US',
	description varchar(255),
	items jsonb not null,
	billing_address jsonb,
	shipping_address jsonb,
	total decimal(10,2) not null default 0,
	terms_accepted boolean default false not null,
	processor varchar(20) not null default 'stripe',
	token jsonb,
	payment_details jsonb not null
)
