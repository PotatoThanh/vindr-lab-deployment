#!/bin/bash
source env.sh
mkdir keycloak-db
mkdir data
sudo chmod -R +777 keycloak-db  
sudo chmod -R +777 data  
docker-compose pull
docker-compose down
docker-compose up -d --remove-orphans
sudo chmod -R +777 keycloak-db  
sudo chmod -R +777 data 
