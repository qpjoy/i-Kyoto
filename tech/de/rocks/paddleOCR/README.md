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
