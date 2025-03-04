# 设置执行策略为 RemoteSigned
$policyValue = "RemoteSigned"

# 设置注册表路径
$registryPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell"

# 检查注册表路径是否存在，如果不存在，则创建
if (-not (Test-Path $registryPath)) {
    New-Item -Path $registryPath -Force | Out-Null
}

# 设置 ExecutionPolicy 值
Set-ItemProperty -Path $registryPath -Name "ExecutionPolicy" -Value $policyValue -Force

# 输出信息
Write-Host "执行策略已经设置为 $policyValue"