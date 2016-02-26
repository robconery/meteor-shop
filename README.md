## An eCommerce Storefront Using Meteor.js, Bootstrap, Knockout, Stripe, and Postgres

I built this storefront a while back to test out some ideas and also to see where Meteor was at in terms of maturity etc. I was impressed.

Building things with Meteor is a lot of fun. There are a number of packages that support the development process and , all in all, the conceptual density of the whole thing is kind of low.

Have a look through the code - it all works - just add some products, a set of StripeKeys and off you go!

## Installation

Pull the source from this repo (or just download it), and then:

 - Reset the `settings.json` and `settings.development.json` files
 - Remove the test data/imagery and replace with your own
 - Update the `mup.json` with your deployment settings

And you're off. The app currently stores order data in Postgres (I don't trust MongoDB, for no good reason. Also, *I just like Postgres*) and for that you'll need to create your checkout table:

```sql
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
```

Please note: `jsonb` support is only in Postgres 9.4+. If you need to use a lower version, change the datatype above to `json`.

Installing Postgres on Ubuntu 14.10 is recommended:

```sh
sudo apt-get update
sudo apt-get install postgresql-9.4

su postgres && cd

createdb [your db name]
psql [your db name]

#paste the create script above here

CREATE ROLE [your db user] WITH PASSWORD [your password];
GRANT ALL ON DATABASE [your db name] to [your db user];
ALTER TABLE checkouts OWNER TO [your db user];
\q
exit
exit
```

If you know how to install Postgres already - go with what you know :).

## Screencast of the Building of This App

I work for Pluralsight and like to create screencasts about the things I'm working on - and I did that for this project. [You can watch it here](https://www.pluralsight.com/courses/meteorjs-web-application).
