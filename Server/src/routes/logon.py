from fastapi import APIRouter, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from utils.data_util import sha256

router = APIRouter()
security = HTTPBasic()


@router.get("/api/logon")
async def logon(
    basic: HTTPBasicCredentials = Depends(security)
):
    """
    GET /logon
    ログイン認証を行う
    """

    user_id = basic.username
    user_pw = sha256(basic.password)

    user_data = {
        'UID': 123,
        'UserID': 'abc',
        'DisplayName': 'John Doe',
    }
    return JSONResponse({'User': user_data})
