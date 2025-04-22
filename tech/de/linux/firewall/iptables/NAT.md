```bash
echo "1" > /proc/sys/net/ipv4/ip_forward
# vi /etc/sysctl.conf
# net.ipv4.ip_forward=1

iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j SNAT --to-source 80.0.0.1
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE

# DNAT
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 10.0.0.2
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 10.0.0.2:80

# CHAIN
iptables -N MYCHAIND
iptables -vnL
iptables -A MYCHAIN -p icmp --icmp-type echo-request -j DROP
iptables -A INPUT -j MYCHAIN
# iptables Too many links
iptables -X MYCHAIN
iptables -F MYCHAIN
# cant -X reference
iptables -F
iptables -X MYCHAIN
```
