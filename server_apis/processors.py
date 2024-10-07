
import pandas as pd

def read_csv(file,**kargs):
    out = pd.read_csv(file,**kargs)
    return out