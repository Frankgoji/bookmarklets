#! /bin/bash
# This script will take a youtube playlist link and download all the videos in
# the playlist.

function error {
    echo $1
    exit 1
}

function file_exists {
    if [[ -e "$1.mp3" || -e "$1.mp4" ]]; then
        echo true
    fi
}

function file_not_empty {
    # Assumes file exists
    if [[ -s "$1.mp3" || -s "$1.mp4" ]]; then
        echo true
    fi
}

# Uses curl to get the download links and video names
function get_names_links {
    url=$1
    curl -d "playlistok=ok&hd=2" --data-urlencode "playlist=$url" http://www.downvids.net/videoflv.php > req_response
    cat req_response | grep "msgtxt en" | sed -r 's/^ *<span.*>(.*)<\/span>/\1/' > names
    cat req_response | grep "Download as video" | sed -r 's/.*href="(.*)".*/\1/' > links
    lines=$(cat names | wc -l | cut -d' ' -f 1)
    for i in $(seq 1 $lines); do
        name=$(sed "${i}q;d" names)
        if [[ $i -gt 1 && $(sed -n "1,$((i-1))p" names | grep -e "$name$") ]]; then
            name+="1"
        fi
        link=$(sed "${i}q;d" links)
        echo $name $link
    done
    rm req_response
    rm names
    rm links
}

if [[ $# != 2 ]]; then
    error "There should be two arguments: the url and the directory name"
fi

url=$1
echo $url
name=$2
tries=10

if [[ ! -d $name ]]; then
    mkdir $name
fi
cd $name

while read line; do
    name="$(echo $line | sed 's/^\(.*\) .*$/\1/')"
    link=$(echo $line | sed 's/^.* \(.*\)$/\1/')
    name="$(echo $name | sed 's/[/:"*?|]/-/g')"
    try=0
    while [[ (! $(file_exists "$name") || ! $(file_not_empty "$name")) && $try -lt $tries ]]; do
        if [[ $(file_exists "$name") ]]; then
            file_name=$(ls -- "$name"*)
            echo "############# ALERT::: rm $file_name"
            rm -- "$file_name"
        fi
        echo "############# DOWNLOAD::: $name.mp4 $link"
        wget --output-document="$name.mp4" $link
        let "try += 1"
    done
done < <(get_names_links "$url")
