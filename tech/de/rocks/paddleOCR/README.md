```bash
git clone  https://github.com/PaddlePaddle/PaddleOCR.git
sudo apt install python3-pip -y
python3 -m pip install paddlepaddle

git checkout release/3.0
python3 -m pip install -r requirements.txt
apt install -y libgl1
pip install pdf2docx

# use pdf2docx *** Better
python3 pdf2word_server.py --input="/Users/qpjoy/Downloads/Y25 KOL 社群运营 Brief_FA _1230.pdf" --output="/Users/qpjoy/Downloads/output" --use_pdf2docx

# use imageBased
python3 pdf2word_server.py --input="/Users/qpjoy/Downloads/Y25 KOL 社群运营 Brief_FA _1230.pdf" --output="/Users/qpjoy/Downloads/output" --lang CN


# 如果服务器版本不支持gpu 或者 cpu版本较老
# downgrade numpy and opencv
pip uninstall numpy opencv-python opencv-contrib-python -y
pip install numpy==1.26.4
pip install opencv-python==4.8.0.74
python3 -c "import numpy; print(f'NumPy version: {numpy.__version__}')"
python3 -c "import cv2; print(f'OpenCV version: {cv2.__version__}')"
```

```bash
# old version

# env
apt install -y software-properties-common build-essential \
  zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev \
  libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget curl libbz2-dev
cd /usr/src
sudo wget https://www.python.org/ftp/python/3.8.18/Python-3.8.18.tgz
sudo tar xzf Python-3.8.18.tgz
cd Python-3.8.18
sudo ./configure --enable-optimizations
sudo make -j$(nproc)
sudo make altinstall
python3.8 --version

sudo apt install -y python3.8-distutils
python3.8 -m ensurepip --upgrade
python3.8 -m pip install virtualenv

# Create venv /usr/src/paddle_env38
python3.8 -m virtualenv paddle_env38
# source paddle_env38/bin/activate
source /usr/src/Python-3.8.18/paddle_env38/bin/activate


### after env38
apt install python3.8 python3.8-venv -y
python3.8 -m venv paddle_env
source paddle_env/bin/activate

python -m pip install --upgrade pip==22.3.1 setuptools==58.0.4 wheel
pip install numpy==1.21.6
pip install paddlepaddle==2.5.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
#pip install paddlepaddle-gpu==2.4.2.post112 -f https://www.paddlepaddle.org.cn/whl/mkl/avx/stable.html
```

###

```bash
python3.8 -m pip install "PyMuPDF<1.22"

pip install python-bidi


# git dict
https://git.imagedt.com/shixin/daneng_b2b_mtzfpocr/-/blob/f23dafa8d5ca0c891a5215800bcc90e4d793bef4/pdOcr/paddleocr.py
```
