from configparser import ConfigParser
import os
from constant import SETTING_FILE_EXTENSIONS


def path_of(*paths):
    '''
    パスを結合する
    '''
    return os.path.abspath(os.path.join(*paths))


def read_file(path: str, encoding: str = 'UTF-8'):
    '''
    ファイルを読み込む
    '''

    # 設定ファイル
    if path.endswith(SETTING_FILE_EXTENSIONS):
        conf_parser = ConfigParser()
        conf_parser.read(path, encoding=encoding)
        return conf_parser

    with open(path, 'r', encoding=encoding) as f:
        return f.read()
