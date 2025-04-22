#!/bin/bash

# flush the filter table from INPUT & from OUTPUT
iptables -F

# permit loopback interface traffic
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

iptables -A INPUT -m state --state INVALID -j DROP
iptables -A OUTPUT -m state --state INVALID -j DROP


# allowed tcp ports
PERMIT_TCP="20 21 25 465 80 443 110 143 993"
for PORT in $PERMIT_TCP
do
  iptables -A INPUT -p tcp --dport $PORT -j ACCEPT
done

# allow DNS traffic
iptables -A INPUT -p udp --dport 53 -j ACCEPT

PERMIT_SSH="192.168.0.145 3.4.5.1 89.0.0.1 90.0.0.1"
for IP in $PERMIT_SSH
do
  iptables -A INPUT -p tcp --dport 22 -s $IP -j ACCEPT
done

# permit no more that $0 concurrent connections from the same ip address to our web server
iptables -A INPUT -p tcp -m multiport --dports 80,443 -m connlimit --connlimit-above 50 -j DROP

# permit all traffic from the following mac addresses
ALLOWED_MAC="08:00:28:64:3e:3c 08:00:28:64:3e:4c 08:00:28:64:3e:5c 08:00:28:64:3e:6c"
for MAC in $ALLOWED_MAC
do
  iptables -A INPUT -m mac --mac-source $MAC -j ACCEPT
done

iptables -A OUTPUT -m state --state NEW,ESTBLISHED,RELATED -j ACCEPT

# set default policy DROP
iptables -P INPUT DROP
iptables -P OUTPUT DROP