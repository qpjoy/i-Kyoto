import os
import sys
import fitz  # PyMuPDF
import cv2
import numpy as np
from PIL import Image
from paddle.utils import try_import
import argparse

# Try to import pdf2docx. Converter
# Make it optional, so the script still runs if pdf2docx is not installed
pdf2docx_converter = None
try:
    from pdf2docx.converter import Converter
    pdf2docx_converter = Converter
except ImportError:
    print("Warning: pdf2docx library not found. PDF direct conversion to DOCX will not be available.")
    print("To enable, install with: pip install pdf2docx")


# Add root path for imports
file = os.path.dirname(os.path.abspath(__file__))
root = os.path.abspath(os.path.join(file, "../../"))
sys.path.append(file)
sys.path.insert(0, root)

from ppstructure.predict_system import StructureSystem, save_structure_res
from ppstructure.recovery.recovery_to_doc import sorted_layout_boxes, convert_info_docx

def read_pdf_images(pdf_path):
    imgs = []
    with fitz.open(pdf_path) as pdf:
        for pg in range(0, pdf.page_count):
            page = pdf[pg]
            mat = fitz.Matrix(2, 2)
            pm = page.get_pixmap(matrix=mat, alpha=False)

            if pm.width > 2000 or pm.height > 2000:
                pm = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)

            img = Image.frombytes("RGB", [pm.width, pm.height], pm.samples)
            img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            imgs.append(img)
    return imgs

def init_predictor(parsed_args, lang="CN", save_pdf=False):
    args = parsed_args

    # --- Start of commonly expected arguments for PaddleOCR/PaddleStructure ---
    args.use_gpu = False
    args.use_xpu = False
    args.use_npu = False
    args.use_mlu = False
    args.use_gcu = False
    args.ir_optim = True
    args.use_tensorrt = False
    args.min_subgraph_size = 15
    args.precision = 'fp32'
    args.gpu_mem = 500
    args.gpu_id = 0
    args.image_dir = None
    args.page_num = 0
    args.max_batch_size = 10
    args.enable_mkldnn = False
    args.cpu_threads = 10
    args.use_onnx = False
    args.output = None
    args.ocr_order_method = 'fast'
    args.image_orientation = False
    args.layout = True
    args.table = True
    args.formula = False
    args.recovery_to_markdown = False
    args.use_pdf2docx_api = False # This is for PaddleOCR's internal flag, not our main switch
    args.invert = False
    args.binarize = False
    args.alphacolor = False
    args.drop_score = 0.5
    args.show_log = False
    args.benchmark = False
    args.save_log_path = "./log_output/"
    args.use_mp = False
    args.total_process_num = 1
    args.process_id = 0
    args.warmup = 0
    args.draw_img_save_dir = "./output/"
    args.save_crop_res = False
    args.crop_res_save_dir = "./output/"
    args.return_word_box = False

    args.mode = 'structure'

    args.det_algorithm = 'DB'
    args.det_limit_side_len = 960
    args.det_limit_type = 'max'
    args.det_box_type = 'quad'
    args.det_db_thresh = 0.3
    args.det_db_box_thresh = 0.6
    args.det_db_unclip_ratio = 1.5
    args.use_dilation = False
    args.det_db_score_mode = 'fast'
    args.det_east_score_thresh = 0.8
    args.det_east_cover_thresh = 0.1
    args.det_east_nms_thresh = 0.2
    args.det_sast_score_thresh = 0.8
    args.det_sast_nms_thresh = 0.2
    args.det_pse_thresh = 0
    args.det_pse_box_thresh = 0.85
    args.det_pse_min_area = 16
    args.det_pse_scale = 1
    args.scales = [8, 16, 32]
    args.alpha = 1.0
    args.beta = 1.0
    args.fourier_degree = 5

    args.rec_algorithm = 'SVTR_LCNet'
    args.rec_image_inverse = True
    args.rec_image_shape = "3, 48, 320"
    args.rec_batch_num = 6
    args.max_text_length = 25
    args.use_space_char = True
    args.vis_font_path = os.path.join(root, "doc", "fonts", "simfang.ttf")

    args.use_angle_cls = False
    args.cls_model_dir = None
    args.cls_image_shape = "3, 48, 192"
    args.label_list = ['0', '180']
    args.cls_batch_num = 6
    args.cls_thresh = 0.9

    args.table_max_len = 488
    args.table_algorithm = 'SLANet'
    args.merge_no_span_structure = True
    args.table_char_dict_path = os.path.join(root, "ppocr", "utils", "dict", "table_structure_dict.txt")

    args.formula_algorithm = 'CRNN'
    args.formula_model_dir = None
    args.formula_char_dict_path = os.path.join(root, "ppocr", "utils", "dict", "formula_dict.txt")
    args.formula_batch_num = 1

    args.layout_score_threshold = 0.5
    args.layout_nms_threshold = 0.3

    args.kie_algorithm = 'LayoutXLM'
    args.ser_model_dir = None
    args.re_model_dir = None
    args.use_visual_backbone = True
    args.ser_dict_path = None

    args.ocr = True
    args.recovery = True
    args.save_pdf = save_pdf

    if lang == "EN":
        args.det_model_dir = os.path.join(root, "inference", "en_PP-OCRv3_det_infer")
        args.rec_model_dir = os.path.join(root, "inference", "en_PP-OCRv3_rec_infer")
        args.table_model_dir = os.path.join(root, "inference", "en_ppstructure_mobile_v2.0_SLANet_infer")
        args.layout_model_dir = os.path.join(root, "inference", "picodet_lcnet_x1_0_fgd_layout_infer")
        args.rec_char_dict_path = os.path.join(root, "ppocr", "utils", "en_dict.txt")
        args.layout_dict_path = os.path.join(root, "ppocr", "utils", "dict", "layout_dict", "layout_publaynet_dict.txt")
    else: # CN
        args.det_model_dir = os.path.join(root, "inference", "cn_PP-OCRv3_det_infer")
        args.rec_model_dir = os.path.join(root, "inference", "cn_PP-OCRv3_rec_infer")
        args.table_model_dir = os.path.join(root, "inference", "cn_ppstructure_mobile_v2.0_SLANet_infer")
        args.layout_model_dir = os.path.join(root, "inference", "picodet_lcnet_x1_0_fgd_layout_cdla_infer")
        args.rec_char_dict_path = os.path.join(root, "ppocr", "utils", "ppocr_keys_v1.txt")
        args.layout_dict_path = os.path.join(root, "ppocr", "utils", "dict", "layout_dict", "layout_cdla_dict.txt")

    return StructureSystem(args)

def pdf_to_docx(input_path: str, output_dir: str, lang: str = "CN", use_pdf2docx: bool = False) -> str:
    os.makedirs(output_dir, exist_ok=True)
    img_name = os.path.splitext(os.path.basename(input_path))[0]
    output_docx_path = os.path.join(output_dir, f"{img_name}.docx")

    if use_pdf2docx and os.path.splitext(input_path)[1].lower() == ".pdf":
        if pdf2docx_converter is None:
            print("Error: pdf2docx library not installed. Cannot use direct PDF conversion.")
            print("Please install it with: pip install pdf2docx")
            return f"Error: pdf2docx not installed."

        print(f"===============Using pdf2docx for direct conversion: {input_path}===============")
        try:
            cv = pdf2docx_converter(input_path)
            cv.convert(output_docx_path)
            cv.close()
            print(f"DOCX saved directly by pdf2docx to: {output_docx_path}")
            return output_docx_path
        except Exception as e:
            print(f"Error during pdf2docx conversion: {e}")
            return f"Error: {e}"
    else:
        # Fallback to PaddleOCR-based conversion if not a PDF or use_pdf2docx is False
        print(f"===============Using PaddleOCR for image-based conversion: {input_path}===============")
        predictor_args = argparse.Namespace()
        predictor = init_predictor(predictor_args, lang)
        imgs = read_pdf_images(input_path)

        all_res = []
        for img in imgs:
            res, _ = predictor(img)
            save_structure_res(res, output_dir, img_name)
            h, w, _ = img.shape
            res = sorted_layout_boxes(res, w)
            all_res += res

        if all_res:
            convert_info_docx(imgs, all_res, output_dir, img_name)
        return output_docx_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert PDF to Word using PaddlePaddle OCR/Structure or pdf2docx.")
    parser.add_argument("--input", required=True, help="Path to input PDF or image file.")
    parser.add_argument("--output", required=True, help="Output directory.")
    parser.add_argument("--lang", default="CN", help="Language for OCR (CN or EN). Only used if not using pdf2docx.")
    parser.add_argument("--use_pdf2docx", action="store_true", help="Use pdf2docx library for direct PDF to DOCX conversion. Recommended for multi-page PDFs.")

    args = parser.parse_args()

    output_file = pdf_to_docx(args.input, args.output, args.lang, args.use_pdf2docx)
    print(f"Conversion result: {output_file}")