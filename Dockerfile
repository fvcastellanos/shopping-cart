FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs/sc

COPY dist/ ./

COPY docker/files/.htaccess ./

