#!/bin/bash
## 限制上传
### 1000KB/s
iptables -A FORWARD -m limit -d 10.7.0.3 --limit 700/s --limit-burst 100 -j ACCEPT
iptables -A FORWARD -d 10.7.0.3 -j DROP
### 2000KB/s
iptables -A FORWARD -m limit -d 10.7.0.3 --limit 1400/s --limit-burst 100 -j ACCEPT
iptables -A FORWARD -d 10.7.0.3 -j DROP

## 限制下载
iptables -A FORWARD -m limit -s 10.7.0.3 --limit 1400/s --limit-burst 100 -j ACCEPT
iptables -A FORWARD -s 10.7.0.3 -j DROP

## 取消限制
iptables -D FORWARD -m limit -d 10.7.0.3 --limit 1400/s --limit-burst 100 -j ACCEPT
iptables -D FORWARD -d 10.7.0.3 -j DROP