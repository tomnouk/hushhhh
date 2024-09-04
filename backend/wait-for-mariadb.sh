#!/bin/sh
# wait-for-mariadb.sh
>&2 echo "checking mariadb..."

HOST="mariadb"
MYSQL_ROOT_PASSWORD="password"

until mysql -p"$MYSQL_ROOT_PASSWORD" -h"$HOST"; do
	>&2 echo "mariadb is unavailable - sleeping"
	sleep 2
done
>&2 echo "mariadb is up..."

sleep 6

npm run dev


/bin/sh "$@"