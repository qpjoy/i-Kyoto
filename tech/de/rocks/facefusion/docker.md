```sh
git clone https://github.com/facefusion/facefusion-docker.git
docker compose -f docker-compose.cpu.yml up
docker compose -f docker-compose.cuda.yml up
docker compose -f docker-compose.tensorrt.yml up
docker compose -f docker-compose.rocm.yml up

# remove nsfw model
vi /facefusion/content_analyzer.py
# PROBABILITY_LIMIT = 0.8
# 0.8 => 1
```
