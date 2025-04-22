#!/bin/bash

systemctl disable --now openvpn-server@server.service
systemctl disable --now openvpn-iptables.service
service openvpn stop