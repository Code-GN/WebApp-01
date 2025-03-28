from sqlalchemy import Column, Integer, String
from database import DB


class UserTable(DB.Base):
    __tablename__ = 'users'
    uid = Column(
        Integer(),
        nullable=False,
        autoincrement=True,
        primary_key=True,
    )
    user_id = Column(String(32), nullable=False)
    user_pw = Column(String(64), nullable=False)
    display_name = Column(String(128), nullable=False)
