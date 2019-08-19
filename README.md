# Evgeniia_ProductDeveloper_OA
test task

clone git : 
```
git clone https://github.com/pigule/Evgeniia_ProductDeveloper_OA.git
```
go to app folder:
```
cd Evgeniia_ProductDeveloper_OA
```
run :
```
docker-compose build —no-cache
```
run:
```
docker-compose up -d
```
go into the docker container:
```
docker exec -it evgeniia_productdeveloper_oa_web_1 bash
```
migrate table:
```
npx sequelize db:migrate
```
add data to table:
```
node console/addData.js
```
run app:
http://localhost:8080
