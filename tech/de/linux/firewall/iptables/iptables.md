# Useful Links

- https://netfilter.org/

```bash
apt-get install net-tools
apt-get install open-vm-tools-desktop

# List all
iptables -S

# DROP
ping 192.168.1.9
iptables -t filter -A INPUT -p icmp -j DROP
# DROP web
iptables -t filter -A OUTPUT -d netfilter.org -j DROP

# filter tables
## filter only accept 5.3.6.6, drop others
iptables -A INPUT -p tcp --dport 22 -s 5.3.6.6 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP
iptables -t filter -A INPUT -p icmp --icmp-type echo-request -j DROP
# block output ubuntu
iptables -t filter -A OUTPUT -p tcp --dport 80 -d www.ubuntu.com -j DROP
iptables -t filter -A OUTPUT -p tcp --dport 443 -d www.ubuntu.com -j DROP

# list
iptables -L
iptables -vnL
iptables -t nat -L
iptables -t mangle -vnL
iptables -t raw -vnL

# -A for short without filter
iptables -A INPUT -p tcp --dport 25 -j DROP
nmap -p 25 192.168.0.10
iptables -A INPUT -p tcp --dport 80 -j DROP
# -I unshift to the first
iptables -I INPUT -p udp -dport 69 -j DROP
iptables -I INPUT 3 -p udp -dport 69 -j DROP
iptables -vnL
iptables -I INPUT -p tcp --dport 80 -j ACCEPT

# -F
iptables -F INPUT
iptables -F
iptables -t nat -F

iptables -A OUTPUT -p tcp --dport 22 -j ACCEPT

# -Z reset packets or bytes
iptables -Z

# -N -X
iptables -N MYCHAIN
iptables -X MYCHAIN

# -P
iptables -P FORWARD DROP

# -D remove output second rule
iptables -D OUTPUT 2


iptables -A INPUT -p icmp -j DROP

iptables -I INPUT -s 192.168.0.20 -j DROP
iptables -I INPUT -s 192.168.0.20 -j ACCEPT

# DROP ALL
iptables -P INPUT DROP
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# iptables-save persist
iptables-save > myfirewall
iptables-restore myfirewall

# /etc/iptables/rules.v4
apt install iptables-persistent

iptables -I INPUT -s 11.0.0.0/16 -j DROP
iptables-save > /etc/iptables/rules.v4

# Match by source ip or Network Address
iptables -A INPUT -s 192.168.0.20 -j DROP
iptables -A OUTPUT -d 8.0.0.0/8 -j DROP

nslookup www.ubuntu.com
dig www.ubuntu.com

# block big dns site use squid?
iptables -A OUTPUT -d 91.189.90.58 -j DROP
iptables -A OUTPUT -d www.ubuntu.com -j DROP

# -d 0/0
iptables -A OUTPUT -p tcp --dport 443 -d 0/0 -j ACCEPT

# Range
iptables -A INPUT -m iprange --src-range 10.0.0.10-10.0.0.29 -p tcp -dport 25 -j DROP
iptables -A OUTPUT -m addrtype --dst-type MULTICAST -j DROP

# TCP&UDP
iptables -A INPUT -p tcp --dport 22 -j DROP
iptables -A OUTPUT -p tcp -m multiport --dports 80, 443 -j ACCEPT

# PROTOCOLs
cat /etc/protocols

iptables -A INPUT -i wlan0 -j ACCEPT
iptables -A OUTPUT -o enp8s0 ACCEPT

# lo localhost
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# filter all
iptables -A INPUT ! -s 192.168.0.112 -p tcp --dport 443 -j DROP

iptables -A INPUT -i wlan0 -p tcp --syn -s 10.0.0.1 -j ACCEPT

# TCP Flags
iptables -A INPUT -p tcp --dport 22 --syn -j DROP

iptables -A INPUT ! -s 192.168.0.112 -p tcp --dport 22 --syn -j DROP

# statefull firewall
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# mac Address(-i)
iptables -A INPUT -i wlan0 -m mac --mac-source 08:00:27:55:6f:20 -j DROP

# limit
iptables -A FORWARD -m limit --limit 1/minute -p udp --dport 53 -j LOG
iptables -A INPUT -p tcp --syn -m limit --limit 2/s --limit-burst 7 -j ACCEPT

iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/sec --limit-burst 7 -j ACCEPT
ptables -A INPUT -p icmp --icmp-type echo-request -j DROP

tcpdump icmp -n
ping -i 0.1 192.168.0.10

# recent match

# recent blacklist
iptables -A FORWARD -m recent --name badguys --update --seconds 60 -j DROP
iptables -A FORWARD -p tcp -i eth0 --dport 8080 -m recent --name badguys --set -j DROP

#{hackers}
cat /proc/net/xt_recent/LIST_NAME

# Quata Match
iptables -A OUTPUT -d 80.0.0.1 -p tcp --sport 80 -m quota --quota 10000000 -j ACCEPT
iptables -A OUTPUT -d 80.0.0.1 -p tcp --sport 80 -j DROP

tar -cvf file.tar /var
ls -lS file.tar
scp file.tar student@192.168.0.10:~
## Quata stoped because file.tar bigger than 10M
## But transparented

# ipset
apt install ipset
ipset help | less
ipset -N myset hash:ip

iptables -A INPUT -m set --match-set myset src -j DROP

ipset -N china hash:net
ipset create romania hash:net

ipset create romania hash:net -exist
ipset create romania nethash -exist
ipset create romanial hash:ip -exist
ipset create romanial iphash -exist

ipset add china 1.0.0.0/8
ipset -A china 2.0.0.0/8 -exist
ipset list
ipset -L

ipset -L china
ipset del china 1.0.0.0/8
ipset -D china 2.0.0.0/8
## flush
ipset -F china
## flush all
ipset -F
ipset destory romanial
ipset -X romanial
## if iptables use ipset, cant -X
ipset -X
ipset -L romanial

ipset create myset hash:ip maxelem 4096
ipset -L

ipset -N auto_blocked iphash -exist
iptables -I INPUT -p tcp --dport 80 -j SET --add-set auto_blocked src
## ipset -A auto_blocked 1.2.4.5
iptables -I INPUT -m set --match-set auto_blocked src -j DROP

ipset -L auto_blocked



iptables -A INPUT -p icmp --icmp-type echo-request -s 192.168.0.112 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

# net tools
apt install net-tools
netstat -tupan | grep 22

# nmap
nmap -sS -p 22,100 -sV 192.168.0.1
nmap -sT 192.168.0.20
nmap -p 20,22,80,50005 -sV 192.168.0.20

nmap -p- 192.168.0.20
nmap -sU localhost
nmap -sn 192.168.0.0/24

# Reject
iptables -I FORWARD -p udp --dport 69 -j REJECT --reject-with icmp-port-unreachable
iptables -j REJECT --help

iptables -A INPUT -p tcp --dport 22 -s 192.168.0.20 -j REJECT
iptables -A INPUT -p tcp --dport 22 -s 192.168.0.20 -j REJECT --reject-with tcp-reset
tcpdump host 192.168.0.20 -n

nmap -p 22 192.168.0.10

## Reject "unreachable"
iptables -I INPUT -p tcp --dport 22 -s 192.168.0.20 -j REJECT
## Reject with Reset "S."
iptables -I INPUT -p tcp --dport 22 -s 192.168.0.20 -j REJECT --reject-with tcp-reset
## filtered nothing accept Send Twice and give up
iptables -I INPUT -p tcp --dport 22 -s 192.168.0.20 -j DROP

# LOG
iptables -A INPUT -p tcp -dport 22 --syn -j LOG --log-prefix="incoming ssh:" -- log-level info

dmesg | grep "ssh traffic" > ssh.txt
tail -f /var/log/kern.log

# TEE TARGET
iptables -A FORWARD -i eth0 -o eth1 -p tcp -d 80.0.0.1 -j TEE --gateway 10.0.0.10

iptables -A INPUT -p icmp --icmp-type echo-request -j TEE --gateway 192.168.0.20

# Redirect
iptables -t nat -A PREROUTING -p tcp --dport 1234 -j REDIRECT --to-ports 22
netstat -tupan | grep 1234
ssh -p 1234 192.168.0.10
```
