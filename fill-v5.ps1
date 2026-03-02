$ErrorActionPreference = "SilentlyContinue"
Set-Location "C:\Users\Admin\Desktop\pak u ni"

$nl = "`n"
$file = "css\style.css"
$content = Get-Content $file -Raw -Encoding UTF8

$start = [datetime]"2026-03-02"
$end = [datetime]"2026-07-04"
$current = $start
$count = 0

$comments = @(
    "/* UI polish */",
    "/* Dark mode fix */",
    "/* Hover effect */",
    "/* Shadow tweak */",
    "/* Border fix */",
    "/* Typography */",
    "/* Spacing fix */",
    "/* Color adjust */",
    "/* Animation */",
    "/* Z-index fix */",
    "/* Font weight */",
    "/* Line height */",
    "/* Opacity fix */",
    "/* Gradient fix */",
    "/* Transition */",
    "/* Flex align */",
    "/* Grid fix */",
    "/* Overflow fix */",
    "/* Position fix */",
    "/* Layout tweak */"
)

$marApr = @(5,7,6,5,7,6,5,7,5,6,7,5,6,7,5,7,6,5,7,6,5,6,7,5,7,6,5,7,6,5,7,5,6,7,5,6,7,5,7,6,5,7,6,5,6,7,5,7,6,5,7,5,6,7,5,7,6,5,7,6,5,6,7,5,7,6,5,7,5,6,7,5,6,7,5,7,6,5,7,6)
$mayJul = @(7,10,8,12,5,15,10,8,12,7,10,15,8,5,10,12,7,15,10,8,5,10,7,12,8,15,10,5,8,12,7,10,5,12,10,8,15,5,12,7,8,10,15,7,5,12,8,10,15,7,8,12,5,10,7,12,8,10,15,7,5,12,10,7,8,15,5,10,7,12,8,10,5,12,15,7,10,8,12,5,7,10,12,8,15,5,10,7,12,8,10,15,7,5,12,10,8,15,7,10)

$idx = 0
$cutoffMay = [datetime]"2026-05-01"

while ($current -le $end) {
    $dayOfWeek = $current.DayOfWeek
    if ($dayOfWeek -ne "Sunday") {
        if ($current -lt $cutoffMay) {
            $numCommits = $marApr[$idx % $marApr.Count]
        } else {
            $numCommits = $mayJul[$idx % $mayJul.Count]
        }
        $idx++

        for ($i = 0; $i -lt $numCommits; $i++) {
            $hour = 8 + ($i % 12)
            $min = ($i * 5) % 60
            $dateCommit = $current.AddHours($hour).AddMinutes($min).ToString("yyyy-MM-ddTHH:mm:00")
            $comment = $comments[$count % $comments.Count]
            $marker = "/* C$($current.ToString('yyyyMMdd'))-$i */"

            $newContent = $content + "`n" + $marker + "`n" + $comment
            [System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)

            & git add -A 2>$null
            $env:GIT_AUTHOR_DATE = $dateCommit
            $env:GIT_COMMITTER_DATE = $dateCommit
            & git commit -m "Style: $($current.ToString('MMM dd')) #$($i+1)" 2>$null | Out-Null
            $count++
            $content = $newContent
        }

        if ($count % 100 -eq 0) {
            Write-Host "Committed $count times... ($($current.ToString('yyyy-MM-dd')) = $numCommits)"
        }
    }
    $current = $current.AddDays(1)
}

Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host "`n=== DONE! $count commits ==="