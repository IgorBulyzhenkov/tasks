# Устанавливаем базовый образ PHP с необходимыми расширениями
FROM php:8.2-fpm

# Устанавливаем system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Устанавливаем зависимости Laravel
WORKDIR /var/www/html
COPY . .
RUN composer install \
    && chmod -R 777 storage bootstrap/cache

# Expose порт для PHP
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
