# Handloom Sarees Images

This folder should contain the handloom sarees images for your website.

## Image Files Required

Please add the following image files to this folder:
- saree_01.jpg
- saree_02.jpg
- saree_03.jpg
- saree_04.jpg
- saree_05.jpg
- saree_06.jpg
- saree_07.jpg
- saree_08.jpg
- saree_09.jpg
- saree_10.jpg
- saree_11.jpg
- saree_12.jpg

## Image Specifications

- **Format**: JPG or PNG
- **Recommended Size**: 800x600 pixels or larger
- **Aspect Ratio**: 4:3 works best for product cards
- **File Size**: Keep under 500KB for faster loading

## How to Add Images

1. Place your handloom sarees images in this folder
2. Name them exactly as listed above (saree_01.jpg, saree_02.jpg, etc.)
3. The images will automatically appear on your website

## Note

Currently, the website is using placeholder image URLs from Unsplash (free to use). 

### To use your own local images:

1. Place your handloom sarees images in this folder (`public/images/sarees/`)
2. Name them exactly as listed above (saree_01.jpg, saree_02.jpg, etc.)
3. Update the `src/data/products.json` file:
   - Change image URLs from `https://images.unsplash.com/...` 
   - To local paths like `/images/sarees/saree_01.jpg`

### Example:
```json
"image": "/images/sarees/saree_01.jpg"
```

The images will automatically appear on your website once you update the paths in `products.json`.

