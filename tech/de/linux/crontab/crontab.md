```sh
# list all crontabs
cat /etc/passwd | sed 's/^\([^:]*\):.*$/sudo crontab -u \1 -l 2>\&1/' | grep -v "no crontab for" | sh

# crontab
crontab -u ubuntu -l
crontab -u ubuntu -r




# clear history
crontab -u ubuntu -e

### <hack> xmrig c3pool
@daily /var/tmp/.update-logs/./History >/dev/null 2>&1 & disown
@reboot /var/tmp/.update-logs/./Update >/dev/null 2>&1 & disown
* * * * * /var/tmp/.update-logs/./History >/dev/null 2>&1 & disown
@monthly /var/tmp/.update-logs/./Update >/dev/null 2>&1 & disown
*/30 * * * * /var/tmp/.update-logs/./.c > /dev/null 2>&1 & disown
* * * * * /var/tmp/.update-logs/./.b >/dev/null 2>&1 & disown
```
