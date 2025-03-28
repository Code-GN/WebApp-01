import os
from utils.file_util import path_of, read_file


class Config:

    is_ready = False

    ROOT_DIR: str
    EXEC_DIR: str
    HTDOCS_DIR: str

    HOST: str
    PORT: int

    @classmethod
    def init(cls):
        '''
        初期化処理
        '''

        if cls.is_ready:
            return

        # パスの設定
        cls.EXEC_DIR = os.path.dirname(os.path.abspath(__file__))
        cls.ROOT_DIR = os.path.dirname(cls.EXEC_DIR)

        # config.iniの読み込み
        config = read_file(path_of(cls.ROOT_DIR, 'config.ini'))

        # パスの追加設定
        cls.HTDOCS_DIR = path_of(cls.ROOT_DIR, config.get('path', 'HTDOCS'))

        # ネットワーク設定
        cls.HOST = config.get('network', 'HOST')
        cls.PORT = int(config.getint('network', 'PORT'))

        cls.is_ready = True


Config.init()
