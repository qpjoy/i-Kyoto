```bash
# 编译
npm init -y
pnpm i typescript @types/node -D
npx tsc --init
npx tsc
npm run build
node --watch dist/PaymentWriter.spec.js
```
