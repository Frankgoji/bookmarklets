#! /bin/bash
# This script will take a youtube playlist link and download all the videos in
# the playlist.

function error {
    echo $1
    exit 1
}

function file_exists {
    if [[ $(ls | grep -F "$1") ]]; then
        echo true
    fi
}

function file_not_empty {
    # Assumes file exists
    file_name=$(ls "$1"*)
    if [[ -s $file_name ]]; then
        echo true
    fi
}

if [[ $# != 2 ]]; then
    error "There should be two arguments: the url and the directory name"
fi

url=$1
name=$2
tries=10

if [[ ! -d $name ]]; then
    mkdir $name
fi
cd $name

while read line; do
    name="$(echo $line | sed 's/^\(.*\) .*$/\1/')"
    name="$(echo $name | sed 's/\//\|/g')"
    link=$(echo $line | sed 's/^.* \(.*\)$/\1/')
    try=0
    while [[ (! $(file_exists "$name") || ! $(file_not_empty "$name")) && $try -lt $tries ]]; do
        if [[ $(file_exists "$name") ]]; then
            file_name=$(ls "$name"*)
            rm "$file_name"
        fi
        wget --output-document="$name.mp4" $link
        let "try += 1"
    done
done < <(python3 ~/Documents/personal_projects/bookmarklets/vid/get_links.py $url)

rm geckodriver.log
