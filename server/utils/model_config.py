import torch.nn as nn

class ANNModel(nn.Module):
    def __init__(self, num_features, num_classes):
        super(ANNModel, self).__init__()
        self.l1 = nn.Linear(num_features, 512)
        self.l2 = nn.Linear(512, 128)
        self.l3 = nn.Linear(128, 64)
        self.out = nn.Linear(64, num_classes)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.l1(x)
        x = self.relu(x)
        x = self.l2(x)
        x = self.relu(x)
        x = self.l3(x)
        x = self.relu(x)
        x = self.out(x)
        return x