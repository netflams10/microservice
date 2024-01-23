FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd

# apt-get update \
#   &&  apt-get install --quiet --yes --no-install-recommends \
#     libpq-dev \
#     libzip-dev \
#     libfreetype6-dev \
#     libjpeg62-turbo-dev \
#     libpng-dev \
#     unzip \
#   && docker-php-ext-install pdo pdo_pgsql pgsql \
#   && docker-php-ext-install zip pdo pdo_mysql \
#   && pecl install -o -f redis-5.1.1 \
#   && docker-php-ext-enable redis \
#   && docker-php-ext-configure gd --with-freetype --with-jpeg \
#   && docker-php-ext-install -j$(nproc) gd

RUN ln -s /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN sed -i -e 's/;extension=pgsql/extension=pgsql/' /usr/local/etc/php/php.ini
RUN sed -i -e 's/;extension=pdo_pgsql/extension=pdo_pgsql/' /usr/local/etc/php/php.ini

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN groupadd --gid 1000 appuser \
  && useradd --uid 1000 -g appuser \
    -G www-data,root --shell /bin/bash \
    --create-home appuser

USER appuser