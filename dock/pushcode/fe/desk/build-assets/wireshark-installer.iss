[Setup]
AppName=推流码助手
AppVersion=1.0
DefaultDirName={pf}\PushCode推流助手
DisableDirPage=no ; Allow user to choose installation directory
UninstallDisplayIcon={app}\PushCode推流助手.exe
OutputDir=.
OutputBaseFilename=Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern

[Files]
Source: "{src}\push-code\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Run]
Filename: "node.exe"; Parameters: "install-wireshark.js"; WorkingDir: "{app}"; Flags: waituntilterminated