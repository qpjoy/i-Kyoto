#!/bin/bash
firewall-cmd --remove-port=336/udp
firewall-cmd --zone=trusted --remove-source=10.7.0.0/24
firewall-cmd --permanent --remove-port=336/udp
firewall-cmd --direct --remove-rule ipv4 nat POSTROUTING 0 -s 10.7.0.0/24 ! -d 10.7.0.0/24 -j SNAT --to 162.209.236.130
systemctl disable --now wg-quick@wg0.service
rm -f /etc/systemd/system/wg-quick@wg0.service.d/boringtun.conf
rm -f /etc/sysctl.d/99-wireguard-forward.conf
rm -rf /etc/wireguard/
apt-get remove --purge -y wireguard wireguard-tools


### wg manual
systemctl status wg-quick@wg0.service
ip addr show wg0
wg show wg0

### wg stop
systemctl disable --now wg-iptables.service
rm -f /etc/systemd/system/wg-iptables.service
systemctl disable --now wg-quick@wg0.service
rm -f /etc/sysctl.d/99-wireguard-forward.conf
rm -rf /etc/wireguard/
apt-get remove --purge -y wireguard wireguard-tools