import os
import sys
from fastapi import FastAPI
import uvicorn
from config import Config as Cnf
from routes import ALL_ROUTERS


def init():
    '''
    初期化処理
    '''
    os.chdir(Cnf.ROOT_DIR)
    sys.path.append(Cnf.EXEC_DIR)


def main():
    '''
    実行
    '''
    app = FastAPI()

    for router in ALL_ROUTERS:
        app.include_router(router)

    uvicorn.run(app, host=Cnf.HOST, port=Cnf.PORT)


if __name__ == "__main__":
    init()
    main()
