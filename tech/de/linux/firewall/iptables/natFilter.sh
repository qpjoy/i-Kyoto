#!/bin/bash

iptables -F FORWARD
# iptables -F INPUT

PERMITTED_MACS="08:00:27:04:61:21 08:00:27:04:61:22 08:00:27:04:61:23 08:00:27:04:61:24"

for MAC in $PERMITTED_MACS
do
    iptables -A FORWARD -m mac --mac-source $MAC -j ACCEPT
    echo "$MAC permitted"
done

iptables -P FORWARD DROP