# Search for software similar to Wireshark in registry

# Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Where-Object {$_.DisplayName -like "*Wireshark*"} | Select-Object DisplayName, DisplayVersion, InstallLocation
# DisplayName         DisplayVersion InstallLocation
# -----------         -------------- ---------------
# Wireshark 4.2.3 x64 4.2.3          D:\Program Files\Wireshark

# Find installed software via registry
# Get-ChildItem -Path HKLM:\SOFTWARE\Wow6432node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty |
# # Where-Object {$_.DisplayName -like "*Wireshark*"} |
# Select-Object DisplayName, DisplayVersion, InstallLocation | Select-String "Wireshark"
Get-ChildItem -Path HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty |
Where-Object {$_.DisplayName -like "*OBS*"} | Select-Object -ExpandProperty DisplayIcon