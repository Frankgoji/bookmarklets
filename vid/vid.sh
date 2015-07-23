#! /bin/bash
# This script will take a youtube playlist link and download all the videos in
# the playlist.

function error {
    echo $1
    exit 1
}

if [[ $# != 1 ]]; then
    error "Should only be one argument: the url"
fi

url=$1

links=$(python3 ~/Documents/personal_projects/bookmarklets/vid/get_links.py $url)
arr_links=(${links//;/ })
i=0
for l in "${arr_links[@]}"; do
    printf -v j "%02d" $i
    let "i += 1"
    wget --output-document=$j $l
done
