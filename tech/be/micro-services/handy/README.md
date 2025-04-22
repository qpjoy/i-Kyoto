### docker basics

DOCKER_BUILDKIT=0 docker build -t qpjoy/posts .
docker run qpjoy/posts
docker ps
docker run -it qpjoy/posts sh

docker build -t qpjoy/posts:0.0.1 .

### kube

kubectl version
k apply -f posts.yaml

kubectl exec posts -it -- sh
kubectl logs posts
kubectl delete pod posts
k describe pod posts

cd infra/k8s
kubectl apply -f posts.yaml
kubectl get pods

kubectl apply -f posts-depl.yaml
kubectl exec -it posts sh
kubectl logs posts
kubectl delete pod posts
kubectl describe pod posts

kubectl get deployments
kubectl delete pod [pod_name]
kubectl describe deployment posts-depl
kubectl delete deployment posts-depl

docker push qpjoy/posts

k get deployment
k rollout restart deployment posts-depl

k apply -f posts-srv.yaml
k get services
k describe service posts-srv

docker build -t qpjoy/event-bus .
docker push qpjoy/event-bus
k rollout restart deployment event-bus-depl

#### 部署所有文件

k apply -f .

#### ingress nginx

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

k explain ingress.spec.rules.http.paths.backend.service

#### 端口映射测试

k port-forward svc/comments-srv 4001:4001

### skaffold update code in pod

https://skaffold.dev/

curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-darwin-amd64 && \
sudo install skaffold /usr/local/bin/
