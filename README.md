Usage:
```
nvm use 16.20.2
cd docs
npm i
npm run dev
```

Work in `develop` as usual, commit the process as normal, then just execute `deploy.sh`. This publishes the dist to master, and updates the page.

In case deploy.sh gives issues,


ref: https://stackoverflow.com/a/64840744
```
Open git bash terminal
type ssh-keygen and hit enter
then terminal will ask to enter the file name to save the rsa key.you can hit enter not
-typing anything
After that terminal will ask for other information too. without typing anything just hit enter By completing every steps a rsa key will be generate in the mentioned file.
Go to C:\Users\<username>\.ssh and open a file named id_rsa.pub in notepad and copy the key
then go to your github account Settings and select the option SSH and GPS keys .
Create a new ssh key with a title and the key you just copied (you just generated) hit save now if you try to push by git push origin master I hope you wont get any error
```