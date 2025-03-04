$Path = Get-ChildItem -Path HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty |
Where-Object {$_.DisplayName -like "*Wireshark*"} | Select-Object -ExpandProperty InstallLocation

$CurrentPath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")

If ($CurrentPath -like "*$Path*")
{
  Write-host -f Yellow "$Path already exists in 'Path' Variable!"
  Exit
}
Else
{
  Write-host "Setting Wireshar Environment, Please hold on..."
  # 判断当前脚本是否以管理员权限运行
  if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    # 不是管理员，使用Start-Process以管理员权限重新运行当前脚本
    try {
      Write-Host "Wireshark path. $Path"
      # -FilePath "powershell.exe"
      Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" -Path `"$Path`"" -Verb RunAs -Wait
      # Start-Process powershell.exe -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "`"$PSCommandPath`"", "-Path", "$Path"  -Verb RunAs
    }catch {
      Write-Host "User canceled. $_"
    }

    # 退出当前脚本
    Exit
  }

  # If not, append the path to the PATH environment variable
  $NewPath = $CurrentPath + ";" + $Path

  #Set the New Path
  [System.Environment]::SetEnvironmentVariable("PATH", $NewPath, "Machine")
  Write-host -f Green "Added '$Path' to 'Path' Variable!"
}