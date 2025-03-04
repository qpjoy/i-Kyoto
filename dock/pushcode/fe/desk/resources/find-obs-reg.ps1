# Define the exact path to search under
$exactPath = "HKLM:\software\obs studio"

# Get the default value directly
$registryKey = Get-Item -Path $exactPath -ErrorAction SilentlyContinue

if ($registryKey) {
    $defaultValue = $registryKey.GetValue("")
    $output = [PSCustomObject]@{
        Path = $exactPath
        DefaultValue = $defaultValue
    }

    # Convert the output to JSON
    $output | ConvertTo-Json -Depth 3
} else {
    Write-Output "The registry key was not found."
}