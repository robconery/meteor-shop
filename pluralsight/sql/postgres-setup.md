## To setup Postgres, login to your development box and...

```sh
sudo apt-get update
sudo apt-get install postgresql-9.4

su postgres && cd
createdb rocketshop
psql rocketshop
```

You should now have a PSQL prompt for the rocketshop database. You now need to create a user and setup permissions as owner for that table:

```sql
CREATE ROLE rocket WITH PASSWORD 'takemetomars';
-- paste the CREATE SQL for checkouts here

GRANT ALL ON DATABASE rocketshop to rocket;
ALTER TABLE checkouts OWNER TO rocket;
```

You should now be setup and can push your site!
