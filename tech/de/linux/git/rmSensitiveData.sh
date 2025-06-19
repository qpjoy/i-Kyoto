git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch tech/de/docker/nginx/nginx.services.conf' \
  --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push --force --all
git push --force --tags