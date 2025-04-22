#!/bin/bash

IPS="129.55.3.4 10.0.0.1 5.5.5.5 4.4.4.4"

echo "The value of variable IPS is $IPS"

echo "\$1 is $1"
echo "\$2 is $2"
echo "\$3 is $3"
echo "\$4 is $4"

echo "\$# is $#"

for IP in $IPS
do
  echo "IP is $IP"
done

if [ $1 -eq 55 ]
then
  echo "\$1 is 55"
else
  echo "\$1 is not 55"
fi