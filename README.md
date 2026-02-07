# Predictive Maintenance of Aircraft Engines using AI

This project implements a predictive maintenance pipeline using the **NASA C-MAPSS Turbofan Engine Degradation** dataset.  
The goal is to predict the **Remaining Useful Life (RUL)** of aircraft engines and to compare several models, with a focus on:

- an **Artificial Neural Network (ANN)**, and  
- a **LightGBM** model, combined with **SHAP** for explainability.

This work is part of a study on **AI for the safety of critical industrial systems**.

---

## 🚀 Project Overview

Main steps of the project:

- Use the **FD001** subset of the NASA C-MAPSS dataset (turbofan engines).
- Compute the **RUL** for each engine and build a supervised learning dataset.
- Preprocess and normalise sensor data.
- Train and evaluate several models for RUL prediction:
  - baselines: **Random Forest**, **XGBoost**, **LSTM**,
  - main comparison: **ANN vs LightGBM + SHAP**.
- Compare the models using:
  - RMSE (Root Mean Squared Error),
  - MAE (Mean Absolute Error),
  - R² score,
  - training time.
- Use **SHAP values** to explain the LightGBM predictions and identify the most important sensors.

---

## 📂 Project Structure

Current structure of the repository:

```text
IASSIC/
├── IASSIC.pdf                  # Project report (state of the art + experiments)
└── predictive-maintenance/
    ├── CMaps/                  # Raw NASA C-MAPSS files (FD001–FD004)
    │   ├── train_FD001.txt
    │   ├── test_FD001.txt
    │   ├── RUL_FD001.txt
    │   ├── train_FD002.txt
    │   ├── test_FD002.txt
    │   ├── RUL_FD002.txt
    │   ├── train_FD003.txt
    │   ├── test_FD003.txt
    │   ├── RUL_FD003.txt
    │   ├── train_FD004.txt
    │   ├── test_FD004.txt
    │   ├── RUL_FD004.txt
    │   └── readme.txt
    │
    ├── preprocess.py           # Preprocessing script (builds FD001 dataset with RUL, scaling, etc.)
    ├── train_models.py         # Training & evaluation of RUL models (RF / XGBoost / LSTM / ANN / LightGBM)
    ├── main.py                 # Optional entry point / helper script
    ├── app.py                  # Optional application or demo script (e.g. simple API or UI)
    │
    ├── rf_results_fd001.csv    # Example results for a Random Forest baseline on FD001
    ├── xgb_model.pkl           # Saved XGBoost model
    ├── lstm_model.h5           # Saved LSTM model
    ├── scaler.pkl              # Fitted scaler for feature normalisation
    │
    ├── requirements.txt        # Python dependencies
    └── README.md               # Project documentation (this file)
```
> Some files (Random Forest, XGBoost, LSTM models) come from early experiments and baselines.
> The main analysis in the report focuses on the **ANN vs LightGBM + SHAP** comparison on **FD001**.

---

## 🧪 Dataset & Preprocessing

### Dataset

* Dataset: **NASA C-MAPSS Turbofan Engine Degradation Simulation**.
* Subset mainly used: **FD001**.
* Each row corresponds to:

  * an engine identifier,
  * 3 operational settings,
  * 21 sensor measurements,
  * the time cycle since start.

For each engine, the **RUL** (Remaining Useful Life) is computed as:

> RUL = (last cycle before failure) − (current cycle)

This transforms the time-series data into a supervised learning problem where the target is a continuous RUL value.

### Preprocessing (`preprocess.py`)

The preprocessing script:

* loads the raw `train_FD00x.txt`, `test_FD00x.txt` and `RUL_FD00x.txt` files from `CMaps/`,
* merges and reshapes the data to build a RUL label for each engine and time step,
* optionally selects a subset of useful sensors,
* normalises or standardises the features (for example, to help the ANN training),
* writes preprocessed datasets to disk (e.g. `train_FD001_preprocessed.csv`, `test_FD001_preprocessed.csv`).

---

## 🤖 Models

### 1. Artificial Neural Network (ANN)

The ANN is a fully-connected neural network for regression.
Typical architecture used in this project:

* Input layer: one neuron per selected feature (for FD001, around 17 inputs).
* Hidden layer 1: 64 neurons, activation **ReLU**.
* Hidden layer 2: 32 neurons, activation **ReLU**.
* Output layer: 1 neuron (predicted RUL), linear activation.
* Loss: **Mean Squared Error (MSE)**.
* Optimiser: **Adam**.
* Training: ~30 epochs, batch size 128, with a validation split.

This model is good at capturing non-linear patterns but behaves as a **black box**, which makes it harder to interpret in safety-critical settings.

### 2. LightGBM (Gradient Boosted Trees)

LightGBM is a tree-based gradient boosting model, well suited to structured/tabular data:

* Number of estimators: around 100.
* Learning rate: around 0.05.
* Maximum depth: around 7.
* Objective: regression.
* Evaluation metric: RMSE.
* Trained on the same FD001 features and target as the ANN.

LightGBM is:

* fast to train,
* robust on tabular sensor data,
* directly compatible with **SHAP** for explainability.

### 3. Baseline models

The repository also includes some baselines:

* **Random Forest** (results saved in `rf_results_fd001.csv`),
* **XGBoost** (model saved in `xgb_model.pkl`),
* **LSTM** (model saved in `lstm_model.h5`).

These baselines are useful to compare against the main models (ANN and LightGBM).

---

## 🔎 Explainability with SHAP

For LightGBM, **SHAP (SHapley Additive exPlanations)** is used to understand:

* **Global importance**: which sensors and features have the strongest impact on RUL predictions.
* **Local explanations**: for a given engine at a given time, which features pushed the prediction up or down.

The typical workflow is:

1. Train the LightGBM model on FD001.
2. Build a `TreeExplainer` or `Explainer` with SHAP.
3. Compute SHAP values on the test set.
4. Plot:

   * a **summary plot** (global feature importance),
   * a **bar plot**,
   * and optionally local explanations (waterfall plot for one specific example).

This helps answer questions like:

> “Which sensors are most important when the model predicts that an engine is close to failure?”

---

## 📊 Results (Example FD001 Summary)

On FD001, the experiments show that:

* **LightGBM** and **ANN** reach similar accuracy (close RMSE values),
* LightGBM is often slightly better in **MAE** and **R²**,
* LightGBM is significantly **faster to train**,
* SHAP makes LightGBM **easier to explain**, which is important in a safety context.

A typical comparison table looks like:

| Model    | RMSE (↓) | MAE (↓) | R² (↑) | Training time |
| -------- | -------- | ------- | ------ | ------------- |
| LightGBM | ~34      | ~25     | ~0.30+ | short         |
| ANN      | ~35      | ~26     | ~0.30  | longer        |

(The exact values depend on hyperparameters and preprocessing choices.)

---

## ⚙️ Setup & Usage

### 1. Create and activate a virtual environment

From the `predictive-maintenance/` directory:

```bash
python -m venv tfenv
source tfenv/bin/activate      # macOS / Linux
# .\tfenv\Scripts\activate     # Windows PowerShell
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run preprocessing

```bash
python preprocess.py
```

This will:

* read the raw NASA files from `CMaps/`,
* build the processed dataset(s) for FD001 (and others if configured),
* save them as CSV or NumPy files ready for training.

### 4. Train and evaluate models

```bash
python train_models.py
```

Depending on the implementation of `train_models.py`, this script will:

* train one or several models (Random Forest, XGBoost, LSTM, ANN, LightGBM),
* evaluate them on the test set (RMSE, MAE, R²),
* save trained models (`.pkl`, `.h5`, etc.),
* and optionally generate plots (loss curves, prediction vs true RUL, SHAP plots).

Check the comments inside `train_models.py` for details on the available options, model selection, and output locations.

### 5. Optional: run the app

If `app.py` is configured as a small demo (e.g., Streamlit or Flask), you can run:

```bash
python app.py
```

to launch a simple interface for local experiments.

---

## 🔭 Future Work

Possible extensions:

* extend experiments to FD002, FD003, FD004 (more complex operating conditions),
* perform systematic **hyperparameter tuning**,
* integrate **real-time sensor data**,
* explore other architectures (GRU, Transformer-based models),
* connect this predictive maintenance pipeline to a broader **functional safety** or **risk analysis** framework.

---

## 👥 Authors

* **Melissa Iberoualene**
* **Ali Elkhalfi**

Master 1 – Université Bretagne Sud.

