# remove big files in commited history
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch path_to_file" HEAD