echo "KILL NODE"
sudo killall node
wait
echo "DELTE BUNDLE"
sudo rm bundle bundle.tgz -rf
wait
git pull
wait
echo "ZIPPING..."
 meteor bundle bundle.tgz 
wait
echo "UNZIPPING"
sudo tar -zxvf bundle.tgz
wait
cd bundle/programs/server/
echo "INSTALLING PACKAGES"
sudo npm install
wait
cd ../../..
pwd
echo "launching node"
PORT=8080 MONGO_URL=mongodb://localhost:27017/meteor ROOT_URL=http://www.kollbothkhmer168.com nohup node bundle/main.js &

