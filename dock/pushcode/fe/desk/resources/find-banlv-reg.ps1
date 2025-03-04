# Define the root path to search under
$rootPath = "HKCU:\Software"

# Define the search term
$searchTerm = "webcast_mate"

# Get all subkeys at one level under the root path
$subkeys = Get-ChildItem -Path $rootPath -ErrorAction SilentlyContinue

foreach ($subkey in $subkeys) {
    # Get the current path
    $currentPath = $subkey.PSPath

    # Check if the InstallLocation value exists in the current path
    $value = Get-ItemProperty -Path $currentPath -Name "InstallLocation" -ErrorAction SilentlyContinue

    if ($value -and $value.InstallLocation -like "*$searchTerm*") {
        # Output the InstallLocation value
        [PSCustomObject]@{
            Path = $currentPath
            InstallLocation = $value.InstallLocation
        } | ConvertTo-Json
    }
}