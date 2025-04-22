#!/bin/bash

iptables -t nat -A POSTROUTING -s 10.8.0.0/24 ! -d 10.8.0.0/24 -j SNAT --to $ip
iptables -I INPUT -p $protocol --dport $port -j ACCEPT
iptables -I FORWARD -s 10.8.0.0/24 -j ACCEPT
iptables -I FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -o eth0 -s 10.8.0.0/24 -j SNAT --to-source 120.120.120.120
iptables -t nat -A POSTROUTING -o eth0 -s 10.7.0.0/24 -j SNAT --to-source 120.120.120.121
iptables -t nat -A POSTROUTING -o eth0 -s 10.6.0.0/24 -j SNAT --to-source 120.120.120.122

systemctl disable --now openvpn-iptables.service


# TO block ip
180.101.88.250
79-142-95-10.obit:40970

# extension script
# iptables: /etc/systemd/system/openvpn-iptables.service
## close openvpn
systemctl disable --now openvpn-server@server.service
systemctl disable --now openvpn-iptables.service
service openvpn stop
## open openvpn
echo "[Service]                                 
LimitNPROC=infinity" > /etc/systemd/system/openvpn-server@server.service.d/disable-limitnproc.conf
systemctl enable --now openvpn-server@server.service
systemctl enable --now openvpn-iptables.service
service openvpn start