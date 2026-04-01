#!/usr/bin/env python3
import os
import sys
from PIL import Image

IMAGES_DIR = "assets/images"
MAX_WIDTH = 1800
QUALITY = 75

# Parse format flag: --format=webp | --format=jpg | --format=png (default: same as input)
fmt = None
for arg in sys.argv[1:]:
    if arg.startswith("--format="):
        fmt = arg.split("=")[1].lower()

if fmt and fmt not in ("webp", "jpg", "jpeg", "png"):
    print(f"Unknown format '{fmt}'. Use: --format=webp | --format=jpg | --format=png")
    sys.exit(1)

for filename in os.listdir(IMAGES_DIR):
    if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        continue

    filepath = os.path.join(IMAGES_DIR, filename)

    # Determine output filename early so we can skip already-converted files
    in_ext = filename.rsplit('.', 1)[1].lower()
    out_ext = (fmt if fmt else ('jpg' if in_ext == 'jpeg' else in_ext))
    out_ext = 'jpg' if out_ext == 'jpeg' else out_ext
    base = filename.rsplit('.', 1)[0]
    would_be_output = os.path.join(IMAGES_DIR, f"{base}.{out_ext}")

    # Skip if the file is already in the target format (in-place recompression)
    if filepath == would_be_output:
        continue

    before = os.path.getsize(filepath) // 1024
    img = Image.open(filepath)

    has_transparency = (
        img.mode in ('RGBA', 'LA') or
        (img.mode == 'P' and 'transparency' in img.info)
    )

    # Determine output format
    if fmt:
        out_fmt = fmt
    else:
        # Default: keep original format
        out_fmt = filename.rsplit('.', 1)[1].lower()
        if out_fmt == 'jpeg':
            out_fmt = 'jpg'

    # If output format doesn't support transparency, flatten to white background
    if out_fmt == 'jpg' and has_transparency:
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
        img = background
    elif out_fmt in ('webp', 'png') and has_transparency:
        img = img.convert('RGBA')
    else:
        img = img.convert('RGB')

    # Downscale if wider than MAX_WIDTH
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)

    # Build output path
    base = filename.rsplit('.', 1)[0]
    ext = 'jpg' if out_fmt == 'jpg' else out_fmt
    new_filename = f"{base}.{ext}"
    new_filepath = os.path.join(IMAGES_DIR, new_filename)

    # Save
    if out_fmt == 'jpg':
        img.save(new_filepath, 'JPEG', quality=QUALITY, optimize=True)
    elif out_fmt == 'webp':
        img.save(new_filepath, 'WEBP', quality=QUALITY, method=6)
    elif out_fmt == 'png':
        img.save(new_filepath, 'PNG', optimize=True)

    # Remove original if format changed
    if new_filepath != filepath:
        os.remove(filepath)

    after = os.path.getsize(new_filepath) // 1024
    print(f"  {filename} → {new_filename}: {before}KB → {after}KB")

print("Done.")
