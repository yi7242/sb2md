#!/bin/bash
USERNAME=`powershell.exe '$env:USERNAME' | tr -d '\r'`
echo ${USERNAME}
cp -r --preserve=timestamps ./output /mnt/c/Users/${USERNAME}/Desktop/