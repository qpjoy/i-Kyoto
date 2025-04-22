#!/bin/bash

echo -n 'Enter the IP or Network Address'
read IP

echo 'Enter DROP or ACCEPT'
read ANSWER

if [ $ANSWER = "DROP" ]
then
    echo "Traffic from $IP has been dropped"
elif [ $ANSWER = "ACCEPT" ]
then
    echo "Traffic from $IP has been accepted"
else
    echo "Invalid option. Enter DROP or ACCEPT"
fi