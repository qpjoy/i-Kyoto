```bash
# 删除端口为 8080 的进程
sudo lsof -i :8080 | awk 'NR!=1 {print $2}' | xargs -I {} kill -9 {}

# 查找超过200k的文件，去掉node_modules文件夹
find . -type f -size +200k | grep -v "node_modules"

# find remote port if open
nc -vnzu 23.225.161.60 587
```
