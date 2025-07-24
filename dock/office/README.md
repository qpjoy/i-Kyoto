```bash
# pgadmin privileges
chown -R 999:999 /Users/qpjoy/data/pdf-postgres-data
chown -R 5050:5050 /Users/qpjoy/data/pgadmin-data

scp -r dist root@43.246.210.144:/root/workspace/qpjoy/i-Kyoto/dock/office/be/

# be
NODE_ENV=host node dist/apps/pdf/main.js

# pm2 ls
pm2 start dist/apps/pdf/main.js --name pdf-api --env NODE_ENV=host
```
