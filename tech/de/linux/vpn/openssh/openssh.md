# openssh

apt install openssh-server

### forwarding

ssh -L 8080:10.3.1.4:80 root@apollo

### proxy

ssh -D 1080 scott@apollo
