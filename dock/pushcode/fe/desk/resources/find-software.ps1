# Function to retrieve a list of installed software
function Get-InstalledSoftware {
    $software = Get-WmiObject -Class Win32_Product
    foreach ($app in $software) {
        [PSCustomObject]@{
            Name = $app.Name
            Version = $app.Version
            Vendor = $app.Vendor
        }
    }
}

# Usage: Get a list of installed software
Get-InstalledSoftware | Format-Table -AutoSize