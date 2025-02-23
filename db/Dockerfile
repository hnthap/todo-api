FROM mysql:8.0

COPY my.cnf /etc/mysql/conf.d

RUN chmod 644 /etc/mysql/conf.d/my.cnf

RUN mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

COPY ./sql/init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
