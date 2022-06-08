
### nodejs installieren
$node_url = "https://nodejs.org/dist/v16.15.1/node-v16.15.1-x64.msi"
if (Get-Command node -errorAction SilentlyContinue) {
    $node_version = (node -v)
    write-host "  node hat die Version $node_version"
}else{

    $filename = "node.msi"
    $node_msi = "$PSScriptRoot\$filename"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($node_url, $node_msi)
    Start-Process $node_msi -Wait
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

### python installieren
$python_url = "https://www.python.org/ftp/python/3.10.5/python-3.10.5-amd64.exe"
if (Get-Command python -errorAction SilentlyContinue) {
    $python_version = (python --version)
    write-host "  Python hat die Version $python_version"
}else{
    $python_exe = "$PSScriptRoot\python.exe"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($python_url, $python_exe)
    Start-Process $python_exe -Wait
    #$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

### Git installieren
$git_url = "https://github.com/git-for-windows/git/releases/download/v2.36.1.windows.1/Git-2.36.1-64-bit.exe"

if (Get-Command git -errorAction SilentlyContinue) {
    $git_version = (git --version)
    write-host "  $git_version"
}else{
    $git_exe = "$PSScriptRoot\git.exe"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($git_url, $git_exe)
    start-Process $git_exe -Wait
}

###Clone the Repository
if (Test-Path -Path "$PSScriptRoot\koelender_projekt" ) {
    write-host "Repository existiert schon"
} else {
    git clone https://github.com/AbdelrahmanShahin181/WebTech2.git "$PSScriptRoot\koelender_projekt"
}

### pip requirements installieren 
pip install -r "$PSScriptRoot\requirements.txt"

### npm rependencies installieren
npm install $PSScriptRoot\koelender_projekt\koelender\frontend\

### npm run build
npm --prefix $PSScriptRoot\koelender_projekt\koelender\frontend\ run build

### Python runserver
python $PSScriptRoot\koelender_projekt\koelender\manage.py runserver 8000
python $PSScriptRoot\koelender_projekt\koelender\manage.py makemigrations 
python $PSScriptRoot\koelender_projekt\koelender\manage.py migrate





 
    


