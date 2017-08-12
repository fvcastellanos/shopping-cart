
ng build --prod --deploy-url sc/ --baseHref /sc
docker stop shopping-cart
docker rmi -f apps.cavitos.net/shopping-cart:1.0
docker rm -f shopping-cart
docker build -t apps.cavitos.net/shopping-cart:1.0 .
