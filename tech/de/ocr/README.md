# PaddleOCR

## Start

```bash
# https://aistudio.baidu.com/projectoverview/public/58?kw=paddleocr
git clone https://github.com/PaddlePaddle/PaddleOCR.git
pip install -r requirements.txt

mkdir inference
cd inference && wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_det_infer.tar && tar xf ch_ppocr_mobile_v2.0_det_infer.tar && rm ch_ppocr_mobile_v2.0_det_infer.tar

pip install paddleocr
python -m pip install paddlepaddle==3.0.0 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_det_infer.tar && tar xf ch_ppocr_mobile_v2.0_det_infer.tar && rm ch_ppocr_mobile_v2.0_det_infer.tar
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_rec_infer.tar && tar xf ch_ppocr_mobile_v2.0_rec_infer.tar && rm ch_ppocr_mobile_v2.0_rec_infer.tar
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar && tar xf ch_ppocr_mobile_v2.0_cls_infer.tar && rm ch_ppocr_mobile_v2.0_cls_infer.tar
python3 tools/infer/predict_system.py --image_dir="./doc/imgs/" \
--det_model_dir="./inference/ch_ppocr_mobile_v2.0_det_infer"  \
--rec_model_dir="./inference/ch_ppocr_mobile_v2.0_rec_infer" \
--cls_model_dir="./inference/ch_ppocr_mobile_v2.0_cls_infer"
```
