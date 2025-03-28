from utils.data_util import sha256
from fastapi.security import HTTPBasicCredentials
from database import UserTable


def auth(basic: HTTPBasicCredentials) -> UserTable | None:
    ''' ユーザ認証を行う '''

    # 前処理
    user_id = basic.username
    user_pw = sha256(basic.password)

    # レコードを検索
    user = UserTable.find(user_id=user_id)
    if not user:
        return None

    # パスワードの整合
    if user_pw != user.user_pw:
        return None

    return user
