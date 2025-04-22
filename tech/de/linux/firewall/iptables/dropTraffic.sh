#!/bin/bash

iptables -t nat -F
iptables -F
# dropping incoming ssh traffic
iptables -A INPUT -p tcp --dport 22 -j DROP

# dropping outgoing http and https traffic
iptables -A OUTPUT -p tcp --dport 80 -j DROP
iptables -A OUTPUT -p tcp --dport 443 -j DROP

iptables -t nat -A POSTROUTING -s 10.0.0.0/8 -o enp0s3 -j SNAT --to-source 80.0.0.1
iptables -t nat -vnL