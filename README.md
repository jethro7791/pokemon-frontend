## Available Scripts
In file http_common.js there is the url to connected to backend.

FOr DOcker

## reate image
$ docker build -t pokemon-frontend:dev .

## Run
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    pokemon-frontend:dev

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.
