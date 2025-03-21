import os
import torch
from dassl.engine import build_trainer
from dassl.config import get_cfg_default
from dassl.utils import setup_logger, set_random_seed
from data.throwable_dataset import ThrowableDataset

def main():
    # 创建配置
    cfg = get_cfg_default()
    
    # 设置数据集
    cfg.DATASET.NAME = "throwable"
    cfg.DATASET.ROOT = "data"
    cfg.DATASET.TRAINER = "vanilla"
    
    # 设置模型
    cfg.MODEL.BACKBONE = "resnet50"
    cfg.MODEL.PRETRAINED = True
    
    # 设置训练参数
    cfg.SOLVER.MAX_EPOCH = 100
    cfg.SOLVER.BATCH_SIZE = 32
    cfg.SOLVER.OPTIMIZER = "sgd"
    cfg.SOLVER.LR = 0.001
    
    # 设置随机种子
    set_random_seed(cfg.SEED)
    
    # 设置日志
    setup_logger(cfg.OUTPUT_DIR)
    
    # 创建训练器
    trainer = build_trainer(cfg)
    
    # 训练模型
    trainer.train()
    
    # 保存模型
    trainer.save_model("models/trained_model.pth")
    
    print("模型训练完成并保存")

if __name__ == "__main__":
    main() 