blocks=$(ls blocks)

for block in $blocks
do
    cd blocks/$block
    npm run build
    cd -
done