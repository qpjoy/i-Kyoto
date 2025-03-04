# Define the Steam registry path to search under
$steamPath = "HKLM:\Software\Valve\Steam"

# Get the Steam install path
$steamRegistry = Get-ItemProperty -Path $steamPath -ErrorAction SilentlyContinue

if ($steamRegistry) {
    $steamInstallPath = $steamRegistry.InstallPath

    # Define the OBS Studio relative path within the Steam library
    $obsRelativePath = "steamapps\common\OBS Studio\bin\64bit\obs64.exe"

    # Construct the full path to the OBS Studio executable
    $obsFullPath = Join-Path -Path $steamInstallPath -ChildPath $obsRelativePath

    if (Test-Path -Path $obsFullPath) {
        # Launch OBS Studio
        Start-Process -FilePath $obsFullPath
    } else {
        Write-Output "OBS Studio executable not found at the expected path."
    }
} else {
    Write-Output "Steam registry key not found."
}