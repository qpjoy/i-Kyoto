param (
    [string]$appPath,
    [string]$appParams
)

Start-Process -FilePath $appPath -ArgumentList $appParams