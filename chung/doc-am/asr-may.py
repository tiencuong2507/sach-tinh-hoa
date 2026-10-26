"""Máy nghe lại (faster-whisper medium trên card đồ họa) chạy thường trực cho bộ tạo giọng: mỗi dòng vào {"wav": đường dẫn} → một dòng ra {"chu": [từ…]}.
Chạy bằng Python hệ thống có faster-whisper. Thư viện CUDA (cuBLAS, cuDNN 9) mượn từ PyTorch của môi trường VieNeu. Chỉ để sàng lọc, không thay tai người.
"""
import json, os, sys
TORCH_LIB = r"D:\AI\vixtts\venv\Lib\site-packages\torch\lib"
if os.path.isdir(TORCH_LIB):
    os.add_dll_directory(TORCH_LIB); os.environ["PATH"] = TORCH_LIB + os.pathsep + os.environ["PATH"]
from pathlib import Path
from faster_whisper import WhisperModel
C = Path.home() / ".cache/huggingface/hub/models--Systran--faster-whisper-medium/snapshots"
p = next(x for x in C.iterdir() if (x / "model.bin").is_file())
try: m = WhisperModel(str(p), device="cuda", compute_type="float16", local_files_only=True)
except Exception: m = WhisperModel(str(p), device="cpu", compute_type="int8", cpu_threads=8, local_files_only=True)
out = open(sys.stdout.fileno(), "w", encoding="utf-8", buffering=1)
out.write(json.dumps({"san_sang": True}) + "\n")
for dong in open(sys.stdin.fileno(), encoding="utf-8"):
    try:
        segs, _ = m.transcribe(json.loads(dong)["wav"], language="vi", beam_size=5, vad_filter=True)
        out.write(json.dumps({"chu": " ".join(s.text.strip() for s in segs)}, ensure_ascii=False) + "\n")
    except Exception as e:
        out.write(json.dumps({"loi": str(e)[:300]}) + "\n")
