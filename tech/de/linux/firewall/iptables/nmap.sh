##** SCAN ONLY YOUR OWN HOSTS AND SERVERS !!! **##
## Scanning Networks is your own responsibility ##

# Syn Scan - Half Open Scanning (root only)
nmap -sS 192.168.0.1

# Connect Scan
nmap -sT 192.168.0.1

# Scanning all ports (0-65535)
nmap -p- 192.168.0.1

# Specifying the ports to scan
nmap -p 20,22-100,443,1000-2000 192.168.0.1

# Scan Version
nmap -p 22,80 -sV 192.168.0.1

# Ping scanning (entire Network)
nmap -sP 192.168.0.0/24

# Excluding an IP
nmap -sS 192.168.0.0/24 --exclude 192.168.0.10

# Saving the scanning report to a file
nmap -oN output.txt 192.168.0.1

# OS Detection
nmap -O 192.168.0.1

https://nmap.org/book/performance-timing-templates.html

-T paranoid|sneaky|polite|normal|aggressive|insane (Set a timing template)
These templates allow the user to specify how aggressive they wish to be, while leaving Nmap to pick the exact
timing values. The templates also make some minor speed adjustments for which fine-grained control options do
not currently exist.

# -A OS and service detection with faster execution
nmap -A -T aggressive cloudflare.com