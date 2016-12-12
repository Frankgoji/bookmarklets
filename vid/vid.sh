#! /bin/bash
# This script will take a youtube playlist link and download all the videos in
# the playlist.

function error {
    echo $1
    exit 1
}

if [[ $# != 2 ]]; then
    error "There should be two arguments: the url and the groupname"
fi

url=$1
name=$2
tries=10

if [[ ! -d $name ]]; then
    mkdir $name
fi
cd $name

while read line; do
    name="$(echo $line | sed 's/^\(.*\) .*$/\1/').mp4"
    link=$(echo $line | sed 's/^.* \(.*\)$/\1/')
    try=0
    while [[ (! -e $name || ! -s $name) && $try -lt $tries ]]; do
        if [[ -e $name ]]; then
            rm $name
        fi
        wget --output-document="$name" $link
        let "try += 1"
    done
done < <(python3 ~/Documents/personal_projects/bookmarklets/vid/get_links.py $url)

rm geckodriver.log
