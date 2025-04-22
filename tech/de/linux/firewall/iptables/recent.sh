#!/bin/bash

iptables -F

iptables -A INPUT -p tcp --dport 25 -m time --timestart 8:00 --timestop 22:00 -m recent \
--name hackers --set -j DROP