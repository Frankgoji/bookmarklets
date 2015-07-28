#! /bin/bash
# Given a file of magnet links, translates them all to torrent files and saves
# them to rtorrent's watch directory.

function error {
    echo "$@"
    exit 1
}

if [[ $# != 1 ]]; then
    error "There should be only one argument: the file of magnet links."
fi

file=$1
if [[ ! -a $file ]]; then
    error "Not a valid file."
fi

while read line; do
    [[ "$line" =~ xt=urn:btih:([^&/]+) ]] || exit;
    echo "d10:magnet-uri${#line}:${line}e" > "meta-${BASH_REMATCH[1]}.torrent"
done <$file
mv *.torrent ~/Downloads/.rt_watch

rtorrent
