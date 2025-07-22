```bash
# prefix
apt -y install maildrop

# postfix
apt -y install postfix sasl2-bin
cp /usr/share/postfix/main.cf.dist /etc/postfix/main.cf

newaliases
systemctl restart postfix

# dovecot
apt -y install dovecot-core dovecot-pop3d dovecot-imapd
## replace 1step files, especilly the ssl files

systemctl restart dovecot

# mailutils
apt -y install mailutils
echo 'export MAIL=$HOME/Maildir/' >> /etc/profile.d/mail.sh

# find issues
tail -f /var/log/mail.log
postfix check
postfix set-permissions
### system 25 port banned by suplies

## set SPF, so verified suppliers can send email to your server
apt install bind9 bind9utils bind9-doc -y

tail -n30 /var/log/mail.log|grep Pass

# mail localhost
sudo su - abuntu
maildirmake ~/Maildir
sudo chown -R abuntu:abuntu /home/abuntu/Maildir
### mail abuntu@localhost
echo "This is a test mail Mia" | mail -s "Test Mia Subject" abuntu@localhost

adduser --uid 20000 --disabled-password --disabled-login vmail

maildirmake /home/vmail/memoscard.com/admin
chown -R vmail:vmail /home/vmail


# purge postfix
apt purge --remove postfix -y
rm -rf /etc/postfix
rm -rf /var/spool/postfix
```
