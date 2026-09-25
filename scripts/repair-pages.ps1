# One-off repair: remove duplicated page blocks / stray markers from the
# incremental authoring session. Idempotent — safe to re-run.
$ErrorActionPreference = 'Stop'
$dir = Join-Path $PSScriptRoot '..\src\data\pages'

# 1) whatWeDo.js: drop the duplicated LNG/renewable/low-carbon/hydrogen entry set
$p = Join-Path $dir 'whatWeDo.js'
$l = [IO.File]::ReadAllText($p) -split \"\r?\n\"   # UTF-8-safe; PS5 Get-Content reads ANSI and corrupts text
$liq = @(); for ($i = 0; $i -lt $l.Count; $i++) { if ($l[$i] -match "slug: 'liquefied-natural-gas-lng'") { $liq += $i } }
if ($liq.Count -eq 2) {
  $mk = @(); for ($i = 0; $i -lt $l.Count; $i++) { if ($l[$i].Trim() -eq '// +MORE') { $mk += $i } }
  $s = $liq[1] - 1        # opening '{' of the duplicated copy
  $e = $mk[$mk.Count - 1] # final marker (exclusive end)
  $new = @(); for ($i = 0; $i -lt $l.Count; $i++) { if ($i -lt $s -or $i -ge $e) { $new += $l[$i] } }
  [IO.File]::WriteAllText($p, (($new -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
  Write-Output "whatWeDo: removed duplicate block ($($l.Count) -> $($new.Count) lines)"
} elseif ($liq.Count -eq 1) {
  Write-Output 'whatWeDo: already clean'
} else {
  throw "whatWeDo: unexpected liquefied slug count $($liq.Count)"
}

# 2) Keep only the LAST // +MORE marker in each in-progress file
foreach ($name in 'whoWeAre', 'whatWeDo', 'sustainability', 'news', 'investors') {
  $fp = Join-Path $dir ($name + '.js')
  $lines = [IO.File]::ReadAllText($fp) -split \"\r?\n\"  # UTF-8-safe read
  $idx = @(); for ($i = 0; $i -lt $lines.Count; $i++) { if ($lines[$i].Trim() -eq '// +MORE') { $idx += $i } }
  if ($idx.Count -gt 1) {
    $drop = $idx[0..($idx.Count - 2)]
    $new = @(); for ($i = 0; $i -lt $lines.Count; $i++) { if ($drop -notcontains $i) { $new += $lines[$i] } }
    [IO.File]::WriteAllText($fp, (($new -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
    Write-Output "${name}: removed $($idx.Count - 1) stray marker(s)"
  } else {
    Write-Output "${name}: $($idx.Count) marker(s) ok"
  }
}

# 3) Slug inventory for verification
foreach ($name in 'whoWeAre', 'whatWeDo', 'sustainability', 'news', 'investors', 'utility') {
  $fp = Join-Path $dir ($name + '.js')
  $slugs = Select-String -Path $fp -Pattern "slug: '([^']+)'" | ForEach-Object { $_.Matches[0].Groups[1].Value }
  Write-Output "$name ($($slugs.Count)): $($slugs -join ', ')"
}
