#!/bin/bash

iptables -F

iptables -t filter -A INPUT -p tcp --dport 22 -s 192.168.0.20 -j ACCEPT
iptables           -A INPUT -p tcp --dport 22                 -j DROP