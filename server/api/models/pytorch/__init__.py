import torch
from torch import nn
from api.models import *
from api.models.pytorch import *


class FARBModel(nn.Module):
    def __init__(self, vocab_size, embedding_dim, n_filters, filter_sizes, output_dim, 
            dropout, pad_idx):
      super(FARBModel, self).__init__()
      self.embedding = nn.Sequential(
          nn.Embedding(vocab_size, embedding_dim, padding_idx = pad_idx)
      )
      self.convs = nn.Sequential(
          nn.ModuleList([
              nn.Conv1d(
                  in_channels = embedding_dim, 
                  out_channels = n_filters, 
                  kernel_size = fs
                ) for fs in filter_sizes
          ])
      )
      self.out = nn.Sequential(
          nn.Linear(len(filter_sizes) * n_filters, output_dim)
      )
      self.dropout = nn.Dropout(dropout)
        
    def forward(self, text):
        embedded = self.embedding(text)  
        embedded = embedded.permute(0, 2, 1)
        conved = [F.relu(conv(embedded)) for conv in self.convs[0]]
        pooled = [F.max_pool1d(conv, conv.shape[2]).squeeze(2) for conv in conved]
        cat = self.dropout(torch.cat(pooled, dim = 1))
        return self.out(cat)
     
print(" ✅ LOADING PYTORCH FAB MODEL!\n") 
INPUT_DIM = len(stoi) 
EMBEDDING_DIM = 100
OUTPUT_DIM = len(labels_dict)
DROPOUT = 0.5
PAD_IDX = stoi[PAD_TOKEN] 
N_FILTERS = 100
FILTER_SIZES = [3, 4, 5]

farb_model = FARBModel(
    INPUT_DIM, EMBEDDING_DIM, N_FILTERS, FILTER_SIZES, OUTPUT_DIM, DROPOUT, PAD_IDX
).to(device)

     
farb_model.load_state_dict(torch.load(PYTORCH_FARB_MODEL_PATH, 
                                     map_location=device))
print(" ✅ LOADING PYTORCH FAB MODEL DONE!\n")


