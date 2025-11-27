# Land Delineation Training Codebase

This codebase is used for training a deep learning model to delineate land from satellite imagery. It includes modules for preprocessing, data loading, model definition, loss functions, training, and testing.

## Project Structure

```
delineation/
├── data/
│   ├── processed_{size}/       # Processed data at different resolutions
│   │   ├── contour/          # Contour images
│   │   ├── distance/         # Distance map images
│   │   ├── image/             # Resampled images
│   │   └── mask/              # Resampled masks
│   └── raw/                  # Raw data
│       ├── image/             # Raw images
│       └── mask/              # Raw masks
├── data-science-pi-fe087013de18.json # Credentials
├── notebooks/             # Jupyter notebooks for experimentation
│   ├── Download_Satellite.ipynb # Notebook for downloading satellite images
│   └── Playground.ipynb       # Playground notebook
├── README.md              # This file
└── src/
    ├── dataset.py         # PyTorch dataset definition
    ├── losses.py          # Loss function definitions
    ├── models.py          # Model definitions (BsiNet)
    ├── preprocess.py      # Preprocessing scripts
    ├── test.py            # Testing script
    ├── train.py           # Training script
    ├── utils.py           # Utility functions
    └── __pycache__/        # Python cache files
```

## 1. Preprocessing (`src/preprocess.py`)

The `preprocess.py` script handles the preprocessing of the satellite imagery and masks. It performs the following steps:

*   **Reading and Writing GeoTIFFs:** Uses GDAL to read and write GeoTIFF files.
*   **Normalization:** Normalizes the pixel values of the images.
*   **Mask Binarization:** Converts the masks to binary format.
*   **Resampling:** Resamples the images and masks to a specified target size using GDAL Warp.
*   **Distance and Contour Generation:** Generates distance maps and contours from the masks using OpenCV.

### Usage

To run the preprocessing script:

```shell
python src/preprocess.py --raw_dir <path_to_raw_data> --target_w <target_width> --target_h <target_height> --resample
```

*   `--raw_dir`: Path to the raw data directory containing `image/` and `mask/` subdirectories.
*   `--target_w`: Target width for resampling.
*   `--target_h`: Target height for resampling.
*   `--resample`: Enable resampling.

## 2. Dataset (`src/dataset.py`)

The `dataset.py` file defines the PyTorch dataset (`DatasetImageMaskContourDist`) used for loading the data during training and testing. It loads images, masks, contours, and distance maps.

*   It uses GDAL to read GeoTIFF images, falling back to PIL if GDAL fails.
*   It assumes a specific directory structure where the images, masks, contours, and distance maps are stored in separate folders.

## 3. Models (`src/models.py`)

The `models.py` file defines the BsiNet model architecture. Two versions are provided:

*   `BsiNet`: A concise version of the BsiNet model.
*   `BsiNet_2`: A clearer, more explicit version of the BsiNet model.

Both versions are encoder-decoder architectures with skip connections and attention mechanisms, including Squeeze-and-Excitation (SE), Spatial Group Enhance (SGE), Convolutional Block Attention Module (CBAM), and scSE.

## 4. Loss Functions (`src/losses.py`)

The `losses.py` file defines the loss functions used for training the model. It includes:

*   **Dice Loss:** Measures the overlap between prediction and target.
*   **Binary Cross Entropy (BCE) Loss:** A standard loss function for binary classification.
*   **Focal Loss:** Addresses class imbalance.
*   **Log-cosh Dice Loss:** A smooth variant of Dice loss.
*   **Loss:** Combines NLLLoss and Dice loss.
*   **LossMulti:** An extension of Loss for multi-class segmentation, using NLLLoss and Jaccard loss (IoU).
*   **LossBsiNet:** A combined loss function specifically for BsiNet, which combines losses for the mask, contour, and distance map predictions using `LossMulti` and `MSELoss`.

## 5. Training (`src/train.py`)

The `train.py` script trains the BsiNet model.

*   It uses the `DatasetImageMaskContourDist` dataset and the `LossBsiNet` loss function.
*   The training loop iterates over the training data, calculates the loss, and updates the model parameters using the Adam optimizer.
*   It includes a validation loop that evaluates the model on a validation dataset.
*   The training process is logged using TensorBoard.
*   The model is saved periodically.

### Usage

To run the training script:

```shell
python src/train.py --train_path <path_to_training_data> --save_path <path_to_save_model> --cuda_no <cuda_device_number> --num_epochs <number_of_epochs> --batch_size <batch_size> --distance_type <distance_type>
```

*   `--train_path`: Path to the training data directory.
*   `--save_path`: Path to save the trained model.
*   `--cuda_no`: CUDA device number.
*   `--num_epochs`: Number of training epochs.
*   `--batch_size`: Batch size.
*   `--distance_type`: Type of distance map to use (e.g., `dist_mask`, `dist_contour_mat`, `dist_contour_tif`).

## 6. Testing (`src/test.py`)

The `test.py` script tests the trained BsiNet model.

*   It loads a trained model and performs inference on a set of test images.
*   It converts the model's output into a binary mask.
*   The resulting mask is saved as a GeoTIFF image.

### Usage

To run the testing script:

```shell
python src/test.py --test_path <path_to_test_data> --model_file <path_to_trained_model> --save_path <path_to_save_results> --cuda_no <cuda_device_number> --distance_type <distance_type>
```

*   `--test_path`: Path to the test data directory.
*   `--model_file`: Path to the trained model file.
*   `--save_path`: Path to save the test results.
*   `--cuda_no`: CUDA device number.
*   `--distance_type`: Type of distance map used during training.

## Dependencies

*   Python 3.6+
*   PyTorch
*   GDAL
*   OpenCV
*   NumPy
*   SciPy
*   TensorBoardX
*   scikit-learn
*   PIL (Pillow)

## Installation

1.  Install the required dependencies:

    ```shell
    pip install torch torchvision gdal numpy scipy scikit-learn opencv-python tensorboardX pillow
    ```

## Data Preparation

1.  Obtain satellite imagery and corresponding masks.
2.  Organize the data into the `data/raw/` directory, with `image/` and `mask/` subdirectories.
3.  Preprocess the data using the `src/preprocess.py` script to resample the images and generate distance maps and contours.

## Training and Testing

1.  Train the model using the `src/train.py` script, specifying the appropriate training data path, save path, and other hyperparameters.
2.  Test the trained model using the `src/test.py` script, specifying the test data path, model file path, and save path.
