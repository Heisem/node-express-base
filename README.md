## How to run 
```
NODE_ENV=development npm start
```

## Docker
```
docker build --build-arg NPM_TOKEN=$NPM_TOKEN  -t express-base .
docker run --env NODE_ENV=production  -p 3000:3000 express-base
```