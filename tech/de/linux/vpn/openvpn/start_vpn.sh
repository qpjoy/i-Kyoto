#!/bin/bash

echo "[Service]                                 
LimitNPROC=infinity" > /etc/systemd/system/openvpn-server@server.service.d/disable-limitnproc.conf
systemctl enable --now openvpn-server@server.service
systemctl enable --now openvpn-iptables.service
service openvpn start