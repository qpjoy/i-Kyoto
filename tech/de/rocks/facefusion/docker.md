```sh
git clone https://github.com/facefusion/facefusion-docker.git
docker compose -f docker-compose.cpu.yml up
docker compose -f docker-compose.cuda.yml up
docker compose -f docker-compose.tensorrt.yml up
docker compose -f docker-compose.rocm.yml up
```
