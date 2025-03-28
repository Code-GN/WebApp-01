from fastapi import APIRouter, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from database import UserTable
from utils.auth_util import auth

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
    user: UserTable = auth(basic)

    if user:
        return JSONResponse({'User': user.to_dict()})

    return Response('Unauthorized.', 401)
