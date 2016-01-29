#! /bin/bash

# Download the swing files from the URLs collected by swing_urls.py using wget

# URL Table
declare -A URLS=(
["very_fast"]="https://www.dropbox.com/sh/gkmaexi8m6wnt5w/AAAiVDLOCk-y8L8syHw3szPaa/Swing/Very%20Fast%20%28190%2Bbpm%29?dl=0"
["fast_swing"]="https://www.dropbox.com/sh/gkmaexi8m6wnt5w/AAAbZQ9r0x6Q1NqgdGdeVnPFa/Swing/Fast%20(160-190bpm)?dl=0"
["medium_swing"]="https://www.dropbox.com/sh/gkmaexi8m6wnt5w/AAARPF6vtFnm1CGSNU06rWBOa/Swing/medium%20%28120-160bpm%29?dl=0"
["slow_swing"]="https://www.dropbox.com/sh/gkmaexi8m6wnt5w/AAATW0n2L6nvBvLI2hsodSboa/Swing/Slow%20%2880-120bpm%29?dl=0"
["very_slow"]="https://www.dropbox.com/sh/gkmaexi8m6wnt5w/AAATY2YlQBA-Gwgv9tC6zVq2a/Swing/slow%20%28%3C120bpm%29?dl=0"
)

cd ~/Music/Swing
for url in "${!URLS[@]}"; do
    mkdir "$url"
    cd "$url"
    python3 ~/Documents/personal_projects/bookmarklets/swing/swing_urls.py "${URLS["$url"]}" | sort -u \
        | sed 's/|/ -nc -O \"/' | sed 's/$/\"/' | sed 's/^/wget /' | while read line; do eval $line; done
    cd ..
done
