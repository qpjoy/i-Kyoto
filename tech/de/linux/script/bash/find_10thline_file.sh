# 1
if [ $(wc -l < file.txt) -lt 10 ]; then
    echo ""
else
    sed -n '10p' file.txt
    # awk "NR==10" file.txt 
fi

# 2
count=0
while IFS= read -r line; do
    count=$((count + 1))
    if [ "$count" -eq 10 ]; then
        echo "$line"
        exit
    fi
done < file.txt