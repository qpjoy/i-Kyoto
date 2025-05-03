```sh
# list all crontabs
cat /etc/passwd | sed 's/^\([^:]*\):.*$/sudo crontab -u \1 -l 2>\&1/' | grep -v "no crontab for" | sh
```
