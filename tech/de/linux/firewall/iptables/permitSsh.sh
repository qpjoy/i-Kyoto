#!/bin/bash

iptables -F

iptables -A INPUT -p tcp --dport 22 -s 192.168.0.112 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -s 0/0 -j DROP

iptables  -A INPUT -p tcp -m multiport --dports 80,443 -j DROP