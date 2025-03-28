import os
import sys
from fastapi import FastAPI
import uvicorn
from constant import EXEC_DIR, ROOT_DIR


def init():
    os.chdir(ROOT_DIR)
    sys.path.append(EXEC_DIR)


def main():
    app = FastAPI()
    uvicorn.run(app, host='localhost', port=2200)


if __name__ == "__main__":
    init()
    main()
