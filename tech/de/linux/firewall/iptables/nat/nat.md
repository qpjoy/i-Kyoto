# NAT

```bash
sysctl -w net.ipv4.ip_forward=1
cat /proc/sys/net/ipv4/ip_forward
# 1
ip a
route -n
route del -net 0.0.0.0
route add default gw 172.16.1.70
route -n

# DNAt
iptables -t nat -A PREROUTING -d 172.16.1.70 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.10
ss -tnl
ip a
# SNAT
iptables -vnL -t nat
iptables -t nat -D PREROUTING 1
iptables -t nat -A POSTROUTING -s 172.16.1.70 -j SNAT --to-source 192.168.1.254

iptables -t nat -R POSTGROUTING 1 -s 172.16.0.0/16 -j SNAT --to-source 192.168.1.254
```
