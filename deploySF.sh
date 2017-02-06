 meteor bundle bundle.tgz 
wait
tar -zxvf bundle.tgz
wait
cd bundle/programs/server/
sudo npm install
wait
cd ../../..
PORT=8080 MONGO_URL=mongodb://localhost:27017/meteor ROOT_URL=http://www.kollbothkhmer.com nohup node bundle/main.js &
