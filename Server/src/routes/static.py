import os
from fastapi.responses import Response, FileResponse, RedirectResponse
from fastapi.routing import APIRouter
from config import Config as Cnf
from utils.file_util import path_of

router = APIRouter()


@router.get("/{path:path}")
async def get(path: str):
    """
    GET /*
    ファイルを返す
    """

    # ルートにリダイレクト
    if path == 'index.html':
        return RedirectResponse('/')

    # ルートの場合 index.html を返す
    if path == '':
        path = 'index.html'

    # ファイルの存在をチェック
    file = path_of(Cnf.HTDOCS_DIR, path)
    is_file = os.path.isfile(file)
    in_htdocs = file.startswith(Cnf.HTDOCS_DIR)
    if is_file and in_htdocs:
        return FileResponse(file)

    return Response('File not found.', 404)
