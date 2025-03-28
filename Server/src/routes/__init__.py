from .logon import router as logon_router
from .static import router as static_router

ALL_ROUTERS = [
    logon_router,
    static_router,
]
