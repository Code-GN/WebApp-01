from __future__ import annotations
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
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

    def to_dict(self):
        ''' Dictに変換 '''
        return {
            'UID': self.uid,
            'UserID': self.user_id,
            'DisplayName': self.display_name,
        }

    @staticmethod
    @DB.session
    def find(user_id: str, *args, **kwargs) -> UserTable | None:
        ''' レコードを取得 '''
        session: Session = kwargs['session']
        record = session.query(UserTable) \
            .filter_by(user_id=user_id) \
            .first()
        return record
