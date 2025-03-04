```bash
npm i -g @nestjs/cli
nest new nest-admin --skip-git

export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0

docker-compose up --build
# -v 删除已有container
docker-compose down

nest g mo user
nest g co user

pnpm i @nestjs/typeorm typeorm mysql2

nest g mo auth

pnpm i bcryptjs
pnpm i @types/bcryptjs -D

pnpm i class-transformer class-validator

pnpm i @nestjs/jwt passport-jwt
pnpm i @types/passport-jwt -D

pnpm i cookie-parser
pnpm i -D @types/cookie-parser

nest g interceptor auth/auth
nest g guard auth/auth

nest g module common
nest g mo role
nest g co role
nest g service role

nest g mo permission
nest g co permission
nest g service permission

nest g service abstract

nest g module product
nest g co product
nest g service product

pnpm i multer
pnpm i @types/multer -D

pnpm i json2csv
pnpm i @types/json2csv -D
```
